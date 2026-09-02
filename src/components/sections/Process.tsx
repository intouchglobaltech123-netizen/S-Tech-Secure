import { Section, SectionHeading } from "@/components/sections/Section";
import { processSteps } from "@/data/site";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Installation process"
        title="Nine steps from survey to support."
        copy="A repeatable process is what separates a professional installation from a weekend job."
      />

      <ol className="relative mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {processSteps.map((s) => (
          <li key={s.no} className="group relative bg-surface p-8">
            <span className="absolute left-0 top-0 h-full w-px bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
            <p className="font-mono text-[0.7rem] tracking-[0.24em] text-highlight">{s.no}</p>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
