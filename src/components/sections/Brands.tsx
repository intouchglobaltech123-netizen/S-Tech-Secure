import { Section, SectionHeading } from "@/components/sections/Section";
import { brands } from "@/data/company";

export function Brands() {
  return (
    <Section id="brands">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="Brands we work with"
          title="Genuine hardware, warranty intact."
        />
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {brands.map((b) => (
            <li
              key={b}
              className="flex h-24 items-center justify-center bg-surface px-4 transition-colors hover:bg-surface-elevated"
            >
              <span className="font-display text-base tracking-[0.12em] uppercase text-muted-foreground">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
        Brand list is configurable — keep only lines you actually supply.
      </p>
    </Section>
  );
}
