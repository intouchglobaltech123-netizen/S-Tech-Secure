import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useRouterState, Link } from "@tanstack/react-router";
import { hasHeroPlayedInSession } from "@/components/hero/Hero";

export function MergedLogo({
  isLightNav = false,
  className = "",
}: {
  isLightNav?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Brand Aperture Emblem + Orange S */}
      <img
        src="/favicon-brand.png"
        alt="S TEC SECURE"
        className={`h-9 sm:h-11 md:h-12 w-auto object-contain transition-all duration-300 ${
          isLightNav
            ? "filter-none"
            : "drop-shadow-[0_2px_10px_rgba(255,122,0,0.4)]"
        }`}
        loading="eager"
      />

      {/* Elegant Vertical Divider */}
      <div
        className={`h-7 sm:h-8 w-[1.5px] rounded-full transition-colors duration-300 ${
          isLightNav ? "bg-slate-300/80" : "bg-white/30"
        }`}
      />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-black text-lg sm:text-xl md:text-[22px] tracking-[0.06em] uppercase transition-colors duration-300 ${
            isLightNav ? "text-[#0B1528]" : "text-white"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          TEC SECURE
        </span>
        <span className="text-[7.5px] sm:text-[9px] font-bold tracking-[0.22em] text-[#FF7A00] uppercase mt-1">
          SURVEILLANCE &amp; AUTOMATIONS
        </span>
      </div>
    </div>
  );
}

export function SiteNav({ revealed = true }: { revealed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Read current pathname from TanStack Router
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const isHome = pathname === "/";
  // Subpages (/about, /services, /blog, /contact) always reveal immediately. Homepage reveals when video reaches last 2s, scrolled, or already played in session.
  const isRevealed = !isHome || revealed || scrolled || hasHeroPlayedInSession();
  const isLightNav = !isHome || scrolled;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active route
  const isServicesActive = pathname.startsWith("/services");
  const isHomeActive = pathname === "/" && !isServicesActive;
  const isAboutActive = pathname === "/about";
  const isBlogActive = pathname === "/blog";
  const isContactActive = pathname === "/contact";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full select-none transition-all duration-300 ease-out ${
        isRevealed ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled || !isHome
          ? "bg-[#F8FAFC]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
      }`}
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center flex-shrink-0 z-20">
          <Link
            to="/"
            className="group flex items-center cursor-pointer select-none transition-transform duration-200 active:scale-95 py-0.5"
            aria-label="S TEC SECURE Home"
          >
            <MergedLogo isLightNav={isLightNav} />
          </Link>
        </div>

        {/* Right: Single Floating Capsule with Home, About, Services, Blog, and Contact */}
        <div className="flex items-center gap-3 z-20">
          <nav
            aria-label="Main Navigation"
            className="hidden md:inline-flex items-center rounded-full bg-[#0D1C34] border border-white/10 shadow-[0_8px_32px_rgba(13,28,52,0.4)] p-1.5 transition-all duration-300"
          >
            {navLinks.map((link) => {
              const isCurrent =
                (link.label === "Home" && isHomeActive) ||
                (link.label === "About" && isAboutActive) ||
                (link.label === "Services" && isServicesActive) ||
                (link.label === "Blog" && isBlogActive) ||
                (link.label === "Contact" && isContactActive);

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-[13.5px] tracking-normal transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-white text-[#0D1C34] font-semibold shadow-sm scale-[1.02]"
                      : "text-white/80 hover:text-white hover:bg-white/10 font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full shadow-md text-white bg-[#0D1C34] hover:bg-[#142A4D] border border-white/10 transition-all duration-200 focus:outline-none active:scale-90"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Card */}
      {mobileMenuOpen && (
        <div
          className="absolute top-full left-4 right-4 mt-2 p-4 rounded-3xl shadow-2xl animate-in slide-in-from-top-2 duration-200 border border-white/10 bg-[#0D1C34]/98 backdrop-blur-2xl text-white flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isCurrent =
                (link.label === "Home" && isHomeActive) ||
                (link.label === "About" && isAboutActive) ||
                (link.label === "Services" && isServicesActive) ||
                (link.label === "Blog" && isBlogActive) ||
                (link.label === "Contact" && isContactActive);

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2 px-4 rounded-full transition-all text-center ${
                    isCurrent
                      ? "bg-white text-[#0D1C34]"
                      : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteNav;
