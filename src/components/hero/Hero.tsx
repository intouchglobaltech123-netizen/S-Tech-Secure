import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Camera, Trophy, ShieldCheck, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { COMPANY_CONTACT } from "@/data/servicesData";

interface HeroProps {
  active?: boolean;
  onReveal?: () => void;
}

// Module-level flag: persists during client-side navigation within the active window session
export let hasHeroVideoPlayedOnce = false;

// Helper to detect if current page load is an explicit browser reload/refresh (F5, browser reload button)
export function isBrowserReload(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const navEntries = window.performance?.getEntriesByType?.("navigation");
    if (navEntries && navEntries.length > 0) {
      return (navEntries[0] as PerformanceNavigationTiming).type === "reload";
    }
    return (window.performance as any)?.navigation?.type === 1;
  } catch {
    return false;
  }
}

// The browser keeps reporting "reload" for the whole life of a refreshed page, even
// after in-app navigation. Only treat the reload as a "replay the intro" signal once,
// so going Home → About → Home after a refresh keeps the finished hero.
let reloadHandled = false;

export function hasHeroPlayedInSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // If user explicitly pressed browser Refresh / Reload, replay the video intro (once)
    if (!reloadHandled) {
      reloadHandled = true;
      if (isBrowserReload()) {
        sessionStorage.removeItem("stec_hero_played");
        hasHeroVideoPlayedOnce = false;
        return false;
      }
    }
    return (
      hasHeroVideoPlayedOnce ||
      sessionStorage.getItem("stec_hero_played") === "true"
    );
  } catch {
    return hasHeroVideoPlayedOnce;
  }
}

export function setHeroVideoPlayed() {
  hasHeroVideoPlayedOnce = true;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("stec_hero_played", "true");
    } catch {}
  }
}

// useLayoutEffect in the browser (runs before paint, so no flash), useEffect on the server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Hero({ active = true, onReveal }: HeroProps) {
  // Only play the intro on a browser refresh (or the very first visit); otherwise show the
  // finished hero. This is decided after mount, because it reads sessionStorage: deciding it
  // during render made the server HTML (hidden) and the browser (visible) disagree, and React
  // kept the hidden version — leaving the hero blank.
  const [skipIntro, setSkipIntro] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const skipRef = useRef(false);
  const revealedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const freezeAtEnd = (v: HTMLVideoElement) => {
    if (v.duration && v.duration > 0) {
      v.currentTime = Math.max(0, v.duration - 0.05);
      v.pause();
    }
  };

  const triggerReveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setHeroVideoPlayed();
    setRevealed(true);
    if (onReveal) {
      onReveal();
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (hasHeroPlayedInSession()) {
      // Already played this session (and not a refresh): show the finished hero instantly
      skipRef.current = true;
      revealedRef.current = true;
      setSkipIntro(true);
      setRevealed(true);
      if (onReveal) {
        onReveal();
      }
      const v = videoRef.current;
      if (v) {
        v.autoplay = false;
        v.pause();
        if (v.readyState >= 1) {
          freezeAtEnd(v);
        } else {
          v.addEventListener("loadedmetadata", () => freezeAtEnd(v), { once: true });
        }
      }
      return;
    }

    // Refresh / first visit: play the intro, with a safety fallback if the video is blocked
    const v = videoRef.current;
    if (v && v.paused) {
      v.play().catch(() => {});
    }
    const fallbackTimer = setTimeout(() => {
      triggerReveal();
    }, 4500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleTimeUpdate = () => {
    if (skipRef.current) return;
    const v = videoRef.current;
    if (!v) return;

    const dur = v.duration;
    if (dur && dur > 0) {
      // Trigger reveal when video enters the final 2 seconds
      const revealThreshold = Math.max(0, dur - 2.0);
      if (v.currentTime >= revealThreshold && !revealedRef.current) {
        triggerReveal();
      }

      // Freeze on final frame — DO NOT LOOP!
      if (v.currentTime >= dur - 0.08) {
        v.pause();
        triggerReveal();
      }
    }
  };

  const handleEnded = () => {
    if (skipRef.current) return;
    const v = videoRef.current;
    if (v) {
      v.pause();
    }
    triggerReveal();
  };

  return (
    <section
      aria-label="Hero Overview"
      className="relative z-30 w-full overflow-hidden"
      style={{
        backgroundColor: "#070A12",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full overflow-hidden min-h-[92vh] lg:min-h-screen flex items-center">
        {/* Fullscreen Cinematic Background Video (Plays once, freezes on final frame) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onLoadedMetadata={(e) => {
              if (skipRef.current) freezeAtEnd(e.currentTarget);
            }}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src="/services/hero.mp4" type="video/mp4" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Vignette & Deep Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/90 via-[#070A12]/60 to-[#070A12]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-[#070A12]/60" />
        </div>

        {/* Content Stack: Positioned cleanly below the fixed navbar */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24 w-full flex flex-col justify-center text-left select-none">
          <div
            className={`max-w-2xl transition-all ${
              skipIntro ? "duration-0" : "duration-1000"
            } ease-out ${
              revealed
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-300 uppercase">
                SURVEILLANCE &amp; AUTOMATION
              </span>
            </div>

            {/* High-Impact Minimal Headline */}
            <h1 className="font-black tracking-tight leading-[1.05] text-left">
              <span
                className="block text-white"
                style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
              >
                24/7 Security &amp;
              </span>
              <span
                className="block"
                style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
              >
                <span className="text-white">Smart </span>
                <span className="text-[#FF7A00]">
                  Automation
                </span>
              </span>
            </h1>

            {/* Minimal, Punchy Subheading */}
            <p className="mt-3.5 sm:mt-4 text-neutral-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-lg">
              Enterprise 4K surveillance and intelligent automation engineered for homes and businesses across Tamil Nadu.
            </p>

            {/* Sleek Minimal Action CTAs */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-3.5 pointer-events-auto">
              <a
                href="/contact"
                className="px-6 sm:px-7 py-3 rounded-full bg-[#FF7A00] hover:bg-[#FF8800] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>Book Free Survey</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="px-5 sm:px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm tracking-wide backdrop-blur-md transition-all duration-200 flex items-center gap-2"
              >
                <PhoneCall size={14} className="text-[#FF7A00]" />
                <span>+91 96 00 25 26 05</span>
              </a>
            </div>

            {/* Clean Minimal Stat Cards */}
            <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-xl select-none pointer-events-auto">
              {/* Stat 1 */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7A00] shrink-0" />
                <div>
                  <div className="text-base sm:text-xl font-bold text-white leading-none">
                    500<span className="text-[#FF7A00]">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-1">
                    Installations
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7A00] shrink-0" />
                <div>
                  <div className="text-base sm:text-xl font-bold text-white leading-none">
                    6<span className="text-[#FF7A00]">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-1">
                    Years Exp
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7A00] shrink-0" />
                <div>
                  <div className="text-base sm:text-xl font-bold text-white leading-none">
                    50<span className="text-[#FF7A00]">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-1">
                    Top Brands
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
