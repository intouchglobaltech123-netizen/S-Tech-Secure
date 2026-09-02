import { Section, SectionHeading } from "@/components/sections/Section";
import { industries } from "@/data/site";

export function Industries() {
  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industries"
        title="Different sites, different risk."
        copy="A shop floor, a factory gate and a family home each need a different plan. These are the environments we work in most often."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {industries.map(({ icon: Icon, name, need }) => (
          <article
            key={name}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface p-8 transition-colors hover:border-border-strong"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <Icon className="h-6 w-6 text-highlight" aria-hidden="true" />
            <h3 className="mt-6 font-display text-lg font-semibold">{name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{need}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
