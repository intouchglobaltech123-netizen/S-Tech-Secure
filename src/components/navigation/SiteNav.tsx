import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRouterState, Link } from "@tanstack/react-router";

export function MergedLogo({
  isLightNav = false,
  className = "w-[290px] sm:w-[330px] md:w-[350px] h-auto max-h-[76px] object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-sm",
}: {
  isLightNav?: boolean;
  className?: string;
}) {
  const [logoSrc, setLogoSrc] = useState("/logo.png");

  useEffect(() => {
    const img = new Image();
    img.src = "/logo.png";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Convert white or off-white background to transparent
          if (r > 215 && g > 215 && b > 215) {
            data[i + 3] = 0;
          }
          // If in dark hero mode (!isLightNav), convert dark text to bright white
          else if (!isLightNav && r < 75 && g < 75 && b < 75) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setLogoSrc(canvas.toDataURL("image/png"));
      } catch {
        // fallback to original if canvas is blocked
      }
    };
  }, [isLightNav]);

  return (
    <img
      src={logoSrc}
      alt="STEC SECURE - Surveillance & Automation's"
      className={className}
      style={{
        maxWidth: "none",
      }}
    />
  );
}

export function SiteNav({ revealed = true }: { revealed?: boolean }) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Read current pathname from TanStack Router
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const isHome = pathname === "/";
  // Subpages (/about, /services, /blog, /contact) use the clean white navbar. Homepage switches on scroll.
  const isLightNav = !isHome || scrolled;

  // Track URL hash for smooth in-page sections
  const [currentHash, setCurrentHash] = useState(
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : ""
  );

  useEffect(() => {
    const handleHash = () => {
      setCurrentHash(window.location.hash.replace("#", ""));
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which single nav item is active
  const isServicesActive = pathname.startsWith("/services");
  const isHomeActive = pathname === "/" && !isServicesActive;
  const isAboutActive = pathname === "/about";
  const isBlogActive = pathname === "/blog";

  return (
    <header
      className={`fixed top-[5px] inset-x-0 z-50 w-full select-none transition-all duration-300 ${
        revealed ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Modern Adaptive Navigation Bar */}
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ease-out flex items-center justify-between px-6 sm:px-12 lg:px-16 ${
          isLightNav
            ? "h-16 sm:h-[72px] bg-white/95 backdrop-blur-2xl border-b border-neutral-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "h-20 sm:h-[84px] bg-black/40 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        {/* Left Side: Brand Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            onClick={() => setCurrentHash("")}
            className="group flex items-center cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <MergedLogo isLightNav={isLightNav} />
          </Link>
        </div>

        {/* Center: Clean Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-11 -translate-x-[80px]">
          {navLinks.map((link) => {
            const isCurrent =
              (link.label === "Home" && isHomeActive) ||
              (link.label === "About" && isAboutActive) ||
              (link.label === "Services" && isServicesActive) ||
              (link.label === "Blog" && isBlogActive);

            const isHovered = hoveredTab === link.label;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setCurrentHash("")}
                onMouseEnter={() => setHoveredTab(link.label)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative py-1 text-sm lg:text-[15px] font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isCurrent || isHovered
                    ? "text-[#FF7A00]"
                    : isLightNav
                    ? "text-[#1F2937] hover:text-[#FF7A00]"
                    : "text-white/80 hover:text-white"
                } hover:-translate-y-0.5`}
              >
                <span>{link.label}</span>

                {/* Active indicator dot */}
                {isCurrent && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side: Orange Contact Us Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="group relative px-6 sm:px-7 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8F00] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(255,122,0,0.35)] hover:shadow-[0_6px_25px_rgba(255,122,0,0.6)] active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 overflow-hidden"
          >
            <span className="relative z-10">Contact Us</span>
            <ArrowUpRight
              size={15}
              className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            {/* Shimmer light sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors focus:outline-none ${
              isLightNav
                ? "text-[#111827] bg-neutral-100 hover:bg-neutral-200"
                : "text-white bg-white/[0.08] hover:bg-white/15"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto ${
            isLightNav
              ? "bg-white/98 backdrop-blur-xl border-b border-neutral-200 text-[#111827]"
              : "bg-[#101526]/95 backdrop-blur-xl border-b border-white/10 text-white"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold transition-colors text-[#374151] hover:text-[#FF7A00]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-neutral-200/50">
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 rounded-lg bg-[#FF7A00] hover:bg-[#FF8F00] text-white font-bold text-sm tracking-tight shadow-md cursor-pointer transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteNav;
