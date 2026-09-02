import { useEffect, useState } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { aiFeatures } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const scenes = [
  { label: "Human detected", box: "left-[18%] top-[26%] h-[52%] w-[16%]", meta: "PERSON · 0.94" },
  { label: "Vehicle detected", box: "left-[52%] top-[46%] h-[34%] w-[34%]", meta: "VEHICLE · 0.91" },
  { label: "Restricted zone entered", box: "left-[30%] top-[34%] h-[46%] w-[24%]", meta: "ZONE 02 · ALERT" },
];

export function AiIntelligence() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % scenes.length), 3200);
    return () => clearInterval(id);
  }, [reduced]);

  const scene = scenes[i] ?? scenes[0]!;

  return (
    <Section id="ai">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="AI security intelligence"
            title="Cameras that classify what they see."
            copy="On supported hardware, detection runs on the camera or recorder — so alerts describe people, vehicles and zone breaches instead of every moving shadow. Fewer false alarms, faster review."
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {aiFeatures.map((f) => (
              <li key={f.label} className="bg-surface p-5">
                <p className="font-display text-sm font-semibold">{f.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* enterprise-style detection overlay */}
        <figure className="relative aspect-4/3 overflow-hidden rounded-lg border border-border bg-[oklch(0.12_0.012_250)]">
          <div className="absolute inset-0 tech-grid opacity-60" />
          <div className="absolute inset-0 atmos-glow opacity-70" />
          {/* stand-in scene geometry: forecourt, wall, lane */}
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[oklch(0.16_0.012_250)]" />
          <div className="absolute bottom-[42%] left-0 h-px w-full bg-border-strong" />
          <div className="absolute bottom-0 left-[46%] h-[42%] w-px bg-border" />

          <div
            className={cn(
              "absolute border-2 border-primary transition-all duration-700 ease-out",
              scene.box,
            )}
          >
            <span className="absolute -top-6 left-0 bg-primary px-2 py-0.5 font-mono text-[0.6rem] tracking-widest text-primary-foreground">
              {scene.meta}
            </span>
            <span className="absolute inset-0 bg-primary/10" />
          </div>

          <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/70 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] backdrop-blur">
            <span className="flex items-center gap-2 text-highlight">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
              {scene.label}
            </span>
            <span className="text-muted-foreground">Live analytics · illustrative</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
