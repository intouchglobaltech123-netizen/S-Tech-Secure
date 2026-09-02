import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

const links = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Products", href: "/#products" },
  { label: "AI Technology", href: "/#ai" },
  { label: "Industries", href: "/#industries" },
  { label: "Projects", href: "/#projects" },
  { label: "Service Areas", href: "/#areas" },
];

function Wordmark() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5"
      aria-label={`${company.name} home`}
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 rotate-45 border border-border-strong" />
        <span className="absolute inset-[7px] rounded-full bg-primary shadow-glow transition-transform group-hover:scale-110" />
      </span>
      <span className="font-display text-sm font-semibold tracking-[0.22em] uppercase">
        STEC<span className="text-primary">·</span>Secure
      </span>
    </Link>
  );
}

export function SiteNav({ revealed = true }: { revealed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          revealed ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 rounded-lg px-4 py-3 transition-all duration-500",
              scrolled ? "surface-panel shadow-elevated" : "border border-transparent",
            )}
            aria-label="Primary"
          >
            <Wordmark />

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="relative whitespace-nowrap rounded px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={company.phoneHref}
                className="hidden items-center gap-2 rounded border border-border px-3 py-2 font-mono text-[0.72rem] tracking-widest text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:flex whitespace-nowrap"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {company.phone}
              </a>
              <a
                href="/#contact"
                className="hidden rounded bg-primary px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-primary-foreground transition-all hover:shadow-glow lg:block whitespace-nowrap"
              >
                Get a Quote
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="rounded border border-border p-2.5 text-foreground transition-colors hover:border-border-strong lg:hidden"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* fullscreen mobile panel */}
      <div
        className={cn(
          "fixed inset-0 z-60 flex flex-col bg-[oklch(0.1_0.01_250)] transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="relative flex items-center justify-between px-6 py-6">
          <Wordmark />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded border border-border p-2.5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-border py-4"
            >
              <span className="font-mono text-[0.7rem] text-highlight">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl tracking-tight transition-colors group-hover:text-primary">
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="relative space-y-3 px-6 pb-10">
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="block rounded bg-primary px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground"
          >
            Get a Security Quote
          </a>
          <a
            href={company.phoneHref}
            className="block rounded border border-border px-5 py-4 text-center font-mono text-xs tracking-widest text-muted-foreground"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </>
  );
}
