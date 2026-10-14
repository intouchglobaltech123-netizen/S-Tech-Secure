import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Phone, Check } from "lucide-react";
import { COMPANY_CONTACT } from "@/data/servicesData";
import { MergedLogo } from "@/components/navigation/SiteNav";

export function SiteFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4500);
    }
  };

  const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20S%20TEC%20SECURE%2C%20I%20would%20like%20to%20inquire%20about%20your%20security%20and%20automation%20solutions.`;

  return (
    <>
      <footer
        className="relative w-full bg-black text-white select-none pt-16 sm:pt-20 pb-12 sm:pb-16 border-t border-neutral-900"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Top Row: S Tec Secure Logo */}
          <div className="mb-10 sm:mb-12">
            <Link to="/" className="inline-block group" aria-label="S TEC SECURE Home">
              <MergedLogo
                isLightNav={false}
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 4 Clean Columns matching Timescale layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16">
            {/* Column 1: Products */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-medium text-sm sm:text-[15px] mb-4">
                Products
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "cctv" }} className="hover:text-white transition-colors">
                    4K CCTV Surveillance
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "home-automation" }} className="hover:text-white transition-colors">
                    Smart Home Living
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "gate-automation" }} className="hover:text-white transition-colors">
                    Automatic Gates
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "boom-barriers" }} className="hover:text-white transition-colors">
                    Boom Barriers
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "access-control" }} className="hover:text-white transition-colors">
                    Biometric Access
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "video-door-phone" }} className="hover:text-white transition-colors">
                    Video Door Phones
                  </Link>
                </li>
                <li>
                  <Link to="/services/$serviceId" params={{ serviceId: "burglar-alarm" }} className="hover:text-white transition-colors">
                    Intrusion &amp; Fire Alarms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Learn */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-medium text-sm sm:text-[15px] mb-4">
                Learn
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition-colors">
                    Security Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Client Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Certified Standards
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Warranty &amp; AMC
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Free Site Survey
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-medium text-sm sm:text-[15px] mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About S Tec
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Salem Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Erode Office
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Coimbatore Hub
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Chennai Desk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Icons & Newsletter */}
            <div className="lg:col-span-4 flex flex-col justify-start">
              {/* Row of 5 Circular Brand Yellow/Amber Buttons */}
              <div className="flex items-center gap-3">
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                  aria-label="Call S Tec Secure"
                  className="w-10 h-10 rounded-full bg-[#FF7A00] hover:bg-[#FFA000] text-black flex items-center justify-center font-bold shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 fill-black stroke-black" />
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#FF7A00] hover:bg-[#FFA000] text-black flex items-center justify-center font-bold shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-black" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/igsyourdigitalpartner/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#FF7A00] hover:bg-[#FFA000] text-black flex items-center justify-center font-bold shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-[#FF7A00] hover:bg-[#FFA000] text-black flex items-center justify-center font-bold shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-[#FF7A00] hover:bg-[#FFA000] text-black flex items-center justify-center font-bold shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              {/* Newsletter Headline */}
              <p className="text-white font-medium text-sm sm:text-[15px] mt-6 mb-3">
                Subscribe to the S Tec Newsletter
              </p>

              {/* Exact Pill Input & Black Capsule Subscribe Button */}
              <form onSubmit={handleSubscribe} className="relative flex items-center bg-white rounded-full p-1 pl-4 shadow-lg max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="bg-transparent text-neutral-900 placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none w-full pr-2"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#FF7A00] font-medium mt-2 animate-in fade-in duration-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing to security updates!</span>
                </div>
              )}

              {/* Small Legal Disclaimer */}
              <p className="text-[11px] text-neutral-500 mt-2.5">
                By submitting, you acknowledge S Tec Secure's{" "}
                <Link to="/about" className="underline hover:text-neutral-400">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Bottom Divider Rule & Horizontal Links Bar */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>
              2026 © S Tec Secure Inc. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Link to="/about" className="hover:text-white transition-colors">
                Privacy preferences
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                Legal
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <a href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </a>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ml-1"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-50 select-none pointer-events-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Chat with S Tec Secure engineer on WhatsApp"
            className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-6 h-6 fill-white"
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
