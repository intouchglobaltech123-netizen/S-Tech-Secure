import { useEffect, useState } from "react";

/**
 * Opening animation shown on the first visit (and on refresh):
 * a CCTV camera sweeps left → right with a scan beam, returns to centre, the lens flashes,
 * then the screen splits open (top half up, bottom half down) to reveal the hero.
 * Total ≈ 3.3 s. Works the same on desktop and phones.
 */
const TOTAL_MS = 3300;

const css = `
@keyframes stec-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes stec-sweep {
  0%   { transform: rotate(38deg); }
  12%  { transform: rotate(38deg); }
  62%  { transform: rotate(-38deg); }
  85%  { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
@keyframes stec-beam { 0%, 10% { opacity: 0; } 20%, 80% { opacity: 1; } 100% { opacity: 0; } }
@keyframes stec-flash { 0%, 80% { opacity: 0; transform: scale(0.6); } 88% { opacity: 1; transform: scale(1.6); } 100% { opacity: 0; transform: scale(2.2); } }
@keyframes stec-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.25; } }
@keyframes stec-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes stec-content-out { 0%, 72% { opacity: 1; } 80%, 100% { opacity: 0; } }
@keyframes stec-open-top { 0%, 74% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
@keyframes stec-open-bottom { 0%, 74% { transform: translateY(0); } 100% { transform: translateY(100%); } }
@keyframes stec-seam { 0%, 70% { opacity: 0; transform: scaleX(0); } 76% { opacity: 1; transform: scaleX(1); } 82%, 100% { opacity: 0; transform: scaleX(1); } }
`;

export function LandingIntro({ onDone }: { onDone: () => void }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setReduced(prefersReduced);

    // Keep the page still while the intro plays
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
    <div aria-hidden className="fixed inset-0 z-[80] pointer-events-none select-none">
      <style>{css}</style>

      {/* The two halves that slide apart */}
      <div
        className="absolute inset-x-0 top-0 h-[calc(50%+2px)] bg-[#070A12]"
        style={{ animation: run("stec-open-top", "cubic-bezier(.7,0,.3,1)") }}
        onAnimationEnd={(e) => {
          if (e.animationName === "stec-open-top") onDone();
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[calc(50%+2px)] bg-[#070A12]" style={{ animation: run("stec-open-bottom", "cubic-bezier(.7,0,.3,1)") }} />

      {/* Orange seam where it opens */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
        style={{ animation: run("stec-seam", "ease-out"), opacity: 0 }}
      />

      {/* Camera + logo */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ animation: run("stec-content-out", "linear") }}
      >
        <div style={{ animation: reduced ? undefined : "stec-fade-in 500ms ease-out both" }}>
          <svg viewBox="0 0 400 400" className="w-[200px] sm:w-[240px] h-auto overflow-visible">
            <defs>
              <linearGradient id="stec-beam-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stec-body-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#D5DCE6" />
              </linearGradient>
            </defs>

            {/* Ceiling mount */}
            <rect x="160" y="12" width="80" height="12" rx="4" fill="#2A3A55" />
            <rect x="193" y="24" width="14" height="44" rx="4" fill="#3A4C6B" />

            {/* Rotating camera (pivot at 200,70) */}
            <g style={{ transformOrigin: "200px 70px", animation: run("stec-sweep") }}>
              {/* Scan beam */}
              <polygon
                points="186,182 214,182 300,390 100,390"
                fill="url(#stec-beam-grad)"
                style={{ animation: run("stec-beam", "linear"), opacity: reduced ? 0.6 : 0 }}
              />
              <circle cx="200" cy="70" r="12" fill="#3A4C6B" />
              {/* Hood */}
              <rect x="164" y="74" width="72" height="20" rx="9" fill="#FFFFFF" />
              {/* Body */}
              <rect x="172" y="84" width="56" height="92" rx="16" fill="url(#stec-body-grad)" />
              {/* Status light */}
              <circle cx="200" cy="104" r="4" fill="#FF7A00" style={{ animation: reduced ? undefined : "stec-blink 600ms steps(1) infinite" }} />
              {/* Lens */}
              <circle cx="200" cy="170" r="22" fill="#0D1C34" />
              <circle cx="200" cy="170" r="13" fill="#1E3A5F" />
              <circle cx="194" cy="164" r="4" fill="#FFFFFF" fillOpacity="0.7" />
              {/* Lens flash */}
              <circle
                cx="200"
                cy="170"
                r="22"
                fill="#FFB066"
                style={{ transformOrigin: "200px 170px", animation: run("stec-flash", "ease-out"), opacity: 0 }}
              />
            </g>
          </svg>
        </div>

        <img
          src="/logo-dark.png"
          alt=""
          width={360}
          height={81}
          className="mt-2 h-9 sm:h-11 w-auto"
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
            style={{ animation: reduced ? undefined : `stec-progress ${Math.round(TOTAL_MS * 0.72)}ms ease-in-out forwards`, transform: reduced ? "none" : "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
