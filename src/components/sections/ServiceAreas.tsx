import { MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { serviceAreas, company } from "@/data/company";

export function ServiceAreas() {
  return (
    <Section id="areas">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Service areas"
            title="CCTV installation across Erode and nearby districts."
            copy={`${company.name} carries out CCTV camera installation, IP surveillance, service and repair across the areas below. If your site is just outside this list, ask — travel is often possible.`}
          />
          <a
            href="#contact"
            className="mt-8 inline-flex font-mono text-[0.72rem] uppercase tracking-[0.16em] text-highlight transition-colors hover:text-foreground"
          >
            Check coverage for your location →
          </a>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {serviceAreas.map((a) => (
            <li key={a.name} className="bg-surface p-6">
              <p className="flex items-center gap-2 font-display text-base font-semibold">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {a.name}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
