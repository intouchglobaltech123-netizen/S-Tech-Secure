import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useRouterState, Link } from "@tanstack/react-router";
import { hasHeroPlayedInSession } from "@/components/hero/Hero";

/**
 * Brand logo.
 *
 * Uses two pre-processed, tightly-cropped PNGs (no canvas work at runtime):
 *  - /logo-light.png → dark lettering, for light backgrounds
 *  - /logo-dark.png  → white lettering, for dark backgrounds / over the hero
 * Both are stacked and cross-faded so switching nav states is smooth.
 */
export function MergedLogo({
  isLightNav = false,
  className = "h-12 sm:h-14 w-auto",
}: {
  isLightNav?: boolean;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <img
        src="/logo-light.png"
        width={360}
        height={81}
        alt={isLightNav ? "S TEC SECURE — Surveillance & Automation Solutions" : ""}
        aria-hidden={!isLightNav}
        className={`h-full w-auto object-contain transition-opacity duration-300 ${
          isLightNav ? "opacity-100" : "opacity-0"
        }`}
        loading="eager"
        decoding="async"
      />
      <img
        src="/logo-dark.png"
        width={360}
        height={81}
        alt={isLightNav ? "" : "S TEC SECURE — Surveillance & Automation Solutions"}
        aria-hidden={isLightNav}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
          isLightNav ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
] as const;

export function SiteNav({ revealed = true }: { revealed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Session-storage based reveal state only exists in the browser. Wait until after
  // hydration before using it, so the first client render matches the server HTML
  // (otherwise React keeps the server's hidden classes and the nav never appears).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const isHome = pathname === "/";
  // Subpages always reveal immediately. Homepage reveals when the hero video ends, on scroll, or if already played this session.
  const isRevealed =
    !isHome || (mounted && (revealed || scrolled || hasHeroPlayedInSession()));
  // "Solid" = white bar (scrolled, or any subpage). Otherwise transparent over the hero.
  const solid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on route change and on Escape
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full select-none border-b transition-all duration-300 ease-out ${
        isRevealed
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        solid
          ? "bg-white/90 backdrop-blur-lg border-slate-200/80"
          : "bg-transparent border-transparent"
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* Same horizontal padding as the hero, so the logo lines up with the headline */}
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6 transition-all duration-300 ${
          solid ? "py-3" : "py-4 sm:py-5"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="S TEC SECURE Home"
          className="flex-shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60"
        >
          <MergedLogo isLightNav={solid} className="h-9 sm:h-10 lg:h-11 w-auto" />
        </Link>

        {/* Desktop: links + one CTA */}
        <div className="hidden md:flex items-center gap-3">
          <nav
            aria-label="Main Navigation"
            className={`flex items-center gap-1 rounded-full border p-1 transition-colors duration-300 ${
              solid ? "bg-[#0D1C34] border-[#0D1C34]" : "bg-white/[0.06] border-white/15 backdrop-blur-md"
            }`}
          >
            {navLinks.map((link) => {
              const current = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 px-4 py-[7px] rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60 ${
                    current ? "bg-white text-[#0D1C34]" : "text-white/75 hover:text-white"
                  }`}
                >
                  {current && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60 focus-visible:ring-offset-2"
          >
            Contact
            <ArrowRight size={15} strokeWidth={2.4} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60 ${
            solid || mobileMenuOpen
              ? "bg-[#0D1C34] text-white"
              : "bg-white/[0.08] border border-white/20 text-white backdrop-blur-md"
          }`}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden px-4 pb-4">
          <div className="rounded-2xl bg-[#0D1C34] p-2 text-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav aria-label="Mobile Navigation" className="flex flex-col">
              {navLinks.map((link) => {
                const current = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={current ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      current ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${current ? "bg-[#FF7A00]" : "bg-transparent"}`}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-[#FF7A00] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E96F00]"
            >
              Contact
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteNav;
