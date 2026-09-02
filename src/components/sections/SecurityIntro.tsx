import { Section, SectionHeading } from "@/components/sections/Section";

const stats = [
  { k: "SEE", v: "Coverage designed around your actual entries and blind spots." },
  { k: "DETECT", v: "Motion, human, vehicle and zone events flagged in real time." },
  { k: "UNDERSTAND", v: "Searchable footage so you find the moment that matters." },
  { k: "PROTECT", v: "Systems that keep running — with support after handover." },
];

export function SecurityIntro() {
  return (
    <Section id="intro">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Protection, engineered"
            title="Surveillance is a system — not a box of cameras."
          />
          <p className="mt-6 max-w-lg text-muted-foreground">
            Most installations fail quietly: a camera pointed at a wall, a recorder
            overwriting footage too early, a network that drops at night. We approach
            security the way an engineer would — survey the site, rank the risk, design the
            coverage, then install it properly.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {stats.map((s) => (
            <li key={s.k} className="bg-surface p-7">
              <p className="font-mono text-[0.68rem] tracking-[0.24em] text-highlight">{s.k}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
