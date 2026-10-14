import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import { SERVICES_DATA, COMPANY_CONTACT } from "@/data/servicesData";
import { serviceAreas } from "@/data/company";
import { faqs } from "@/data/site";
import { serviceSeoName } from "@/data/serviceSeo";
import { FaqList } from "@/components/ui/FaqList";
import {
  stecLocalBusinessJsonLd,
  createBreadcrumbJsonLd,
  faqJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

// ── SEO ──────────────────────────────────────────────────────────────
// Title ≈ 60 characters and description ≈ 155 characters so Google shows them in full.
const servicesTitle = "CCTV & Smart Home Services in Erode, Salem | S Tec Secure";
const servicesDescription =
  "CCTV installation, smart home automation, burglar alarms, gate automation, boom barriers and access control for homes and businesses across Tamil Nadu.";

const serviceName = serviceSeoName;

/** List of all services as structured data, so search engines understand what is offered. */
const servicesListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "S Tec Secure security and automation services",
  itemListElement: SERVICES_DATA.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: serviceName(s.id, s.title),
      description: s.tagline,
      url: `${STEC_SITE_URL}/services/${s.id}`,
      image: `${STEC_SITE_URL}/services/${s.id}.jpg`,
      provider: { "@type": "HomeAndConstructionBusiness", name: "S Tec Secure", telephone: "+91-9600252605" },
      areaServed: { "@type": "AdministrativeArea", name: "Tamil Nadu" },
    },
  })),
};

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: servicesTitle },
      { name: "description", content: servicesDescription },
      {
        name: "keywords",
        content:
          "CCTV installation Erode, CCTV installation Salem, CCTV camera dealers Coimbatore, smart home automation Tamil Nadu, burglar alarm, automatic gate, boom barrier, biometric access control, video door phone, intercom, nurse call system",
      },
      { name: "author", content: "S Tec Secure" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: servicesTitle },
      { property: "og:description", content: servicesDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${STEC_SITE_URL}/services` },
      { property: "og:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
      { property: "og:image:alt", content: "CCTV camera installed by S Tec Secure" },
      { property: "og:site_name", content: "S Tec Secure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: servicesTitle },
      { name: "twitter:description", content: servicesDescription },
      { name: "twitter:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
    ],
    links: [{ rel: "canonical", href: `${STEC_SITE_URL}/services` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(stecLocalBusinessJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          createBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
          ])
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(servicesListJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: ServicesPage,
});

// ── Content ──────────────────────────────────────────────────────────
const PROPERTY_PROFILES = [
  {
    id: "home",
    label: "Home",
    subtitle: "Apartments & 2–3 BHK",
    cameras: "4 HD night-vision cameras",
    storage: "1TB surveillance HDD (10–14 days)",
    wiring: "Concealed PVC, indoor / outdoor",
    remoteApp: "Live view on 2–4 family phones",
    bestFeatures: ["Front door & driveway coverage", "Motion push notifications", "No monthly subscription"],
  },
  {
    id: "villa",
    label: "Villa",
    subtitle: "Duplexes & independent houses",
    cameras: "6–8 4K AI cameras",
    storage: "2TB NVR storage (20+ days)",
    wiring: "Armoured conduit & multi-zone hub",
    remoteApp: "Remote access + video door phone",
    bestFeatures: ["Full-colour night vision", "Human & vehicle AI filtering", "Video intercom sync"],
  },
  {
    id: "commercial",
    label: "Shop & Office",
    subtitle: "Retail, showrooms & offices",
    cameras: "8–16 IP cameras with audio",
    storage: "4TB NVR (30-day retention)",
    wiring: "Gigabit PoE network switching",
    remoteApp: "Owner & manager remote monitoring",
    bestFeatures: ["Billing counter audio", "Staff presence tracking", "Customer entry coverage"],
  },
  {
    id: "industrial",
    label: "Factory & Warehouse",
    subtitle: "Industrial & gated premises",
    cameras: "16–64+ long-range IP cameras",
    storage: "Server rack with RAID storage",
    wiring: "Optical fibre gigabit backbone",
    remoteApp: "Gatehouse + central display wall",
    bestFeatures: ["PTZ optical zoom cameras", "Perimeter tripwire alarms", "Annual maintenance contract"],
  },
];

const STANDARDS = [
  {
    title: "Blind-spot mapping",
    copy: "Lens choice (2.8mm, 4mm, 6mm) and camera height are planned so every entry point is covered.",
  },
  {
    title: "Concealed cabling",
    copy: "Fire-retardant CAT6 in UV-resistant PVC conduit with weatherproof IP66 junction boxes.",
  },
  {
    title: "Surge-protected power",
    copy: "Regulated SMPS power with proper earthing protects cameras and recorders from voltage swings.",
  },
  {
    title: "Tested before handover",
    copy: "H.265+ recording, mobile app access and multi-day recording checks are completed on site.",
  },
];

const sectionHeading = "text-2xl sm:text-[28px] font-bold tracking-tight text-[#111827]";
const eyebrow = "text-sm font-semibold text-[#FF7A00]";

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 3 ? w[0].toUpperCase() + w.slice(1) : w.toUpperCase()))
    .join(" ")
    .replace(/\bIOT\b/, "IoT");
}

// ── Page ─────────────────────────────────────────────────────────────
function ServicesPage() {
  const [activeProfileId, setActiveProfileId] = useState<string>("villa");
  const activeProfile = PROPERTY_PROFILES.find((p) => p.id === activeProfileId) ?? PROPERTY_PROFILES[1];
  const surveyUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=${encodeURIComponent(
    `Hi, I would like a free site survey for my ${activeProfile.label.toLowerCase()}.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteNav revealed={true} />

      <main className="relative">
        <CyberMeshBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 sm:pt-[104px] lg:pt-28 pb-20">
          {/* ── 1. Heading ─────────────────────────────────────── */}
          <header>
            <h1 className="text-3xl sm:text-4xl lg:text-[34px] font-bold tracking-tight leading-tight">
              Security &amp; Automation <span className="text-[#FF7A00]">Services</span>
            </h1>
          </header>

          <dl className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
            {[
              { value: "2021", label: "Serving Tamil Nadu since" },
              { value: String(SERVICES_DATA.length), label: "Security & automation services" },
              { value: String(serviceAreas.length), label: "Towns and cities served" },
              { value: "1–3 yr", label: "Brand warranty on hardware" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end bg-white px-5 py-4 sm:px-6">
                <dt className="mt-0.5 text-xs sm:text-sm text-neutral-500">{stat.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-[#111827]">{stat.value}</dd>
              </div>
            ))}
          </dl>

          {/* ── 2. All services (compact: all nine fit in about one screen) ── */}
          <section aria-label="All services" className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_DATA.map((sys) => {
              const name = serviceName(sys.id, sys.title);
              return (
                <Link
                  key={sys.id}
                  to="/services/$serviceId"
                  params={{ serviceId: sys.id }}
                  className="group flex items-center gap-4 rounded-2xl bg-white border border-neutral-200 p-3 pr-4 hover:-translate-y-0.5 hover:border-[#FF7A00]/60 hover:shadow-[0_18px_40px_-26px_rgba(13,28,52,0.45)] transition-all duration-300"
                >
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={`/services/${sys.id}.jpg`}
                      alt={`${name} installed by S Tec Secure`}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#FF7A00]">{titleCase(sys.badge)}</p>
                    <h2 className="mt-1 text-base font-bold tracking-tight leading-snug text-[#111827] group-hover:text-[#FF7A00] transition-colors">
                      {name}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 leading-snug line-clamp-2">{sys.tagline}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827]">
                      View details
                      <span aria-hidden className="text-[#FF7A00] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </section>

          {/* ── 3. Find the right setup ────────────────────────── */}
          <section aria-labelledby="setup-heading" className="mt-20">
            <p className={eyebrow}>CCTV setup guide</p>
            <h2 id="setup-heading" className={`mt-2 ${sectionHeading}`}>
              Find the right setup for your property
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {PROPERTY_PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={p.id === activeProfileId}
                  onClick={() => setActiveProfileId(p.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer ${
                    p.id === activeProfileId
                      ? "bg-[#0D1C34] border-[#0D1C34] text-white"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-[#111827]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8">
                <p className="text-sm text-neutral-500">{activeProfile.subtitle}</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">Recommended plan for a {activeProfile.label.toLowerCase()}</h3>

                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y divide-neutral-100 sm:divide-y-0">
                  {[
                    ["Cameras", activeProfile.cameras],
                    ["Recording", activeProfile.storage],
                    ["Wiring", activeProfile.wiring],
                    ["Mobile viewing", activeProfile.remoteApp],
                  ].map(([label, value]) => (
                    <div key={label} className="py-3 sm:border-b sm:border-neutral-100">
                      <dt className="text-xs text-neutral-500">{label}</dt>
                      <dd className="mt-0.5 text-[15px] font-semibold text-[#111827]">{value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {activeProfile.bestFeatures.map((f) => (
                    <li key={f} className="rounded-full bg-[#FFF4E8] px-3.5 py-1.5 text-sm text-[#C25E00]">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 rounded-3xl bg-[#FFF4E8] border border-[#FFE2C2] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xl font-bold tracking-tight text-[#111827]">Not sure which plan fits?</p>
                  <p className="mt-2 text-sm text-[#7C2D12]/80 leading-relaxed">
                    An engineer visits, checks camera positions and gives you a clear quote. The survey is free.
                  </p>
                </div>
                <a
                  href={surveyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors"
                >
                  Book a free site survey
                </a>
              </div>
            </div>
          </section>

          {/* ── 4. How we install (navy panel to break up the page) ── */}
          <section
            aria-labelledby="standards-heading"
            className="mt-20 relative overflow-hidden rounded-3xl bg-[#0D1C34] text-white px-6 py-10 sm:px-10 sm:py-12"
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF7A00]/15 blur-3xl" />
            <div className="relative flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#FFA04D]">Installation standards</p>
                <h2 id="standards-heading" className="mt-2 text-2xl sm:text-[28px] font-bold tracking-tight">
                  How we install every system
                </h2>
              </div>
              <p className="max-w-md text-sm text-white/60 lg:text-right">
                The same careful process on every job, from a two-camera home to a full factory.
              </p>
            </div>
            <ol className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-white/10">
              {STANDARDS.map((st, i) => (
                <li key={st.title} className="bg-[#0D1C34] p-5 sm:p-6">
                  <span className="text-sm font-bold text-[#FF7A00] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-base font-bold">{st.title}</h3>
                  <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{st.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── 5. Local SEO content ───────────────────────────── */}
          <section aria-labelledby="local-heading" className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className={eyebrow}>Across Tamil Nadu</p>
              <h2 id="local-heading" className={`mt-2 ${sectionHeading}`}>
                CCTV installation and security systems near you
              </h2>
              <div className="mt-5 space-y-4 text-[15px] text-neutral-600 leading-relaxed">
                <p>
                  S Tec Secure designs and installs{" "}
                  <Link to="/services/$serviceId" params={{ serviceId: "cctv" }} className="font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00]">
                    CCTV camera systems
                  </Link>{" "}
                  for homes, villas, shops, offices, factories and warehouses. Every project starts with a free site survey, so
                  camera count, recording days and wiring are planned for your property instead of a fixed package.
                </p>
                <p>
                  Alongside surveillance we fit{" "}
                  <Link to="/services/$serviceId" params={{ serviceId: "home-automation" }} className="font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00]">
                    smart home automation
                  </Link>
                  ,{" "}
                  <Link to="/services/$serviceId" params={{ serviceId: "burglar-alarm" }} className="font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00]">
                    burglar alarms
                  </Link>
                  ,{" "}
                  <Link to="/services/$serviceId" params={{ serviceId: "gate-automation" }} className="font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00]">
                    automatic gates
                  </Link>
                  ,{" "}
                  <Link to="/services/$serviceId" params={{ serviceId: "access-control" }} className="font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00]">
                    biometric access control
                  </Link>{" "}
                  and{" "}
                  <Link to="/services/$serviceId" params={{ serviceId: "video-door-phone" }} className="font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00]">
                    video door phones
                  </Link>
                  , all installed and serviced by our own engineers from our Erode office.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-base font-bold text-[#111827]">Areas we serve</h3>
              <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceAreas.map((a) => (
                  <li
                    key={a.name}
                    className="rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-[#FF7A00]/50 transition-colors"
                  >
                    <p className="flex items-center gap-2 text-[15px] font-semibold text-[#111827]">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                      {a.name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 leading-snug">{a.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── 6. FAQ (matches the FAQ structured data) ────────── */}
          <section aria-labelledby="faq-heading" className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className={eyebrow}>Questions</p>
              <h2 id="faq-heading" className={`mt-2 ${sectionHeading}`}>
                Frequently asked questions
              </h2>
              <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
                Answers to what our customers ask most before installing a security system.
              </p>

              <div className="mt-6 rounded-2xl bg-[#0D1C34] text-white p-5">
                <p className="text-base font-semibold">Still have a question?</p>
                <p className="mt-1 text-sm text-white/60">Message or call our engineers directly.</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=${encodeURIComponent("Hi S TEC SECURE, I have a question about your services.")}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex h-10 items-center rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] px-4 text-sm font-semibold transition-colors"
                  >
                    Ask on WhatsApp
                  </a>
                  <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="text-sm font-medium text-white/75 hover:text-white transition-colors">
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>

            <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} className="lg:col-span-8" />
          </section>

          {/* ── 7. Brochure ────────────────────────────────────── */}
          <section
            aria-label="Company brochure"
            className="mt-20 rounded-3xl bg-[#0D1C34] text-white px-6 py-7 sm:px-10 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="max-w-2xl">
              <p className="text-xl sm:text-2xl font-bold tracking-tight">Download our company brochure</p>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                All our surveillance and automation services, in one PDF you can share.
              </p>
            </div>
            <a
              href={COMPANY_CONTACT.brochurePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors flex-shrink-0"
            >
              Download PDF
            </a>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
