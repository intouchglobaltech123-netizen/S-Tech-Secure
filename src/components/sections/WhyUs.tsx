import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { whyUs, projects } from "@/data/site";

export function WhyUs() {
  return (
    <Section id="why">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why choose us"
            title="Installed properly. Supported afterwards."
          />
          <ul className="mt-10 space-y-4">
            {whyUs.map((p) => (
              <li key={p} className="flex items-start gap-3 border-b border-border pb-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel rounded-lg p-8">
          <p className="eyebrow">Typical engagement</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Most projects begin with a free site survey. You receive a coverage plan with
            camera positions, hardware list and recording retention before anything is
            purchased — so the quote reflects a design, not a guess.
          </p>
          <dl className="mt-8 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-3">
            {[
              { t: "Survey", d: "On-site walkthrough" },
              { t: "Design", d: "Coverage + hardware plan" },
              { t: "Support", d: "Maintenance after handover" },
            ].map((x) => (
              <div key={x.t} className="bg-surface p-5">
                <dt className="font-display text-sm font-semibold">{x.t}</dt>
                <dd className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  {x.d}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-highlight">
            {projects.length} representative project types below
          </p>
        </div>
      </div>
    </Section>
  );
}
