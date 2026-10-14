import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useRouterState, Link } from "@tanstack/react-router";
import { hasHeroVideoPlayedOnce } from "@/components/hero/Hero";

// Module-level image cache so canvas processing runs only ONCE across the entire application lifecycle
let cachedLightLogo: string | null = null;
let cachedDarkLogo: string | null = null;
let isProcessingLogo = false;
const logoListeners: Array<() => void> = [];

function processLogoCanvases() {
  if (cachedLightLogo && cachedDarkLogo) return;
  if (isProcessingLogo) return;
  if (typeof window === "undefined") return;

  isProcessingLogo = true;
  const img = new Image();
  img.src = "/logo.png";
  img.crossOrigin = "anonymous";

  img.onload = () => {
    try {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;

      // 1. Process Light Mode Logo (Transparent background, keep crisp dark text & orange)
      const canvasLight = document.createElement("canvas");
      canvasLight.width = w;
      canvasLight.height = h;
      const ctxLight = canvasLight.getContext("2d");
      if (ctxLight) {
        ctxLight.drawImage(img, 0, 0);
        const imgData = ctxLight.getImageData(0, 0, w, h);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const avg = (r + g + b) / 3;

          // Smooth edge feathering for transparent background
          if (avg > 235) {
            d[i + 3] = 0;
          } else if (avg > 200 && r > 180 && g > 180 && b > 180) {
            d[i + 3] = Math.round(255 * (1 - (avg - 200) / 35));
          }
        }
        ctxLight.putImageData(imgData, 0, 0);
        cachedLightLogo = canvasLight.toDataURL("image/png");
      }

      // 2. Process Dark Mode Logo (Transparent background, convert dark text to bright white, keep orange vibrant)
      const canvasDark = document.createElement("canvas");
      canvasDark.width = w;
      canvasDark.height = h;
      const ctxDark = canvasDark.getContext("2d");
      if (ctxDark) {
        ctxDark.drawImage(img, 0, 0);
        const imgData = ctxDark.getImageData(0, 0, w, h);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const avg = (r + g + b) / 3;

          // Background transparency
          if (avg > 235) {
            d[i + 3] = 0;
          } else if (avg > 200 && r > 180 && g > 180 && b > 180) {
            d[i + 3] = Math.round(255 * (1 - (avg - 200) / 35));
          }
          // Convert dark lettering to luminous white, preserving amber/orange colors
          else if (r < 85 && g < 85 && b < 85) {
            d[i] = 255;
            d[i + 1] = 255;
            d[i + 2] = 255;
          }
        }
        ctxDark.putImageData(imgData, 0, 0);
        cachedDarkLogo = canvasDark.toDataURL("image/png");
      }

      isProcessingLogo = false;
      logoListeners.forEach((fn) => fn());
      logoListeners.length = 0;
    } catch {
      isProcessingLogo = false;
    }
  };

  img.onerror = () => {
    isProcessingLogo = false;
  };
}

export function MergedLogo({
  isLightNav = false,
  className = "h-14 sm:h-16 md:h-18 lg:h-20 max-h-[74px] sm:max-h-[84px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]",
}: {
  isLightNav?: boolean;
  className?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState<string>(
    isLightNav ? cachedLightLogo || "/logo.png" : cachedDarkLogo || "/logo.png"
  );

  useEffect(() => {
    const updateSrc = () => {
      if (isLightNav) {
        if (cachedLightLogo) setCurrentSrc(cachedLightLogo);
      } else {
        if (cachedDarkLogo) setCurrentSrc(cachedDarkLogo);
      }
    };

    if (isLightNav && cachedLightLogo) {
      setCurrentSrc(cachedLightLogo);
    } else if (!isLightNav && cachedDarkLogo) {
      setCurrentSrc(cachedDarkLogo);
    } else {
      logoListeners.push(updateSrc);
      processLogoCanvases();
    }
  }, [isLightNav]);

  return (
    <div className="relative flex items-center">
      <img
        src={currentSrc}
        alt="S TEC SECURE — Surveillance & Automation Solutions"
        className={`relative z-10 ${className}`}
        loading="eager"
      />
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
  const isRevealed = !isHome || revealed || scrolled || hasHeroVideoPlayedOnce;
  const isLightNav = !isHome || scrolled;

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

  // Determine active route
  const isServicesActive = pathname.startsWith("/services");
  const isHomeActive = pathname === "/" && !isServicesActive;
  const isAboutActive = pathname === "/about";
  const isBlogActive = pathname === "/blog";
  const isContactActive = pathname === "/contact";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full select-none transition-all duration-500 ease-out ${
        isRevealed ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-[#070A12]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center flex-shrink-0 z-20">
          <Link
            to="/"
            className="group flex items-center cursor-pointer select-none transition-transform duration-200 active:scale-95 py-1"
            aria-label="S TEC SECURE Home"
          >
            <MergedLogo
              isLightNav={isLightNav}
              className="h-12 sm:h-14 md:h-16 lg:h-18 max-h-[68px] sm:max-h-[76px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Center: Floating Dark Navy Pill Capsule Navbar (as in reference image) */}
        <div className="hidden md:flex items-center justify-center flex-1 z-20">
          <nav
            aria-label="Main Navigation"
            className="inline-flex items-center rounded-full bg-[#0D1C34] border border-white/10 shadow-[0_8px_32px_rgba(13,28,52,0.4)] p-1.5 transition-all duration-300"
          >
            {navLinks.map((link) => {
              const isCurrent =
                (link.label === "Home" && isHomeActive) ||
                (link.label === "About" && isAboutActive) ||
                (link.label === "Services" && isServicesActive) ||
                (link.label === "Blog" && isBlogActive);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-[13.5px] tracking-normal transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-white text-[#0D1C34] font-semibold shadow-sm scale-[1.02]"
                      : "text-white/80 hover:text-white hover:bg-white/10 font-medium"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right: Standalone Contact ↗ Pill Button with circular arrow badge (as in reference image) */}
        <div className="flex items-center gap-3 z-20">
          <Link
            to="/contact"
            className={`hidden sm:inline-flex items-center gap-2.5 rounded-full pl-5 pr-1.5 py-1.5 border shadow-[0_8px_32px_rgba(13,28,52,0.4)] transition-all duration-300 group cursor-pointer ${
              isContactActive
                ? "bg-white text-[#0D1C34] border-white font-semibold"
                : "bg-[#0D1C34] hover:bg-[#142A4D] text-white border-white/10 font-medium"
            }`}
            aria-label="Contact Us"
          >
            <span className="text-xs sm:text-[13.5px] tracking-normal">
              Contact
            </span>
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isContactActive
                  ? "bg-[#0D1C34] text-white"
                  : "bg-white text-[#0D1C34]"
              }`}
            >
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </span>
          </Link>

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
          className="absolute top-full left-4 right-4 mt-2 p-4 rounded-3xl shadow-2xl animate-in slide-in-from-top-2 duration-200 border border-white/10 bg-[#0D1C34]/98 backdrop-blur-2xl text-white flex flex-col gap-2.5"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isCurrent =
                (link.label === "Home" && isHomeActive) ||
                (link.label === "About" && isAboutActive) ||
                (link.label === "Services" && isServicesActive) ||
                (link.label === "Blog" && isBlogActive);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2 px-4 rounded-full transition-all text-center ${
                    isCurrent
                      ? "bg-white text-[#0D1C34]"
                      : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 mt-1">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0D1C34] font-bold text-xs tracking-wide shadow-md cursor-pointer transition-colors"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteNav;
