import { Link } from "@tanstack/react-router";
import { SERVICES_DATA } from "@/data/servicesData";

// Precise SVG Icon Components matching the exact customer designs
function CctvIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Top Mount Plate */}
      <rect x="14" y="8" width="36" height="6" rx="2" fill="currentColor" stroke="none" />
      <path d="M32 14 V19" />
      {/* Camera Outer Body */}
      <path
        d="M16 19 H48 C51 19 53 21 53 24 L48 42 C47.5 45.5 44 48 40 48 H24 C20 48 16.5 45.5 16 42 L11 24 C11 21 13 19 16 19 Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Main Optical Lens */}
      <circle cx="32" cy="33" r="8" strokeWidth="2.8" />
      <circle cx="32" cy="33" r="3.5" fill="currentColor" />
      {/* Precision Sensor Aperture Dots */}
      <circle cx="44" cy="24" r="1.5" fill="currentColor" />
      <circle cx="39" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

function HomeAutomationIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Smart House Perimeter */}
      <path
        d="M12 29 L32 13 L52 29 V51 C52 53 50 55 48 55 H16 C14 55 12 53 12 51 Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Left IoT Signal Waves */}
      <path d="M13 19 C17 15 21 13 26 13" />
      <path d="M17 23 C20 20 23 18 26 18" />
      {/* Right IoT Signal Waves */}
      <path d="M51 19 C47 15 43 13 38 13" />
      <path d="M47 23 C44 20 41 18 38 18" />
      {/* Central Automation Cogwheel */}
      <circle cx="32" cy="39" r="6" strokeWidth="2.8" />
      <path d="M32 29 V32 M32 46 V49 M22 39 H25 M39 39 H42" />
      <path d="M25 32 L27.5 34.5 M36.5 43.5 L39 46 M25 46 L27.5 43.5 M36.5 34.5 L39 32" />
    </svg>
  );
}

function VideoDoorPhoneIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outdoor Station Chassis */}
      <rect
        x="18"
        y="7"
        width="28"
        height="50"
        rx="9"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Video Display Screen */}
      <rect x="23" y="13" width="18" height="19" rx="3.5" strokeWidth="2.2" />
      {/* Visitor Profile on Screen */}
      <circle cx="32" cy="19" r="3" fill="currentColor" stroke="none" />
      <path d="M26.5 28.5 C26.5 25.5 29 24 32 24 C35 24 37.5 25.5 37.5 28.5" strokeWidth="2.2" />
      {/* Large Calling Button & Illuminated Outer Ring */}
      <circle cx="32" cy="44" r="6.5" strokeWidth="2.8" />
      <circle cx="32" cy="44" r="2.8" fill="currentColor" />
    </svg>
  );
}

function BurglarAlarmIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Home Shield with Chimney */}
      <path
        d="M10 31 L32 13 L54 31 V52 C54 54.5 52 56.5 49.5 56.5 H14.5 C12 56.5 10 54.5 10 52 Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M43 22 V15 H48 V26" strokeWidth="2.4" />
      {/* Siren Bell Core */}
      <path d="M26 47 C26 39 28 35 32 35 C36 35 38 39 38 47 Z" strokeWidth="2.8" />
      <rect x="23.5" y="47" width="17" height="4.5" rx="1.5" fill="currentColor" />
      {/* Intense Alarm Warning Strobe Rays */}
      <line x1="32" y1="27" x2="32" y2="31" />
      <line x1="23.5" y1="29.5" x2="26" y2="32.5" />
      <line x1="40.5" y1="29.5" x2="38" y2="32.5" />
      <line x1="18" y1="36" x2="22" y2="38" />
      <line x1="46" y1="36" x2="42" y2="38" />
    </svg>
  );
}

export const HOME_SERVICES = [
  {
    id: "cctv",
    title: "CCTV Surveillance",
    description: "HD and 4K cameras with recording and live viewing on your phone, day and night.",
    Icon: CctvIcon,
  },
  {
    id: "home-automation",
    title: "Home Automation",
    description: "Control lights, fans, curtains and appliances from your phone or by voice.",
    Icon: HomeAutomationIcon,
  },
  {
    id: "video-door-phone",
    title: "Video Door Phone",
    description: "See and speak to visitors before you open the door, from inside or on your phone.",
    Icon: VideoDoorPhoneIcon,
  },
  {
    id: "burglar-alarm",
    title: "Burglar Alarm",
    description: "Door, window and motion sensors with a loud siren and alerts on your phone.",
    Icon: BurglarAlarmIcon,
  },
];

const featuredIds = new Set(HOME_SERVICES.map((s) => s.id));
const otherServices = SERVICES_DATA.filter((s) => !featuredIds.has(s.id));

export function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-14 sm:py-24" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF7A00]">Our services</p>
            <h2 className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              Security and smart automation, installed right
            </h2>
            <p className="mt-3 hidden sm:block text-base text-neutral-600 leading-relaxed">
              Planned after a free site survey and installed by our own engineers for homes and businesses across
              Erode and nearby towns.
            </p>
          </div>
          <Link
            to="/services"
            className="group inline-flex flex-shrink-0 items-center gap-2 self-start md:self-auto rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D1C34] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors"
          >
            View all {SERVICES_DATA.length} services
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Featured services (customer icon designs) */}
        <div className="mt-6 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {HOME_SERVICES.map((service) => {
            const IconComp = service.Icon;
            return (
              <Link
                key={service.id}
                to="/services/$serviceId"
                params={{ serviceId: service.id }}
                className="group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#0D1C34] p-4 sm:p-7 text-white border border-white/5 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(13,28,52,0.25)] transition-all duration-300"
              >
                <span className="absolute inset-x-7 top-0 h-0.5 rounded-full bg-[#FF7A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <IconComp className="h-10 w-10 flex-shrink-0 sm:h-14 sm:w-14 text-white group-hover:text-[#FF7A00] transition-colors duration-300" />
                <div className="mt-3 sm:mt-6 flex w-full min-w-0 flex-1 flex-col">
                  <h3 className="text-[15px] sm:text-xl font-bold tracking-tight leading-snug">{service.title}</h3>
                  <p className="mt-2 hidden sm:block flex-1 text-sm leading-relaxed text-white/65">{service.description}</p>
                  <span className="hidden sm:inline-flex mt-6 items-center gap-1.5 text-sm font-semibold text-[#FF7A00]">
                    Learn more
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Remaining services as quick links */}
        <div className="mt-3 sm:mt-5 flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white px-5 py-4 sm:px-7 sm:py-5">
          <p className="flex-shrink-0 text-sm font-semibold text-[#111827]">We also install</p>
          <ul className="flex flex-wrap gap-2">
            {otherServices.map((s) => (
              <li key={s.id}>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: s.id }}
                  className="inline-flex whitespace-nowrap rounded-full bg-neutral-100 px-3 sm:px-3.5 py-1.5 text-[13px] sm:text-sm font-medium text-neutral-700 hover:bg-[#FFF4E8] hover:text-[#FF7A00] transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
