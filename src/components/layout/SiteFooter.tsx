import { company, addressLine, serviceAreas } from "@/data/company";
import { solutions, productCategories } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative hairline-top bg-[oklch(0.11_0.01_250)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.22em]">
              STEC<span className="text-primary">·</span>Secure
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Professional CCTV installation, IP camera systems, AI video surveillance and
              access control for homes, offices, factories and commercial premises.
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic text-muted-foreground">
              <p>{addressLine}</p>
              <p>
                <a href={company.phoneHref} className="hover:text-primary">
                  {company.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-primary">
                  {company.email}
                </a>
              </p>
              <p>{company.hours}</p>
            </address>
          </div>

          <nav aria-label="Solutions">
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-highlight">
              Solutions
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {solutions.map((s) => (
                <li key={s.title}>
                  <a href="/#solutions" className="hover:text-foreground">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products">
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-highlight">
              Products
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {productCategories.slice(0, 7).map((p) => (
                <li key={p.name}>
                  <a href="/#products" className="hover:text-foreground">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Service areas">
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-highlight">
              Service areas
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {serviceAreas.map((a) => (
                <li key={a.name}>
                  <a href="/#areas" className="hover:text-foreground">
                    CCTV installation in {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} {company.legalName} · {company.tagline}
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            Video surveillance · IP cameras · AI security · Access control
          </p>
        </div>
      </div>
    </footer>
  );
}
