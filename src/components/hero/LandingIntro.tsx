import { useEffect, useState } from "react";

/**
 * Opening animation shown on the first visit (and on refresh), on desktop and phones:
 * a real CCTV camera turns from left to right, faces the viewer and its infrared ring glows,
 * then the screen splits open (top half up, bottom half down) to reveal the hero.
 * The clip (public/services/intro-camera.mp4) is 3.6 s; the whole intro ≈ 4.5 s.
 */
const TOTAL_MS = 4500;

const css = `
@keyframes stec-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes stec-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes stec-content-out { 0%, 79% { opacity: 1; } 86%, 100% { opacity: 0; } }
@keyframes stec-open-top { 0%, 81% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
@keyframes stec-open-bottom { 0%, 81% { transform: translateY(0); } 100% { transform: translateY(100%); } }
@keyframes stec-seam { 0%, 76% { opacity: 0; transform: scaleX(0); } 82% { opacity: 1; transform: scaleX(1); } 88%, 100% { opacity: 0; transform: scaleX(1); } }
`;

// Soft circular fade so the clip's grey studio background melts into the navy screen
const spotlightMask = "radial-gradient(closest-side at 50% 50%, #000 78%, transparent 100%)";

export function LandingIntro({ onDone }: { onDone: () => void }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setReduced(prefersReduced);

    // Start from the top (a refresh can restore an old scroll position) and keep the page still
    window.scrollTo(0, 0);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(onDone, prefersReduced ? 400 : TOTAL_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = `${TOTAL_MS}ms`;
  const run = (name: string, timing = "ease-in-out") =>
    reduced ? undefined : `${name} ${t} ${timing} forwards`;

  return (
    <div aria-hidden className="fixed inset-0 z-[80] pointer-events-auto select-none">
      <style>{css}</style>

      {/* The two halves that slide apart */}
      <div
        className="absolute inset-x-0 top-0 h-[calc(50%+2px)] bg-[#070A12]"
        style={{ animation: run("stec-open-top", "cubic-bezier(.7,0,.3,1)") }}
        onAnimationEnd={(e) => {
          if (e.animationName === "stec-open-top") onDone();
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[calc(50%+2px)] bg-[#070A12]"
        style={{ animation: run("stec-open-bottom", "cubic-bezier(.7,0,.3,1)") }}
      />

      {/* Orange seam where it opens */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
        style={{ animation: run("stec-seam", "ease-out"), opacity: 0 }}
      />

      {/* Camera clip + logo */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ animation: run("stec-content-out", "linear") }}
      >
        <div
          className="relative w-[270px] sm:w-[360px] lg:w-[400px] aspect-[720/738]"
          style={{ animation: reduced ? undefined : "stec-fade-in 400ms ease-out both" }}
        >
          {/* Soft warm glow behind the camera */}
          <div
            aria-hidden
            className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.18),rgba(255,122,0,0)_70%)] blur-2xl"
          />
          <video
            src="/services/intro-camera-v2.mp4"
            poster="/services/intro-camera-poster-v2.jpg"
            autoPlay={!reduced}
            muted
            playsInline
            preload="auto"
            className="relative h-full w-full object-cover mix-blend-lighten"
            style={{ WebkitMaskImage: spotlightMask, maskImage: spotlightMask }}
          />
        </div>

        <img
          src="/logo-dark.png"
          alt=""
          width={360}
          height={81}
          className="mt-1 sm:mt-2 h-9 sm:h-11 w-auto"
          style={{ animation: reduced ? undefined : "stec-fade-in 600ms 250ms ease-out both" }}
        />
        <p
          className="mt-3 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/55"
          style={{ animation: reduced ? undefined : "stec-fade-in 600ms 400ms ease-out both" }}
        >
          Surveillance &amp; Automation
        </p>

        {/* Progress line */}
        <div className="mt-6 h-0.5 w-40 sm:w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full w-full origin-left bg-[#FF7A00]"
            style={{
              animation: reduced ? undefined : `stec-progress ${Math.round(TOTAL_MS * 0.8)}ms linear forwards`,
              transform: reduced ? "none" : "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
