import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LandingIntro } from "@/components/hero/LandingIntro";
import { Camera, Trophy, ShieldCheck, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { COMPANY_CONTACT } from "@/data/servicesData";

interface HeroProps {
  active?: boolean;
  onReveal?: () => void;
  /** Called when the opening animation has finished and the hero video starts */
  onIntroOpen?: () => void;
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

const DESKTOP_VIDEO = "/services/hero.mp4";
const MOBILE_VIDEO = "/services/hero-mobile.mp4";

// What each part of the hero video shows (start time in seconds → label)
type Caption = { at: number; label: string };
const DESKTOP_CAPTIONS: Caption[] = [
  { at: 0, label: "Gate automation" },
  { at: 1.5, label: "Smart door lock" },
  { at: 2.5, label: "Door automation" },
  { at: 5, label: "Smart lights & fan" },
  { at: 6, label: "Motorised curtains" },
  { at: 7, label: "CCTV surveillance" },
];
const MOBILE_CAPTIONS: Caption[] = [
  { at: 0, label: "Gate automation" },
  { at: 1.5, label: "Smart door lock" },
  { at: 3, label: "Door automation" },
  { at: 5, label: "Smart lights & fan" },
  { at: 6.5, label: "Motorised curtains" },
  { at: 7.5, label: "CCTV surveillance" },
];

/** Portrait screens (phones, tablets held upright) get the vertical video. */
function pickHeroVideo(): string {
  try {
    return window.matchMedia("(max-aspect-ratio: 1/1)").matches ? MOBILE_VIDEO : DESKTOP_VIDEO;
  } catch {
    return DESKTOP_VIDEO;
  }
}

// useLayoutEffect in the browser (runs before paint, so no flash), useEffect on the server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Hero({ active = true, onReveal, onIntroOpen }: HeroProps) {
  // Only play the intro on a browser refresh (or the very first visit); otherwise show the
  // finished hero. This is decided after mount, because it reads sessionStorage: deciding it
  // during render made the server HTML (hidden) and the browser (visible) disagree, and React
  // kept the hidden version — leaving the hero blank.
  const [skipIntro, setSkipIntro] = useState(false);
  const [revealed, setRevealed] = useState(false);
  // Opening animation (camera sweep, then the screen opens). Rendered from the start so the
  // server HTML already shows it; hidden straight away when the intro has already played.
  const [showLanding, setShowLanding] = useState(true);
  const skipRef = useRef(false);
  const revealedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // True while the camera intro is on screen: the video waits at its first frame
  const landingActiveRef = useRef(false);
  // Feature label shown while the video plays
  const [captions, setCaptions] = useState<Caption[]>(DESKTOP_CAPTIONS);
  const [captionIndex, setCaptionIndex] = useState(-1);

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
    // The video source is chosen here (not in the server HTML) so each device only downloads its own video
    const vid = videoRef.current;
    if (vid) {
      const src = pickHeroVideo();
      vid.src = src;
      setCaptions(src === MOBILE_VIDEO ? MOBILE_CAPTIONS : DESKTOP_CAPTIONS);
      vid.load();
    }

    if (hasHeroPlayedInSession()) {
      // Already played this session (and not a refresh): show the finished hero instantly
      skipRef.current = true;
      revealedRef.current = true;
      setSkipIntro(true);
      setShowLanding(false);
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

    // Refresh / first visit: the camera intro plays first; the hero video waits at its first
    // frame and starts as soon as the screen opens (see finishLanding).
    skipRef.current = true;
    landingActiveRef.current = true;
    const v = videoRef.current;
    if (v) {
      v.autoplay = false;
      v.pause();
    }
    // Safety net: never leave the hero hidden
    const fallbackTimer = setTimeout(() => {
      setShowLanding(false);
      triggerReveal();
    }, 16000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const finishLanding = () => {
    landingActiveRef.current = false;
    setShowLanding(false);
    if (onIntroOpen) onIntroOpen();
    if (revealedRef.current) return;
    const v = videoRef.current;
    if (!v) {
      triggerReveal();
      return;
    }
    // Play the hero video once; the text appears near its end (handleTimeUpdate)
    skipRef.current = false;
    try {
      v.currentTime = 0;
    } catch {}
    v.play().catch(() => {
      // Autoplay blocked (e.g. low-power mode): show the finished hero straight away
      skipRef.current = true;
      freezeAtEnd(v);
      triggerReveal();
    });
  };

  const handleTimeUpdate = () => {
    if (skipRef.current) return;
    const v = videoRef.current;
    if (!v) return;

    // Which feature is on screen right now
    let idx = -1;
    captions.forEach((c, i) => {
      if (v.currentTime >= c.at) idx = i;
    });
    if (idx !== captionIndex) setCaptionIndex(idx);

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
      className={`relative ${showLanding ? "" : "z-30"} w-full overflow-hidden`}
      style={{
        backgroundColor: "#070A12",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {showLanding && <LandingIntro onDone={finishLanding} />}

      <div className="relative w-full overflow-hidden min-h-[100svh] sm:min-h-[92vh] lg:min-h-screen flex items-end sm:items-center">
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
              if (skipRef.current && !landingActiveRef.current) freezeAtEnd(e.currentTarget);
            }}
            className="absolute inset-0 w-full h-full object-cover sm:scale-105"
          >
          </video>

          {/* Cinematic Vignette & Deep Luxury Gradient Overlays */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#070A12]/90 via-[#070A12]/60 to-[#070A12]/30" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-[#070A12]/60" />
          {/* Phones: dark behind the text at the bottom, clear over the house, light shade under the menu */}
          <div className="sm:hidden absolute inset-0 bg-[linear-gradient(to_top,#070A12_0%,rgba(7,10,18,0.92)_32%,rgba(7,10,18,0.55)_48%,rgba(7,10,18,0)_66%)]" />
          <div className="sm:hidden absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070A12]/60 to-transparent" />
        </div>

        {/* Feature labels while the video plays (hidden once the hero text appears) */}
        {captionIndex >= 0 && !revealed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-10 sm:bottom-12 z-20">
            <style>{`@keyframes stec-chapter-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              {/* Phones: one pill + dashes */}
              <div className="sm:hidden">
                <div
                  key={captionIndex}
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  <span className="text-xs font-bold tabular-nums text-[#FF7A00]">
                    {String(captionIndex + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-3.5 w-px bg-white/25" />
                  <span className="text-sm font-semibold text-white">{captions[captionIndex].label}</span>
                </div>
                <div aria-hidden className="mt-3 flex gap-1.5">
                  {captions.map((c, i) => (
                    <span
                      key={c.label}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === captionIndex ? "w-6 bg-[#FF7A00]" : i < captionIndex ? "w-3 bg-white/60" : "w-3 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop: chapter bar with every feature */}
              <ol className="hidden sm:grid grid-cols-6 gap-4 lg:gap-6">
                {captions.map((c, i) => {
                  const active = i === captionIndex;
                  const done = i < captionIndex;
                  const next = captions[i + 1]?.at ?? 10;
                  return (
                    <li key={c.label} className="min-w-0">
                      <div className="relative h-[3px] overflow-hidden rounded-full bg-white/15">
                        {done && <span className="absolute inset-0 bg-white/70" />}
                        {active && (
                          <span
                            key={`fill-${captionIndex}`}
                            className="absolute inset-0 origin-left bg-[#FF7A00]"
                            style={{ animation: `stec-chapter-fill ${Math.max(0.6, next - c.at)}s linear forwards` }}
                          />
                        )}
                      </div>
                      <div
                        className={`mt-3 flex items-baseline gap-2 transition-colors duration-500 ${
                          active ? "text-white" : done ? "text-white/60" : "text-white/35"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold tabular-nums ${active ? "text-[#FF7A00]" : ""}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`truncate text-sm lg:text-[15px] ${active ? "font-semibold" : "font-medium"}`}>
                          {c.label}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        {/* Content Stack: Positioned cleanly below the fixed navbar */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 sm:pt-40 lg:pt-44 pb-10 sm:pb-16 lg:pb-24 w-full flex flex-col justify-center text-left select-none">
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
            <div className="mt-6 sm:mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5 pointer-events-auto">
              <a
                href="/contact"
                className="justify-center whitespace-nowrap px-3 sm:px-7 py-3 rounded-full bg-[#FF7A00] hover:bg-[#FF8800] text-white font-semibold text-[13px] sm:text-sm tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>Book Free Survey</span>
                <ArrowRight size={15} className="hidden sm:block" />
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="justify-center whitespace-nowrap px-3 sm:px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-[13px] sm:text-sm tracking-wide backdrop-blur-md transition-all duration-200 flex items-center gap-2"
              >
                <PhoneCall size={14} className="text-[#FF7A00]" />
                <span className="sm:hidden">Call us</span>
                <span className="hidden sm:inline">+91 96 00 25 26 05</span>
              </a>
            </div>

            {/* Clean Minimal Stat Cards */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-xl select-none pointer-events-auto">
              {/* Stat 1 */}
              <div className="flex items-center justify-center sm:justify-start text-center sm:text-left gap-2.5 sm:gap-3 px-2 py-3 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all">
                <Camera className="hidden sm:block w-5 h-5 text-[#FF7A00] shrink-0" />
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white leading-none">
                    500<span className="text-[#FF7A00]">+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium mt-1">
                    Installations
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center justify-center sm:justify-start text-center sm:text-left gap-2.5 sm:gap-3 px-2 py-3 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all">
                <Trophy className="hidden sm:block w-5 h-5 text-[#FF7A00] shrink-0" />
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white leading-none">
                    6<span className="text-[#FF7A00]">+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium mt-1">
                    Years Exp
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center justify-center sm:justify-start text-center sm:text-left gap-2.5 sm:gap-3 px-2 py-3 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md transition-all">
                <ShieldCheck className="hidden sm:block w-5 h-5 text-[#FF7A00] shrink-0" />
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white leading-none">
                    50<span className="text-[#FF7A00]">+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium mt-1">
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
