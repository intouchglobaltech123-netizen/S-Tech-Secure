import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { company } from "@/data/company";

/**
 * Cinematic entry: a camera silhouette rises out of darkness while the
 * environment lights up, then the whole layer lifts away into the hero.
 * No spinner, no "Loading" copy. Skippable and reduced-motion safe.
 */
export function Splash({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const finish = () => {
      setGone(true);
      doneRef.current();
    };

    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("stec-splash-seen") === "1") {
      finish();
      return;
    }
    sessionStorage.setItem("stec-splash-seen", "1");

    if (reduced) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to("[data-splash-ambient]", { opacity: 1, duration: 0.9, ease: "power2.out" }, 0.2)
        .fromTo(
          "[data-splash-rig]",
          { y: 180, opacity: 0, scale: 0.82, rotate: -6 },
          { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.6, ease: "power3.out" },
          0.4,
        )
        .to("[data-splash-rig]", { rotate: 4, duration: 1.1, ease: "power2.inOut" }, 1.0)
        .to("[data-splash-lens]", { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.5)
        .to("[data-splash-glint]", { xPercent: 320, duration: 0.7, ease: "power2.inOut" }, 2.1)
        .fromTo(
          "[data-splash-word]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          1.5,
        )
        .to("[data-splash-scanline]", { scaleX: 1, duration: 1.9, ease: "power1.inOut" }, 0.6)
        .to(
          root.current,
          { opacity: 0, scale: 1.06, filter: "blur(6px)", duration: 0.6, ease: "power2.inOut" },
          2.2,
        );
    }, root);

    // hard safety net: never trap the visitor behind the intro
    const failsafe = window.setTimeout(finish, 3400);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [reduced]);

  const skip = () => {
    gsap.killTweensOf("*");
    setGone(true);
    doneRef.current();
  };

  if (gone) return null;

  return (
    <div
      ref={root}
      role="presentation"
      className="fixed inset-0 z-100 overflow-hidden bg-[oklch(0.09_0.01_250)]"
    >
      <div data-splash-ambient className="absolute inset-0 opacity-0 atmos-glow" />
      <div className="absolute inset-0 tech-grid opacity-40" />

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 px-6">
        {/* stylised camera rig silhouette */}
        <div data-splash-rig className="relative h-40 w-72 opacity-0">
          <div className="absolute bottom-0 left-1/2 h-16 w-2 -translate-x-1/2 rounded-full bg-surface-elevated" />
          <div className="absolute bottom-14 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-muted" />
          <div className="absolute bottom-[4.5rem] left-1/2 h-14 w-56 -translate-x-1/2 overflow-hidden rounded-[2rem] border border-border-strong bg-gradient-to-b from-surface-elevated to-surface">
            <div
              data-splash-glint
              className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-foreground/15"
            />
          </div>
          <div className="absolute bottom-[5rem] left-[76%] h-12 w-12 rounded-full border border-border-strong bg-background">
            <div
              data-splash-lens
              className="absolute inset-2 rounded-full bg-primary opacity-0 shadow-glow"
            />
          </div>
        </div>

        <div className="text-center">
          <p data-splash-word className="eyebrow opacity-0">
            {company.name} — {company.tagline}
          </p>
          <div className="mx-auto mt-5 h-px w-56 overflow-hidden bg-border">
            <div
              data-splash-scanline
              className="h-px w-full origin-left scale-x-0 bg-highlight"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 right-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        Skip intro
      </button>
    </div>
  );
}
