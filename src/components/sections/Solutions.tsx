import { Section, SectionHeading } from "@/components/sections/Section";
import { solutions } from "@/data/site";

export function Solutions() {
  return (
    <Section id="solutions">
      <SectionHeading
        eyebrow="Solutions"
        title="Security capability, end to end."
        copy="From the first site walk to long-term maintenance — each capability is delivered by the same team, so nothing is handed off and lost."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {solutions.map(({ icon: Icon, title, copy }) => (
          <article
            key={title}
            className="group relative bg-surface p-8 transition-colors hover:bg-surface-elevated"
          >
            <span className="absolute inset-x-8 top-0 h-px scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-6 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
