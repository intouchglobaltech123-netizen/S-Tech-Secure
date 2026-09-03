import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle, ExternalLink, Clock } from "lucide-react";
import { COMPANY_CONTACT } from "@/data/servicesData";
import { MergedLogo } from "@/components/navigation/SiteNav";

export function SiteFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20STEC%20Secure%2C%20I%20need%20details%20about%20your%20security%20solutions.`;

  return (
    <>
      {/* Luminous Pearl Architectural Footer with Crisp Black Top Line */}
      <footer
        className="relative w-full bg-gradient-to-b from-white via-[#FFF9F4] to-[#FFF1E6] text-[#111827] rounded-t-[40px] sm:rounded-t-[56px] border-t-2 border-black shadow-[0_-15px_45px_rgba(0,0,0,0.06)] overflow-hidden select-none"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Top Crisp Black Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-black to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-[100px] pt-12 sm:pt-16 pb-12">
          {/* 3-Column Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mt-5 mb-16">
            {/* Col 1: Brand Leadership (5 cols) */}
            <div className="lg:col-span-5 relative">
              <Link to="/" className="inline-block mb-4 group -translate-x-[50px]">
                <MergedLogo
                  isLightNav={true}
                  className="w-[250px] sm:w-[290px] h-auto max-h-[72px] object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </Link>

              <p className="text-[#4B5563] text-sm leading-relaxed mb-6 max-w-md">
                Tamil Nadu's premier security technology and surveillance engineering firm. Specializing in 4K AI-powered CCTV, IoT smart automation, and enterprise perimeter access control.
              </p>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Serving Erode, Salem & TN 24/7</span>
              </div>
            </div>

            {/* Col 2: Core Solutions (4 cols) */}
            <div className="lg:col-span-4">
              <h4 className="text-sm font-black text-[#111827] uppercase tracking-wider mb-5">
                Core Solutions
              </h4>
              <ul className="space-y-3 text-sm text-[#4B5563] font-medium">
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "cctv" }} className="inline-flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span>4K CCTV Surveillance Systems</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "home-automation" }} className="inline-flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span>Smart Home IoT Automation</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "boom-barriers" }} className="inline-flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span>Automatic Boom Barriers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "access-control" }} className="inline-flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span>Biometric Access Control</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "burglar-alarm" }} className="inline-flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span>Intrusion Burglar Alarms</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "video-door-phones" }} className="inline-flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span>Video Door Phones & Intercom</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Location (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-black text-[#111827] uppercase tracking-wider mb-5">
                Contact Info
              </h4>
              <ul className="space-y-4 text-sm text-[#4B5563]">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">
                    {COMPANY_CONTACT.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                  <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="hover:text-[#FF7A00] font-semibold text-[#111827] transition-colors">
                    {COMPANY_CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="hover:text-[#FF7A00] text-[#111827] font-semibold transition-colors">
                    {COMPANY_CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Orbit Row */}
          <div className="pt-8 border-t border-neutral-200/80 flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#6B7280] uppercase">
                FOLLOW US:
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#1877F2] text-[#111827] hover:text-white border border-neutral-200 hover:border-[#1877F2] shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#0A66C2] text-[#111827] hover:text-white border border-neutral-200 hover:border-[#0A66C2] shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/igsyourdigitalpartner/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#E1306C] text-[#111827] hover:text-white border border-neutral-200 hover:border-[#E1306C] shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-black text-[#111827] hover:text-white border border-neutral-200 hover:border-black shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#25D366] text-[#111827] hover:text-white border border-neutral-200 hover:border-[#25D366] shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="mt-8 pt-6 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-[#6B7280] text-center">
            <p>
              All Rights Reserved. © 2026 S TEC SECURE.
            </p>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <p>
              Brand Partner :{" "}
              <a
                href="https://www.instagram.com/igsyourdigitalpartner/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-[#111827] hover:text-[#FF7A00] transition-colors underline decoration-neutral-300 hover:decoration-[#FF7A00]"
              >
                IconoGraphy Solutionz
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Widget (Hidden in Hero, appears after scroll) */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-50 select-none pointer-events-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45),0_3px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.7),0_5px_15px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 fill-white relative z-10"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}

export default SiteFooter;
