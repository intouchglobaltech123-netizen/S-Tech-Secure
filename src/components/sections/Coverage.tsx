import { useState } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { coverageModes } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Coverage explainer: an isometric building block with camera cones that
 * change as the visitor selects a coverage mode. SVG, so it stays cheap.
 */
export function Coverage() {
  const [mode, setMode] = useState(0);

  const activeMode = coverageModes[mode] ?? coverageModes[0]!;

  const cones = ([
    // wide angle
    [{ x: 150, y: 96, rot: 90, spread: 78 }],
    // blind spot reduction
    [
      { x: 96, y: 96, rot: 62, spread: 52 },
      { x: 204, y: 96, rot: 118, spread: 52 },
    ],
    // night coverage
    [{ x: 150, y: 96, rot: 90, spread: 60 }],
    // entry monitoring
    [{ x: 150, y: 120, rot: 90, spread: 34 }],
    // perimeter
    [
      { x: 60, y: 84, rot: 40, spread: 40 },
      { x: 150, y: 84, rot: 90, spread: 40 },
      { x: 240, y: 84, rot: 140, spread: 40 },
    ],
  ] as const)[mode] ?? [];

  return (
    <Section id="coverage">
      <SectionHeading
        eyebrow="Security coverage experience"
        title="Every camera earns its position."
        copy="Coverage is planned as geometry: lens angle, mounting height, light at night, and the overlap that removes blind spots. Select a mode to see how the plan changes."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <ul className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
          {coverageModes.map((m, i) => (
            <li key={m.name}>
              <button
                type="button"
                onClick={() => setMode(i)}
                aria-pressed={mode === i}
                className={cn(
                  "w-full bg-surface px-6 py-5 text-left transition-colors",
                  mode === i ? "bg-surface-elevated" : "hover:bg-surface-elevated/60",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      mode === i ? "bg-highlight" : "bg-muted",
                    )}
                  />
                  <span className="font-display text-base font-semibold">{m.name}</span>
                </span>
                <span className="mt-2 block pl-[1.15rem] text-sm text-muted-foreground">
                  {m.copy}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <figure className="relative overflow-hidden rounded-lg border border-border bg-[oklch(0.12_0.012_250)] p-4">
          <div className="absolute inset-0 tech-grid opacity-50" />
          <svg
            viewBox="0 0 300 260"
            className="relative w-full"
            role="img"
            aria-label={`Diagram of ${activeMode.name} camera coverage on a building`}
          >
            {cones.map((c, i) => {
              const a1 = ((c.rot - c.spread / 2) * Math.PI) / 180;
              const a2 = ((c.rot + c.spread / 2) * Math.PI) / 180;
              const r = 130;
              return (
                <path
                  key={i}
                  d={`M${c.x} ${c.y} L${c.x + Math.cos(a1) * r} ${c.y + Math.sin(a1) * r} A${r} ${r} 0 0 1 ${c.x + Math.cos(a2) * r} ${c.y + Math.sin(a2) * r} Z`}
                  fill="oklch(0.62 0.19 250 / 0.16)"
                  stroke="oklch(0.72 0.15 240 / 0.5)"
                  strokeWidth="1"
                />
              );
            })}

            {/* building */}
            <path d="M70 60 L230 60 L230 110 L70 110 Z" fill="oklch(0.2 0.014 250)" stroke="oklch(1 0 0 / 0.16)" />
            <path d="M70 60 L150 30 L230 60" fill="oklch(0.24 0.016 250)" stroke="oklch(1 0 0 / 0.16)" />
            <rect x="140" y="88" width="20" height="22" fill="oklch(0.14 0.012 250)" stroke="oklch(1 0 0 / 0.14)" />
            {/* ground line */}
            <line x1="20" y1="230" x2="280" y2="230" stroke="oklch(1 0 0 / 0.16)" />

            {cones.map((c, i) => (
              <g key={`cam-${i}`}>
                <circle cx={c.x} cy={c.y} r="4.5" fill="oklch(0.62 0.19 250)" />
                <circle cx={c.x} cy={c.y} r="9" fill="none" stroke="oklch(0.62 0.19 250 / 0.4)" />
              </g>
            ))}
          </svg>
          <figcaption className="relative mt-2 flex justify-between px-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span>{activeMode.name}</span>
            <span>Illustrative coverage plan</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
