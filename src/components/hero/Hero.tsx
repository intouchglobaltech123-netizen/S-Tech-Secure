import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { WebglCameraStage } from "@/components/three/WebglCameraStage";
import { heroCameras } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [cam, setCam] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-eyebrow]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(
          "[data-hero-line]",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 },
          0.1,
        )
        .fromTo("[data-hero-sub]", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.55)
        .fromTo("[data-hero-cta]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.75)
        .fromTo("[data-hero-meta]", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1);
    }, root);
    return () => ctx.revert();
  }, [active, reduced]);

  const current = heroCameras[cam] ?? heroCameras[0]!;

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16"
      aria-label="Intelligent surveillance systems"
    >
      {/* depth layer 1 — environment */}
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
      {/* depth layer 2 — atmosphere */}
      <div className="absolute inset-0 atmos-glow" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[oklch(0.09_0.01_250)] to-transparent"
        aria-hidden="true"
      />

      {/* depth layer 3 — 3D camera stage */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-4%] top-[38%] md:top-[26%]">
        <WebglCameraStage onActive={setCam} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6">
        <p data-hero-eyebrow className="eyebrow">
          Smart security technology
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,7vw,5.4rem)] leading-[0.95] font-semibold">
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-gradient-steel">
              Security that
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-gradient-steel">
              never looks away.
            </span>
          </span>
        </h1>
        <p
          data-hero-sub
          className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Advanced CCTV and IP surveillance, intelligent detection and professionally
          engineered security systems — designed, installed and maintained for homes,
          offices, factories and commercial sites across Erode and Tamil Nadu.
        </p>

        <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded bg-primary px-6 py-4 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-primary-foreground transition-all hover:shadow-glow"
          >
            Get a Security Quote
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center gap-2 rounded border border-border-strong px-6 py-4 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-surface"
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Explore Solutions
          </a>
        </div>

        {/* live camera readout tied to the 3D loop */}
        <div
          data-hero-meta
          className="mt-14 flex items-center gap-4 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase"
          aria-hidden="true"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-highlight" />
            {current.code}
          </span>
          <span className="h-px w-10 bg-border-strong" />
          <span className="text-foreground/80">{current.label}</span>
        </div>
      </div>
    </section>
  );
}
