"use client";

import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Cpu,
  ShieldCheck,
  Trophy,
  Headphones,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from "lucide-react";

interface FeatureReason {
  title: string;
  description: string;
  badge: string;
  icon: typeof Trophy;
}

const PILLARS = [
  {
    title: "Advanced Surveillance Systems",
    desc: "Our state-of-the-art cameras and monitoring solutions provide real-time security, ensuring unmatched protection for your assets.",
    icon: Camera,
    badge: "REAL-TIME HD",
  },
  {
    title: "Intelligent Automation",
    desc: "Seamlessly integrated automation solutions enhance operational efficiency, security, and convenience for homes and businesses alike.",
    icon: Cpu,
    badge: "AI IOT READY",
  },
  {
    title: "Reliable & Scalable Security",
    desc: "Built on the latest technology, our solutions grow with your needs, offering a future-proof approach to security and automation.",
    icon: ShieldCheck,
    badge: "FUTURE PROOF",
  },
];

const COVERAGE_AREAS = [
  { city: "Erode", label: "Headquarters", highlight: true },
  { city: "Salem", label: "Primary Zone", highlight: false },
  { city: "Namakkal", label: "Primary Zone", highlight: false },
  { city: "Karur", label: "Primary Zone", highlight: false },
  { city: "Tirupur", label: "Primary Zone", highlight: false },
  { city: "Coimbatore", label: "Primary Zone", highlight: false },
  { city: "Dharmapuri", label: "Extended Zone", highlight: false },
  { city: "Krishnagiri", label: "Extended Zone", highlight: false },
  { city: "Perambalur", label: "Extended Zone", highlight: false },
  { city: "Ariyalur", label: "Extended Zone", highlight: false },
];

const REASONS: FeatureReason[] = [
  {
    title: "Trusted Security Experts",
    description:
      "With years of experience, we deliver top-tier security and automation solutions designed for reliability.",
    icon: Trophy,
    badge: "01",
  },
  {
    title: "Cutting-Edge Technology",
    description:
      "Our AI-driven systems enhance security, automation, and efficiency, keeping you ahead in safety innovation.",
    icon: Sparkles,
    badge: "02",
  },
  {
    title: "Reliable & Scalable Solutions",
    description:
      "Our flexible security solutions grow with your needs, ensuring long-term protection and smart automation.",
    icon: TrendingUp,
    badge: "03",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our expert team is available round-the-clock to provide quick assistance and ensure your security systems run smoothly.",
    icon: Headphones,
    badge: "04",
  },
];

function AnimatedCounter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease-out cubic curve
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="about"
      className="relative w-full pt-[40px] pb-[60px] px-4 sm:px-12 lg:px-[100px] overflow-hidden select-none bg-transparent text-[#111827]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Subtle ambient lighting with breathing animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF7A00]/[0.025] blur-[160px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 1. Main About Story & Hero Intro with Staggered Entrance */}
        <div
          className={`max-w-3xl mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
              ABOUT US
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-4">
            About <span className="text-[#FF7A00] drop-shadow-sm">S TEC SECURE</span>
          </h1>

          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-normal mb-8">
            Established in 2021, <strong className="text-[#111827] font-bold">S TEC SECURE</strong> is at the forefront of cutting-edge surveillance and automation solutions. We specialize in delivering smart, reliable, and scalable security technology to safeguard businesses and homes, ensuring peace of mind in an ever-evolving digital world.
          </p>

          <a
            href="/services"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF8F00] text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_6px_25px_rgba(255,122,0,0.35)] hover:shadow-[0_10px_35px_rgba(255,122,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* 2. Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 sm:mb-24">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_50px_rgba(255,122,0,0.14)] hover:border-[#FF7A00]/60 transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden"
              >
                {/* Subtle top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#FF7A00] shadow-sm group-hover:bg-[#FF7A00] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-[#FFF7ED] text-[#FF7A00] border border-[#FFEDD5] group-hover:bg-[#FF7A00] group-hover:text-white transition-colors duration-300">
                    {pillar.badge}
                  </span>
                </div>
                <h2 className="text-xl font-black text-[#111827] mb-3 tracking-tight group-hover:text-[#FF7A00] transition-colors duration-300">
                  {pillar.title}
                </h2>
                <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3. Ultra-Pro Executive Leadership Showcase (CEO Section) */}
        <div className="group relative mb-24 sm:mb-28 rounded-3xl bg-white border border-neutral-200/90 hover:border-[#FF7A00]/40 p-6 sm:p-10 lg:p-14 shadow-sm hover:shadow-[0_25px_60px_rgba(255,122,0,0.1)] transition-all duration-500 overflow-hidden">
          {/* Ambient Glows with subtle pulse */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF7A00]/[0.035] rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF7A00]/[0.025] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Executive Portrait with smooth hover float */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border-[3.5px] border-black shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-neutral-100 group/img transition-all duration-500 hover:-translate-y-1">
                <img
                  src="/ceo.png"
                  alt="Mr. SANTHOSH - CEO, S-Tec Secure"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                />

                {/* Bottom Tag with micro glass effect */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-lg flex items-center justify-between transition-transform duration-300 group-hover/img:-translate-y-1">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#111827] tracking-tight">
                      Mr. SANTHOSH
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-[#FF7A00] uppercase tracking-wider">
                      CEO, S-Tec Secure
                    </span>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#FF7A00] opacity-40" />
                    <div className="relative w-8 h-8 rounded-xl bg-[#FF7A00] text-white flex items-center justify-center text-xs font-black shadow-md">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Executive Statement */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                  A MESSAGE FROM OUR CEO
                </span>
              </div>

              {/* Stylized Quote Mark */}
              <div className="text-5xl sm:text-6xl font-serif text-[#FF7A00]/30 -mb-4 select-none transition-transform duration-300 group-hover:-translate-y-1">
                “
              </div>

              {/* The Quote */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111827] leading-snug tracking-tight mb-8">
                &ldquo;At S-Tec Secure, we are dedicated to safeguarding your world with advanced, reliable security solutions. Join us in building a safer future with protection you can count on.&rdquo;
              </blockquote>

              {/* Author & Designation Credentials */}
              <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#111827] tracking-tight">
                    Mr. SANTHOSH
                  </h3>
                  <p className="text-xs sm:text-sm font-mono font-bold text-[#FF7A00] uppercase tracking-wider mt-0.5">
                    CEO &amp; Founder, S-Tec Secure
                  </p>
                </div>

                {/* Direct Action Button: Connect on WhatsApp */}
                <div>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group/btn inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#22bf5b] hover:to-[#179646] text-white font-extrabold text-sm tracking-wide shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                  >
                    <svg
                      className="w-5 h-5 fill-current flex-shrink-0 group-hover/btn:rotate-12 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Few Great Reasons to Choose S TEC SECURE */}
        <div>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                WHY S TEC SECURE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight">
              Few Great Reasons to Choose <span className="text-[#FF7A00]">S TEC SECURE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map((r, i) => {
              const IconComponent = r.icon;
              return (
                <div
                  key={r.title}
                  className="group relative p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_40px_rgba(255,122,0,0.14)] hover:border-[#FF7A00] transition-all duration-400 hover:-translate-y-1.5 cursor-default overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#FF7A00] group-hover:bg-[#FF7A00] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-black text-neutral-400 group-hover:text-[#FF7A00] transition-colors duration-300">
                      {r.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#111827] mb-2.5 tracking-tight group-hover:text-[#FF7A00] transition-colors duration-300">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
                    {r.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Service Areas / Coverage Section */}
        <div className="mt-20 sm:mt-28">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                SERVICE COVERAGE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight">
              Areas We <span className="text-[#FF7A00]">Serve</span>
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#4B5563] font-normal max-w-xl">
              S-Tec Secure operates across Tamil Nadu with rapid on-site response. Check if we cover your area below.
            </p>
          </div>

          {/* Coverage Card */}
          <div className="group relative rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-[0_20px_50px_rgba(255,122,0,0.08)] transition-all duration-500 overflow-hidden p-8 sm:p-10 lg:p-14">
            {/* Ambient glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF7A00]/[0.035] rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#FF7A00]/[0.025] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left: Professional Coverage Hubs Matrix */}
              <div className="space-y-5">
                {/* Flagship Headquarters Banner */}
                <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFF7ED] via-white to-[#FFF7ED] border-2 border-[#FF7A00]/40 shadow-sm flex items-center justify-between gap-4 overflow-hidden group/hq hover:border-[#FF7A00] transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#FF7A00] text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover/hq:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-black text-[#111827] tracking-tight">Erode</h4>
                        <span className="relative flex items-center gap-1 text-[10px] font-mono font-black bg-[#FF7A00] text-white px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          HQ
                        </span>
                      </div>
                      <p className="text-xs text-[#4B5563] font-medium mt-0.5">
                        Central Command &bull; Same-Day Rapid Dispatch
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Hub
                  </span>
                </div>

                {/* Primary & Extended Cities Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                      Operating Network
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#FF7A00]">
                      10 Connected Cities
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {COVERAGE_AREAS.filter((a) => !a.highlight).map((area) => (
                      <div
                        key={area.city}
                        className={`group/badge p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 cursor-default flex items-center justify-between gap-2 ${
                          area.label === "Primary Zone"
                            ? "bg-white hover:bg-[#FFF7ED]/30 border-neutral-200/90 hover:border-[#FF7A00] hover:shadow-[0_6px_20px_rgba(255,122,0,0.1)]"
                            : "bg-neutral-50/60 hover:bg-white border-neutral-200/70 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin
                            className={`w-3.5 h-3.5 flex-shrink-0 group-hover/badge:scale-110 transition-transform ${
                              area.label === "Primary Zone" ? "text-[#FF7A00]" : "text-neutral-400"
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-bold text-[#111827] truncate">
                            {area.city}
                          </span>
                        </div>
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            area.label === "Primary Zone"
                              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                              : "bg-blue-400"
                          }`}
                          title={area.label}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Legend */}
                <div className="flex items-center gap-4 text-[11px] font-mono font-semibold text-neutral-500 pt-1 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Primary Service Zone</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Extended Dispatch Zone</span>
                  </div>
                </div>
              </div>

              {/* Right: Animated Stat Pills + CTA */}
              <div className="flex flex-col gap-6">
                {/* Stat pills with live counting numbers */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-50/70 hover:bg-white border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-[#FF7A00]/50 transition-all duration-300 text-center group/stat">
                    <div className="text-2xl sm:text-3xl font-black text-[#FF7A00] mb-1 group-hover/stat:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={10} suffix="+" />
                    </div>
                    <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">Cities Covered</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-50/70 hover:bg-white border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-[#FF7A00]/50 transition-all duration-300 text-center group/stat">
                    <div className="text-2xl sm:text-3xl font-black text-[#FF7A00] mb-1 group-hover/stat:scale-110 transition-transform duration-300">
                      &lt;4h
                    </div>
                    <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">Avg. Response Time</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-50/70 hover:bg-white border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-[#FF7A00]/50 transition-all duration-300 text-center group/stat">
                    <div className="text-2xl sm:text-3xl font-black text-[#FF7A00] mb-1 group-hover/stat:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={500} suffix="+" />
                    </div>
                    <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">Sites Installed</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-50/70 hover:bg-white border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-[#FF7A00]/50 transition-all duration-300 text-center group/stat">
                    <div className="text-2xl sm:text-3xl font-black text-[#FF7A00] mb-1 group-hover/stat:scale-110 transition-transform duration-300">
                      Tamil Nadu
                    </div>
                    <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">State Coverage</div>
                  </div>
                </div>

                {/* Single Action: WhatsApp Coverage Check */}
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20check%20if%20you%20cover%20my%20area"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm tracking-wide shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Check Coverage on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
