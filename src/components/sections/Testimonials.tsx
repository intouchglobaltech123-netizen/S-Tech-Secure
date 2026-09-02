import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { testimonialSlots } from "@/data/site";

/**
 * Placeholder slots only — no invented testimonials. Drop verified quotes into
 * `testimonialSlots` in src/data/site.ts (add a `quote` and `name` field).
 */
export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Customer feedback"
        title="Verified customer words go here."
        copy="We don't publish invented reviews. These slots are ready for real, approved customer testimonials."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {testimonialSlots.map((t) => (
          <figure
            key={t.project}
            className="rounded-lg border border-dashed border-border-strong bg-surface/50 p-8"
          >
            <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
            <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Awaiting a verified customer testimonial for this project.
            </blockquote>
            <figcaption className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
              {t.project} · {t.area}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
