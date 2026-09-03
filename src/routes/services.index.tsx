"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import { SERVICES_DATA, COMPANY_CONTACT } from "@/data/servicesData";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Shield,
  Sparkles,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home as HomeIcon,
  Store,
  Factory,
  Download,
  FileText,
  X,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const servicesTitle = "Security Systems & CCTV Installation Erode | STEC Secure";
const servicesDescription =
  "Explore certified CCTV surveillance, smart home automation, burglar alarms, boom barriers, and access control across Erode & Tamil Nadu with STEC Secure.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: servicesTitle },
      { name: "description", content: servicesDescription },
      { property: "og:title", content: servicesTitle },
      { property: "og:description", content: servicesDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stec-secure.vercel.app/services" },
      { property: "og:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: servicesTitle },
      { name: "twitter:description", content: servicesDescription },
      { name: "twitter:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      {
        name: "keywords",
        content:
          "CCTV installation, smart home automation, burglar alarm, automatic gate, boom barriers, biometric access control, video door phone, nurse call system, intercom, Erode, Tamil Nadu",
      },
    ],
    links: [{ rel: "canonical", href: "https://stec-secure.vercel.app/services" }],
  }),
  component: ServicesPage,
});


const PROPERTY_PROFILES = [
  {
    id: "home",
    icon: HomeIcon,
    label: "Residential Home",
    subtitle: "Apartments & 2-3 BHKs",
    cameras: "4 HD Night-Vision Cameras",
    storage: "1TB Surveillance HDD (10-14 Days)",
    wiring: "Concealed PVC Indoor / Outdoor",
    remoteApp: "Live Stream on 2-4 Family Mobiles",
    bestFeatures: ["Front Door & Driveway Coverage", "Motion Push Notifications", "Zero Monthly Subscription"],
    popularBadge: "ESSENTIAL",
  },
  {
    id: "villa",
    icon: Sparkles,
    label: "Independent Villa",
    subtitle: "Duplexes & Luxury Estates",
    cameras: "6–8 4K AI Smart Cameras",
    storage: "2TB NVR Storage (20+ Days)",
    wiring: "Armored Conduit & Multi-Zone Hub",
    remoteApp: "Full Cloud Access + Video Door Phone",
    bestFeatures: ["Full Color Night Vision 24/7", "Human & Car AI Filtering", "Smart Video Intercom Sync"],
    popularBadge: "MOST POPULAR",
  },
  {
    id: "commercial",
    icon: Store,
    label: "Retail & Showroom",
    subtitle: "Shops, Supermarkets & Offices",
    cameras: "8–16 Audio IP Cameras",
    storage: "4TB NVR (30-Day Mandatory Retention)",
    wiring: "Gigabit PoE Network Switching",
    remoteApp: "Manager & Owner Remote Monitoring",
    bestFeatures: ["Cash Billing Counter Audio Mic", "Employee Staff Presence Tracking", "Customer Entry Heatmap"],
    popularBadge: "HIGH DEMAND",
  },
  {
    id: "industrial",
    icon: Factory,
    label: "Warehouse & Factory",
    subtitle: "Industrial Parks & Gated Premises",
    cameras: "16–64+ Long-Range IP Cameras",
    storage: "Enterprise Server Rack & RAID Storage",
    wiring: "Optical Fiber Gigabit Backbone",
    remoteApp: "Security Gatehouse + Central Display Wall",
    bestFeatures: ["PTZ 360° Optical Zoom (150m)", "Perimeter Laser Tripwire Alarms", "Annual Maintenance Contract (AMC)"],
    popularBadge: "ENTERPRISE",
  },
];

// 3D Perspective Card Component with Real-Time Mouse Tracking
function ThreeDServiceCard({
  sys,
  idx,
}: {
  sys: (typeof SERVICES_DATA)[0];
  idx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const SERVICE_IMAGES: Record<string, string> = {
    cctv: "/services/cctv.jpg",
    "home-automation": "/services/home-automation.jpg",
    "burglar-alarm": "/services/burglar-alarm.jpg",
    "gate-automation": "/services/gate-automation.jpg",
    "boom-barriers": "/services/boom-barriers.jpg",
    "access-control": "/services/access-control.jpg",
    "video-door-phone": "/services/video-door-phone.jpg",
    "nurse-calling": "/services/nurse-calling.jpg",
    intercom: "/services/intercom.jpg",
  };

  const cameraImg = SERVICE_IMAGES[sys.id] || null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.16,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl transition-all duration-300 h-full flex flex-col"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="rounded-3xl bg-white border border-neutral-200/90 shadow-[0_12px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_50px_rgba(255,122,0,0.14)] hover:border-[#FF7A00]/70 transition-all duration-200 p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden h-full"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
            rotate.x !== 0 ? 1.02 : 1
          }, ${rotate.x !== 0 ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.2s ease",
        }}
      >
        {/* Dynamic 3D Glare Specular Highlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FFF7ED]/80 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

        {/* Card Header (3D Elevated) */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
              <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-[#FFF7ED] text-[#FF7A00] border border-[#FFEDD5] uppercase tracking-wider">
                {sys.badge}
              </span>
            </div>
          </div>

          {/* 3D Hardware Render / Floating Pedestal */}
          <div
            style={{ transform: "translateZ(35px)" }}
            className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] border border-neutral-200/80 mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-[#FF7A00]/40 transition-colors"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF7A0012,transparent_70%)] pointer-events-none" />

            {cameraImg ? (
              <img
                src={cameraImg}
                alt={sys.title}
                className="w-36 h-36 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-white border border-[#FFEDD5] shadow-md flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                {sys.icon}
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight mb-1">
            {sys.title}
          </h3>
          <p className="text-xs font-bold text-[#FF7A00] mb-3">{sys.tagline}</p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 font-normal line-clamp-3 flex-1">
            {sys.overview}
          </p>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {sys.keyFeatures.slice(0, 4).map((f) => (
              <div
                key={f.title}
                className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70 text-[11px] font-bold text-[#111827] truncate flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-[#FF7A00] flex-shrink-0" />
                <span className="truncate">{f.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Triggers (3D Elevated) */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="pt-4 border-t border-neutral-100 relative z-10 mt-auto"
        >
          <Link
            to="/services/$serviceId"
            params={{ serviceId: sys.id }}
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm bg-[#111827] hover:bg-[#FF7A00] text-white hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Full Tech Specs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  const [activeProfileId, setActiveProfileId] = useState<string>("villa");

  const activeProfile = PROPERTY_PROFILES.find((p) => p.id === activeProfileId) || PROPERTY_PROFILES[1];

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#111827] overflow-x-hidden select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <SiteNav revealed={true} />

      {/* CyberMeshBackground matching the About page */}
      <main className="relative pt-24 sm:pt-28 min-h-screen">
        <CyberMeshBackground />

        <div className="relative z-10">
          {/* 1. Services Header */}
          <section className="pt-10 pb-12 sm:pb-16 px-4 sm:px-12 lg:px-[100px]">
            <div className="max-w-7xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                  OUR SERVICES
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-3xl">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-4">
                    Security &amp; Automation <span className="text-[#FF7A00]">Solutions</span>
                  </h1>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-normal">
                    Explore our comprehensive surveillance and smart automation systems. Click any solution to inspect technical capabilities, equipment specifications, and complete installation details across Tamil Nadu.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white border border-neutral-200/90 rounded-2xl p-4 shadow-sm self-start lg:self-auto">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#FF7A00] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FF7A00] uppercase tracking-wider">
                      CERTIFIED HARDWARE
                    </div>
                    <div className="text-sm font-black text-[#111827]">
                      1–3 Year Brand Warranty
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. THE 3D SECURITY SERVICES GRID */}
          <section className="pb-20 sm:pb-28 px-4 sm:px-12 lg:px-[100px] relative">
            <div className="max-w-7xl mx-auto">
              {/* 3D Cyber Perspective Wireframe Grid Matrix Backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none rounded-3xl opacity-60" />

              {/* The 3D Responsive Grid (All 9 Services in a 3-Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {SERVICES_DATA.map((sys, idx) => (
                  <ThreeDServiceCard key={sys.id} sys={sys} idx={idx} />
                ))}
              </div>
            </div>
          </section>

          {/* 3. Property Configurator */}
          <section className="py-16 sm:py-20 px-4 sm:px-12 lg:px-[100px] bg-white/70 border-y border-neutral-200/80">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 mb-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                    SYSTEM CONFIGURATOR
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight">
                  Find the Right Setup for <span className="text-[#FF7A00]">Your Property</span>
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-[#4B5563] font-normal max-w-xl">
                  Select your property category to see recommended camera counts, storage capacity, and cabling specifications.
                </p>
              </div>

              {/* Property Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                {PROPERTY_PROFILES.map((p) => {
                  const IconC = p.icon;
                  const isAct = p.id === activeProfileId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveProfileId(p.id)}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isAct
                          ? "bg-white border-[#FF7A00] shadow-md ring-2 ring-[#FF7A00]/20 scale-105"
                          : "bg-white/80 border-neutral-200/90 hover:border-neutral-300 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <IconC className={`w-6 h-6 ${isAct ? "text-[#FF7A00]" : "text-neutral-500"}`} />
                        <span
                          className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase ${
                            isAct ? "bg-[#FFF7ED] text-[#FF7A00] border border-[#FFEDD5]" : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {p.popularBadge}
                        </span>
                      </div>
                      <div className="font-extrabold text-sm sm:text-base text-[#111827] tracking-tight">{p.label}</div>
                      <div className="text-xs text-[#6B7280] mt-0.5 truncate">{p.subtitle}</div>
                    </button>
                  );
                })}
              </div>

              {/* Recommended Architecture Blueprint Box */}
              <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-sm p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <span className="text-xs font-mono font-bold text-[#FF7A00] uppercase tracking-wider block mb-1">
                      RECOMMENDED ARCHITECTURE
                    </span>
                    <h3 className="text-2xl font-black text-[#111827] tracking-tight mb-4">
                      {activeProfile.label} &bull; Security Plan
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70">
                        <div className="text-xs font-mono font-bold text-neutral-500 uppercase">Camera Layout</div>
                        <div className="text-sm font-extrabold text-[#111827] mt-0.5">{activeProfile.cameras}</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70">
                        <div className="text-xs font-mono font-bold text-neutral-500 uppercase">Storage Retention</div>
                        <div className="text-sm font-extrabold text-[#111827] mt-0.5">{activeProfile.storage}</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70">
                        <div className="text-xs font-mono font-bold text-neutral-500 uppercase">Wiring Standard</div>
                        <div className="text-sm font-extrabold text-[#111827] mt-0.5">{activeProfile.wiring}</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70">
                        <div className="text-xs font-mono font-bold text-neutral-500 uppercase">Mobile App Live Sync</div>
                        <div className="text-sm font-extrabold text-[#111827] mt-0.5">{activeProfile.remoteApp}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {activeProfile.bestFeatures.map((bf) => (
                        <div key={bf} className="flex items-center gap-2 text-xs font-semibold text-[#374151]">
                          <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                          <span>{bf}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-center bg-[#FFF7ED]/50 border border-[#FFEDD5] p-6 sm:p-8 rounded-2xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF7A00] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-black text-[#111827] mb-1">
                      Ready to Setup {activeProfile.label}?
                    </h4>
                    <p className="text-xs text-[#4B5563] mb-5">
                      Schedule an on-site engineer visit to assess camera placements and provide a transparent quote.
                    </p>

                    <a
                      href={`https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%2C%20I%20want%20to%20inquire%20about%20the%20${encodeURIComponent(activeProfile.label)}%20package`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Book Free Site Survey on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* 5. Our Company Brochure */}
          <section className="pb-20 px-4 sm:px-12 lg:px-[100px]">
            <div className="max-w-7xl mx-auto">
              <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_15px_45px_rgba(0,0,0,0.05)] p-8 sm:p-12 lg:p-14 overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FFF7ED] via-transparent to-transparent pointer-events-none rounded-tr-3xl" />
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                        DOWNLOAD RESOURCES
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight mb-3">
                      Our Company Brochure
                    </h2>
                    <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                      Our expert team provides tailored surveillance systems and smart automation solutions to address today’s security challenges. From cutting-edge cameras to integrated automation, we prioritize your safety and convenience.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <a
                      href="/stec-secure-brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_8px_25px_rgba(255,122,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
