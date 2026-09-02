import { Section, SectionHeading } from "@/components/sections/Section";
import { projects } from "@/data/site";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Representative installations."
        copy="Project types we regularly deliver. Replace with your own documented sites and photographs as they are approved by the customer."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.type}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface"
          >
            <div className="relative h-44 overflow-hidden border-b border-border bg-[oklch(0.12_0.012_250)]">
              <div className="absolute inset-0 tech-grid opacity-60" />
              <div className="absolute inset-0 atmos-glow opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-highlight">
                {p.location}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-lg font-semibold">{p.type}</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Requirement
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{p.requirement}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Solution
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{p.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Result
                  </dt>
                  <dd className="mt-1 text-foreground/85">{p.result}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
