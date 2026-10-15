import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
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

  // Stop the page scrolling behind the open phone menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Close it if the screen becomes wide enough for the desktop links (e.g. tablet rotated)
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

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
      className={`fixed top-0 inset-x-0 ${mobileMenuOpen ? "z-[60]" : "z-50"} w-full select-none border-b transition-all duration-300 ease-out ${
        isRevealed
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        mobileMenuOpen
          ? "h-[100dvh] flex flex-col bg-[#0D1C34] border-transparent"
          : solid
            ? "bg-white/90 backdrop-blur-lg border-slate-200/80"
            : "bg-transparent border-transparent"
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* Same horizontal padding as the hero, so the logo lines up with the headline */}
      <div
        className={`w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6 transition-all duration-300 ${
          solid ? "py-3" : "py-4 sm:py-5"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="S TEC SECURE Home"
          className="flex-shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60"
        >
          <MergedLogo isLightNav={solid && !mobileMenuOpen} className="h-9 sm:h-10 lg:h-11 w-auto" />
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

        {/* Phone: quick call + menu pill */}
        <div className="md:hidden flex items-center gap-2">
          {!mobileMenuOpen && (
            <a
              href="tel:+919600252605"
              aria-label="Call S TEC SECURE"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7A00] text-white shadow-[0_6px_16px_-6px_rgba(255,122,0,0.8)] active:scale-95 transition-transform"
            >
              <Phone size={16} strokeWidth={2.4} />
            </a>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`inline-flex h-10 items-center gap-2 rounded-full pl-4 pr-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/60 ${
              mobileMenuOpen
                ? "bg-white/10 text-white"
                : solid
                  ? "bg-[#0D1C34] text-white"
                  : "bg-white/[0.08] border border-white/20 text-white backdrop-blur-md"
            }`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Phone menu: full screen, large links, quick contact */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden flex-1 overflow-y-auto text-white">
          <div className="flex min-h-full flex-col px-6 sm:px-10 pt-4 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <nav aria-label="Mobile Navigation">
              <ul className="border-t border-white/10">
                {[...navLinks, { label: "Contact", href: "/contact" } as const].map((link, i) => {
                  const current = isActive(link.href);
                  return (
                    <li key={link.label} className="border-b border-white/10">
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={current ? "page" : undefined}
                        className="group flex items-center gap-4 py-4"
                      >
                        <span className="w-6 text-xs font-semibold tabular-nums text-white/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 text-[26px] font-semibold tracking-tight transition-colors ${
                            current ? "text-white" : "text-white/65 group-hover:text-white"
                          }`}
                        >
                          {link.label}
                        </span>
                        {current ? (
                          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#FF7A00]" />
                        ) : (
                          <ArrowRight
                            size={18}
                            aria-hidden
                            className="text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#FF7A00]"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto pt-10">
              <p className="text-sm text-white/55">Talk to an engineer</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href="tel:+919600252605"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#FF7A00] text-[15px] font-semibold text-white active:scale-[0.98] transition-transform"
                >
                  <Phone size={16} strokeWidth={2.4} />
                  Call us
                </a>
                <a
                  href={`https://wa.me/919600252605?text=${encodeURIComponent("Hi S TEC SECURE, I would like to know more about your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex h-12 items-center justify-center rounded-xl bg-white text-[15px] font-semibold text-[#0D1C34] active:scale-[0.98] transition-transform"
                >
                  WhatsApp
                </a>
              </div>
              <p className="mt-5 text-sm text-white/55">Mon – Sat, 8:00 AM – 8:00 PM · Erode, Tamil Nadu</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteNav;
