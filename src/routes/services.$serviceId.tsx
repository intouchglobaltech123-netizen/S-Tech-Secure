import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES_DATA } from "@/data/servicesData";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { useEffect, useState } from "react";

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

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => {
    const normalizedId = params.serviceId === "video-door-phones" ? "video-door-phone" : params.serviceId;
    const service = SERVICES_DATA.find(
      (s) => s.id === normalizedId || s.slug === normalizedId
    );
    const title = service
      ? `${service.title} Installation in Erode & Tamil Nadu | STEC Secure`
      : "Security Solution Details | STEC Secure";
    const description = service
      ? `${service.tagline || service.shortDescription}. Certified equipment, prompt site surveys and professional installation across Erode, Salem and Tamil Nadu.`
      : "Professional security and automation system installation by STEC Secure.";
    const imagePath = service ? SERVICE_IMAGES[service.id] || "/services/cctv.jpg" : "/services/cctv.jpg";
    const image = `https://stec-secure.vercel.app${imagePath}`;
    const canonical = `https://stec-secure.vercel.app/services/${service?.id || normalizedId}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        {
          name: "keywords",
          content: `${service?.title || "Security System"}, ${service?.title || "CCTV"} Erode, installation Erode, CCTV dealers Tamil Nadu, STEC Secure`,
        },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Normalize legacy/plural aliases so external crawlers don't get 404
  const normalizedId = serviceId === "video-door-phones" ? "video-door-phone" : serviceId;

  // Find service by id or slug
  const service = SERVICES_DATA.find(
    (s) => s.id === normalizedId || s.slug === normalizedId
  );

  const serviceImage = service ? SERVICE_IMAGES[service.id] || null : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-black mb-3">Service Not Found</h1>
          <p className="text-neutral-500 mb-6 text-sm">
            The requested security service could not be located.
          </p>
          <Link
            to="/services"
            className="px-6 py-3 rounded-xl bg-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#111827] select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <SiteNav revealed={true} />

      <main className="relative pt-24 min-h-screen">
        <CyberMeshBackground />

        <div className="relative z-10 pt-[30px] pb-[80px] px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto space-y-12">

            {/* ─── Breadcrumbs & Navigation ──────────────────────────── */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase font-bold text-neutral-500">
                <Link
                  to="/services"
                  className="text-[#FF7A00] hover:underline transition-colors"
                >
                  Services
                </Link>
                <span>/</span>
                <span className="text-neutral-800">{service.title}</span>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#FF7A00] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Services</span>
              </Link>
            </div>

            {/* ─── 1. Premium Dark Hero Banner ───────────────────────── */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-800/80">
              {/* Dark gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#070B12] via-[#0F172A] to-[#0A0F1D]" />
              {/* Glowing amber accent lighting */}
              <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#FF7A00] rounded-full opacity-15 blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-[#FF7A00] rounded-full opacity-10 blur-[80px] pointer-events-none" />
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              {/* Top gradient highlight strip */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[480px]">
                
                {/* Left: Content (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center px-8 sm:px-12 py-12">
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
                    {service.title}
                  </h1>

                  {/* Short description */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-xl">
                    {service.tagline}
                  </p>

                  {/* Trust metrics strip */}
                  <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
                    {[
                      { label: "Deployment", value: "Same-Day" },
                      { label: "Coverage", value: "Tamil Nadu" },
                      { label: "Warranty", value: "1 Year" },
                    ].map((t) => (
                      <div key={t.label} className="text-left">
                        <div className="text-sm sm:text-base font-extrabold text-[#FF7A00]">{t.value}</div>
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold font-mono">{t.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Product Showcase (5 cols) */}
                <div className="lg:col-span-5 relative flex items-center justify-center p-8 lg:p-12 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 bg-white/[0.02]">
                  {/* Subtle radial lighting */}
                  <div className="absolute inset-0 bg-radial from-[#FF7A00]/10 via-transparent to-transparent opacity-60" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    {serviceImage && (
                      <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
                        <img
                          src={serviceImage}
                          alt={service.title}
                          className="max-h-64 sm:max-h-72 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
                        />
                      </div>
                    )}

                    {/* Quality badge */}
                    <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono font-bold text-neutral-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>ORIGINAL CERTIFIED HARDWARE</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ─── 2. System Specifications & Capabilities (Clean 3-Column Grid) */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                      TECHNICAL CAPABILITIES
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                    System Specifications &amp; Features
                  </h2>
                </div>
                <p className="text-xs font-mono text-neutral-500">
                  Engineered for 24/7 reliability in residential and commercial setups
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {service.keyFeatures.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-[#FF7A00]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] text-[#FF7A00] flex items-center justify-center mb-3.5">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#111827] mb-2 tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── 3. Installation Scope & FAQs (Clean Balanced Split) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left (6 cols): What's Included */}
              <div className="lg:col-span-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm p-7 sm:p-8 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                      DEPLOYMENT SCOPE
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                    What&rsquo;s Included with Installation
                  </h3>
                </div>

                <div className="space-y-3">
                  {service.whatsIncluded.map((item, idx) => {
                    const colonIndex = item.indexOf(":");
                    const hasColon = colonIndex > 0;
                    const title = hasColon ? item.slice(0, colonIndex).trim() : item;
                    const desc = hasColon ? item.slice(colonIndex + 1).trim() : "";

                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F8FAFC] border border-neutral-100 hover:border-neutral-200 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs sm:text-sm font-bold text-[#111827]">
                            {title}
                          </div>
                          {desc && (
                            <div className="text-xs text-neutral-600 leading-relaxed font-normal">
                              {desc}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center gap-3 text-xs text-[#9A3412]">
                  <ShieldCheck className="w-5 h-5 text-[#FF7A00] flex-shrink-0" />
                  <span>All installations include certified fire-retardant wiring, surge protection, and a 1-year service warranty.</span>
                </div>
              </div>

              {/* Right (6 cols): FAQs Accordion */}
              <div className="lg:col-span-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm p-7 sm:p-8 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                      COMMON QUESTIONS
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={faq.question}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                          isOpen
                            ? "bg-white border-[#FF7A00] shadow-sm"
                            : "bg-[#F8FAFC] border-neutral-200/80 hover:bg-white"
                        }`}
                      >
                        <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                          <h4
                            className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                              isOpen ? "text-[#FF7A00]" : "text-[#111827]"
                            }`}
                          >
                            {faq.question}
                          </h4>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border text-xs transition-transform duration-200 ${
                              isOpen
                                ? "bg-[#FF7A00] text-white border-[#FF7A00] rotate-180"
                                : "bg-white text-neutral-400 border-neutral-200"
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ─── 4. Related Security Solutions (Internal Link Building) ─── */}
            <div className="pt-6 border-t border-neutral-200/80 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                      COMPLETE PERIMETER DEFENSE
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                    Explore Other Security &amp; Automation Systems
                  </h3>
                </div>
                <Link
                  to="/services"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#FF7A00] hover:underline"
                >
                  <span>View All Solutions</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES_DATA.filter((s) => s.id !== service.id).map((other) => (
                  <Link
                    key={other.id}
                    to="/services/$serviceId"
                    params={{ serviceId: other.id }}
                    className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-[#FF7A00] hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-2">{other.icon}</div>
                      <div className="text-xs font-mono font-bold text-[#FF7A00] uppercase tracking-wider mb-1">
                        {other.badge}
                      </div>
                      <h4 className="text-sm font-extrabold text-[#111827] group-hover:text-[#FF7A00] transition-colors mb-1.5">
                        {other.title}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                        {other.tagline}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-[#FF7A00]">
                      <span>Learn More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
