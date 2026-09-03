"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";

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
    description:
      "Monitor your property 24/7 with advanced HD surveillance systems and remote access.",
    Icon: CctvIcon,
    badge: "24/7 MONITORING",
  },
  {
    id: "home-automation",
    title: "Home Automation",
    description:
      "Smart control over lighting, appliances, and climate — all from your phone or voice assistant.",
    Icon: HomeAutomationIcon,
    badge: "SMART LIVING",
  },
  {
    id: "video-door-phone",
    title: "Video Door Phone",
    description:
      "Secure your entry points by seeing and speaking to visitors before opening the door.",
    Icon: VideoDoorPhoneIcon,
    badge: "ENTRY VERIFICATION",
  },
  {
    id: "burglar-alarm",
    title: "Burglar Alarm",
    description:
      "Advanced sensors and real-time alerts to prevent unauthorized entry and protect valuables.",
    Icon: BurglarAlarmIcon,
    badge: "INTRUSION SHIELD",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden select-none bg-transparent"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-neutral-200/80 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                INTELLIGENT PROTECTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-[1.1]">
              Explore Our <span className="text-[#FF7A00]">Core Services</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#4B5563] font-normal leading-relaxed">
              Industrial-grade hardware and seamless smart integration engineered for residential homes and commercial enterprises.
            </p>
          </div>

          {/* Link to Full Catalog */}
          <div className="flex-shrink-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-neutral-50 text-[#111827] hover:text-[#FF7A00] font-bold text-sm border border-neutral-200 shadow-sm transition-all duration-200 group"
            >
              <span>View All 8 Services</span>
              <ArrowRight className="w-4 h-4 text-[#FF7A00] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* The 4 Home Page Service Cards in Clean Responsive 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_SERVICES.map((service, index) => {
            const IconComp = service.Icon;

            return (
              <Link
                key={service.id}
                to="/services/$serviceId"
                params={{ serviceId: service.id }}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-[#091222]/95 hover:bg-[#0E1A33] border border-white/10 hover:border-[#FF7A00]/70 shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(255,122,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer select-none overflow-hidden"
              >
                {/* Top Subtle Amber Indicator Line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-transparent group-hover:bg-[#FF7A00] transition-colors duration-300" />

                {/* Subtle Background Radial Aura on Hover */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#FF7A00]/0 group-hover:bg-[#FF7A00]/15 blur-2xl transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Pedestal */}
                  <div className="w-20 h-20 mb-6 flex items-center justify-center text-white group-hover:text-[#FF7A00] group-hover:scale-110 transition-all duration-300">
                    <IconComp className="w-16 h-16" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3.5 tracking-tight group-hover:text-[#FF7A00] transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Learn More -> Link */}
                <div className="relative z-10 pt-4 border-t border-white/10 w-full flex items-center justify-center">
                  <span className="text-sm font-extrabold text-white group-hover:text-[#FF7A00] inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 text-[#FF7A00] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#4B5563]">
          <div className="flex items-center gap-2 text-[#111827] font-bold">
            <ShieldCheck className="w-5 h-5 text-[#FF7A00]" />
            <span>All systems backed by 1–3 Years official manufacturer warranty</span>
          </div>
          <div className="flex items-center gap-6 font-medium text-neutral-500">
            <span>• Free On-Site Survey</span>
            <span>• Same-Day Installation</span>
            <span>• 100% Genuine Authorized Brands</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
