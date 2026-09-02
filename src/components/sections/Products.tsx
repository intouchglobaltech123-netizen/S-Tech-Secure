import { Section, SectionHeading } from "@/components/sections/Section";
import { productCategories } from "@/data/site";

export function Products() {
  return (
    <Section id="products">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="Product categories"
          title="Hardware chosen for the site, not the catalogue."
          copy="We supply and install the categories below. Specification is decided during design — resolution, lens, night-vision type, storage and network hardware all follow the survey."
        />
        <a
          href="#contact"
          className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-highlight transition-colors hover:text-foreground"
        >
          Ask about a product →
        </a>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productCategories.map(({ icon: Icon, name, spec }) => (
          <li
            key={name}
            className="group flex items-start gap-4 rounded-lg border border-border bg-surface/60 p-6 transition-all hover:border-border-strong hover:bg-surface"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded border border-border bg-background">
              <Icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
            </span>
            <span>
              <h3 className="font-display text-base font-semibold">{name}</h3>
              <p className="mt-1.5 font-mono text-[0.68rem] tracking-wide text-muted-foreground">
                {spec}
              </p>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
