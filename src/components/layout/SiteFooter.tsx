import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { COMPANY_CONTACT } from "@/data/servicesData";
import { serviceAreas } from "@/data/company";
import { MergedLogo } from "@/components/navigation/SiteNav";

// Office hours (India time): Monday–Saturday, 08:00–20:00
const OPEN_HOUR = 8;
const CLOSE_HOUR = 20;
const EMAIL = "stecsecure@gmail.com";

const SERVICE_LINKS = [
  { id: "cctv", label: "CCTV Surveillance" },
  { id: "home-automation", label: "Home Automation" },
  { id: "video-door-phone", label: "Video Door Phones" },
  { id: "burglar-alarm", label: "Burglar Alarms" },
  { id: "gate-automation", label: "Gate Automation" },
  { id: "boom-barriers", label: "Boom Barriers" },
  { id: "access-control", label: "Access Control" },
];

const MOBILE_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const COMPANY_LINKS = [
  { to: "/about", label: "About us" },
  { to: "/services", label: "All services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/contact", label: "Free site survey" },
] as const;

type OfficeStatus = { open: boolean; text: string };

/** Live office status, worked out from the current time in India. */
function getOfficeStatus(now = new Date()): OfficeStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const isSunday = weekday === "Sun";
  const isSaturday = weekday === "Sat";

  if (!isSunday && hour >= OPEN_HOUR && hour < CLOSE_HOUR) {
    return { open: true, text: "Open now · closes 8:00 PM" };
  }
  if (!isSunday && hour < OPEN_HOUR) {
    return { open: false, text: "Closed · opens today at 8:00 AM" };
  }
  if (isSunday || isSaturday) {
    return { open: false, text: "Closed · opens Monday at 8:00 AM" };
  }
  return { open: false, text: "Closed · opens tomorrow at 8:00 AM" };
}

// CONFIGURE: replace with your real profile links
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  },
];

const linkClass =
  "inline-block text-sm text-white/60 hover:text-[#FF7A00] hover:translate-x-0.5 transition-all duration-200";
const headingClass =
  "relative inline-block pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-5 after:rounded-full after:bg-[#FF7A00]";
const centeredHeadingClass = `${headingClass} after:left-1/2 after:-translate-x-1/2`;

export function SiteFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  // The contact page already has the enquiry form, so the survey card is not repeated there
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showSurveyCard = pathname !== "/contact";
  // Worked out in the browser only, so the server HTML and first client render match
  const [status, setStatus] = useState<OfficeStatus | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const update = () => setStatus(getOfficeStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20S%20TEC%20SECURE%2C%20I%20would%20like%20to%20inquire%20about%20your%20security%20and%20automation%20solutions.`;

  const surveyUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=${encodeURIComponent(
    "Hi S TEC SECURE, I would like to book a free site survey."
  )}`;

  const socialIcons = SOCIAL_LINKS.map((social) => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label={social.label}
        title={social.label}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-white/75 hover:-translate-y-0.5 hover:border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white hover:shadow-[0_8px_18px_-8px_rgba(255,122,0,0.9)] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d={social.path} />
        </svg>
      </a>
    ));

  return (
    <>
      {/* Survey card sitting on the footer's top edge (half above, half inside) */}
      {showSurveyCard && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 -mb-10 [@media(max-height:759px)]:-mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 rounded-2xl bg-[#FF7A00] px-6 py-5 [@media(max-height:759px)]:py-3.5 sm:px-8 text-white shadow-[0_18px_40px_-18px_rgba(255,122,0,0.75)]">
            <div>
              <p className="text-lg sm:text-xl font-bold tracking-tight">Book your free site survey</p>
              <p className="mt-0.5 hidden sm:block text-sm text-white/85 [@media(max-height:759px)]:hidden">
                An engineer visits, checks your property and gives you a clear quote.
              </p>
            </div>
            <div className="flex gap-2.5 flex-shrink-0">
              <a
                href={surveyUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-4 sm:px-5 py-2.5 text-sm font-semibold text-[#0D1C34] hover:bg-[#0D1C34] hover:text-white transition-colors"
              >
                <span className="sm:hidden">WhatsApp us</span>
                <span className="hidden sm:inline">Book on WhatsApp</span>
              </a>
              <a
                href={`tel:+${COMPANY_CONTACT.phoneRaw}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/60 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                <span className="sm:hidden">Call us</span>
                <span className="hidden sm:inline">Call {COMPANY_CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <footer
        className="relative w-full overflow-hidden bg-[#0B1628] text-white"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Thin brand line along the top edge */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF7A00]/60 to-transparent" />

        <div className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 ${showSurveyCard ? "pt-[72px] [@media(max-height:759px)]:pt-[48px]" : "pt-8 [@media(max-height:759px)]:pt-6"} pb-5`}>
          {/* Phones: a short, centred footer */}
          <div className="sm:hidden text-center">
            <Link to="/" aria-label="S TEC SECURE Home" className="inline-block">
              <MergedLogo isLightNav={false} className="h-10 w-auto" />
            </Link>
            <nav aria-label="Footer" className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {MOBILE_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-white/70 hover:text-[#FF7A00] transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 space-y-1">
              <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="block text-base font-semibold text-white">
                {COMPANY_CONTACT.phone}
              </a>
              <a href={`mailto:${EMAIL}`} className="block text-sm text-white/55">
                {EMAIL}
              </a>
            </div>
            <div className="mt-5 flex justify-center gap-2">{socialIcons}</div>
          </div>

          {/* Columns spread across the full width with equal gaps between them */}
          <div className="hidden sm:grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-8 lg:flex lg:justify-between lg:gap-10">
            {/* Brand + live status */}
            <div className="col-span-2 lg:max-w-[22rem]">
              <Link to="/" aria-label="S TEC SECURE Home" className="inline-block">
                <MergedLogo isLightNav={false} className="h-11 w-auto" />
              </Link>
              <p className="mt-4 max-w-[22rem] text-sm text-white/60 leading-relaxed">
                CCTV, smart home and access systems, installed and serviced by our own engineers since 2021.
              </p>

              <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 min-h-[34px]">
                {status ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      {status.open && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                      )}
                      <span
                        className={`relative inline-flex h-2 w-2 rounded-full ${
                          status.open ? "bg-emerald-400" : "bg-white/30"
                        }`}
                      />
                    </span>
                    <span className="text-[13px] text-white/80 whitespace-nowrap">{status.text}</span>
                  </>
                ) : (
                  <span className="text-sm text-white/60">Mon – Sat, 8:00 AM – 8:00 PM</span>
                )}
              </div>
            </div>

            {/* Services */}
            <nav aria-label="Services">
              <p className={headingClass}>Services</p>
              <ul className="mt-3 [@media(max-height:759px)]:mt-2.5 space-y-1.5 [@media(max-height:759px)]:space-y-1 text-sm leading-5">
                {SERVICE_LINKS.map((s) => (
                  <li key={s.id} className="whitespace-nowrap">
                    <Link to="/services/$serviceId" params={{ serviceId: s.id }} className={linkClass}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company">
              <p className={headingClass}>Company</p>
              <ul className="mt-3 [@media(max-height:759px)]:mt-2.5 space-y-1.5 [@media(max-height:759px)]:space-y-1 text-sm leading-5">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <p className={headingClass}>Talk to us</p>
              <ul className="mt-3 [@media(max-height:759px)]:mt-2.5 space-y-1.5 [@media(max-height:759px)]:space-y-1 text-sm leading-5">
                <li>
                  <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="text-sm font-semibold text-white hover:text-[#FF7A00] transition-colors">
                    {COMPANY_CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-sm font-semibold text-[#FF7A00] hover:text-[#FFA04D] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className={linkClass}>
                    {EMAIL}
                  </a>
                </li>
                <li className="text-sm text-white/60 leading-relaxed">
                  <span className="whitespace-nowrap">14/2 Thundukadu Street, Veerappan Chatram,</span>
                  <br />
                  <span className="whitespace-nowrap">Erode – 638004</span>
                </li>
              </ul>

              <div className="mt-3.5 flex items-center gap-2">{socialIcons}</div>
            </div>
          </div>

          {/* Areas we serve (centered) */}
          <div className="hidden sm:block mt-6 [@media(max-height:759px)]:mt-3 pt-4 [@media(max-height:759px)]:pt-2.5 border-t border-white/10 text-center">
            <p className={centeredHeadingClass}>Areas we serve</p>
            <div className="mt-2.5 flex flex-wrap justify-center gap-y-1 text-sm text-white/60">
              {serviceAreas.map((a, i) => (
                <span key={a.name} className="whitespace-nowrap">
                  {a.name}
                  {i < serviceAreas.length - 1 && <span className="mx-2.5 text-white/20">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <p className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-3 [@media(max-height:759px)]:py-2.5 text-center text-xs text-white/40">
            © {new Date().getFullYear()} S TEC SECURE. All rights reserved.
          </p>
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
            <svg className="w-6 h-6 fill-white" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}

export default SiteFooter;
