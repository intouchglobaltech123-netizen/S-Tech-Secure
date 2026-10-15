import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { FaqList } from "@/components/ui/FaqList";
import { SERVICES_DATA, COMPANY_CONTACT } from "@/data/servicesData";
import { SERVICE_SEO, SURVEY_FAQ, serviceSeoName } from "@/data/serviceSeo";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import { createServiceJsonLd, createBreadcrumbJsonLd, STEC_SITE_URL } from "@/lib/structured-data";

const findService = (param: string) => {
  // Accept legacy/plural aliases so old links and crawlers don't hit a 404
  const id = param === "video-door-phones" ? "video-door-phone" : param;
  return SERVICES_DATA.find((s) => s.id === id || s.slug === id);
};

/** Trim to ~155 characters at a word boundary so Google shows the whole description. */
const fitDescription = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + "…";
};

type Service = (typeof SERVICES_DATA)[number];

// Words that must keep their capitals when turning "Title Case Questions" into sentence case
const KEEP_CAPS = new Set(["I", "CCTV", "RFID", "ANPR", "DECT", "IP", "PIN", "GSM", "Erode", "Salem", "Coimbatore", "Tamil", "Nadu"]);
const sentenceCase = (text: string) =>
  text
    .split(" ")
    .map((w, i) => {
      const bare = w.replace(/[^A-Za-z]/g, "");
      if (KEEP_CAPS.has(bare)) return w;
      return i === 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase();
    })
    .join(" ");

/** Real questions from the data file when there are enough; otherwise the brochure-based ones. Always ends with the survey question. */
function getServiceFaqs(service: Service) {
  const real = (service.faqs ?? [])
    .filter((f) => f.question.trim().endsWith("?"))
    .map((f) => ({ q: sentenceCase(f.question), a: f.answer }));
  const brochure = SERVICE_SEO[service.id]?.faqs ?? [];
  const list = real.length >= 3 ? real : [...real, ...brochure];
  return [...list, SURVEY_FAQ];
}

/** Installation items; falls back to the brochure-based list where the data file holds questions instead. */
function getIncluded(service: Service) {
  const looksLikeQuestions = service.whatsIncluded.some((item) => item.split(":")[0].trim().endsWith("?"));
  return looksLikeQuestions ? SERVICE_SEO[service.id]?.included ?? [] : service.whatsIncluded;
}

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => {
    const service = findService(params.serviceId);
    const id = service?.id ?? params.serviceId;
    const name = service ? serviceSeoName(service.id, service.title) : "Security Systems";
    const seo = service ? SERVICE_SEO[service.id] : undefined;

    const title = `${name} Installation, Erode | S Tec Secure`;
    const description = fitDescription(
      seo?.description ??
        (service
          ? `${name} installed by S TEC SECURE engineers across Tamil Nadu. Free site survey.`
          : "CCTV, smart home and security system installation across Tamil Nadu by S TEC SECURE.")
    );
    const canonical = `${STEC_SITE_URL}/services/${id}`;
    const image = `${STEC_SITE_URL}/services/${service?.id ?? "cctv"}.jpg`;

    const faqLd = service && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: getServiceFaqs(service).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content: `${name}, ${name} Erode, ${name} Salem, ${name} Coimbatore, ${name} installation Tamil Nadu, S Tec Secure`,
        },
        { name: "author", content: "S Tec Secure" },
        { name: "robots", content: service ? "index, follow, max-image-preview:large" : "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: `${name} by S Tec Secure` },
        { property: "og:site_name", content: "S Tec Secure" },
        { property: "og:locale", content: "en_IN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(createServiceJsonLd({ name, description, url: canonical, image })),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            createBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
              { name, url: `/services/${id}` },
            ])
          ),
        },
        ...(faqLd ? [{ type: "application/ld+json", children: JSON.stringify(faqLd) }] : []),
      ],
    };
  },
  component: ServiceDetailPage,
});

const sectionHeading = "text-2xl sm:text-[28px] font-bold tracking-tight text-[#111827]";
const eyebrow = "text-sm font-semibold text-[#FF7A00]";

const titleCase = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 3 ? w[0].toUpperCase() + w.slice(1) : w.toUpperCase()))
    .join(" ")
    .replace(/\bIOT\b/, "IoT");

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const service = findService(serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
        <SiteNav revealed={true} />
        <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-20 text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">Service not found</h1>
            <p className="mt-3 text-sm text-neutral-500">We couldn't find that service. Please choose from the full list.</p>
            <Link
              to="/services"
              className="mt-6 inline-flex h-11 items-center px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors"
            >
              View all services
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const seo = SERVICE_SEO[service.id];
  const name = serviceSeoName(service.id, service.title);
  const shortName = seo?.shortName ?? service.title;
  const faqs = getServiceFaqs(service);
  const included = getIncluded(service);
  const others = SERVICES_DATA.filter((s) => s.id !== service.id);
  const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=${encodeURIComponent(
    `Hi S TEC SECURE, I would like a free site survey for ${name}.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteNav revealed={true} />

      <main className="relative">
        <CyberMeshBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 sm:pt-[104px] lg:pt-28 pb-16 sm:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-[#FF7A00] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">/</li>
              <li>
                <Link to="/services" className="hover:text-[#FF7A00] transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden className="text-neutral-300">/</li>
              <li aria-current="page" className="font-medium text-[#111827]">
                {name}
              </li>
            </ol>
          </nav>

          {/* ── 1. Intro ─────────────────────────────────────── */}
          <section className="mt-5 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className={eyebrow}>{titleCase(service.badge)}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.12]">{name}</h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-700 leading-relaxed">{service.overview}</p>
              {service.secondaryText && (
                <p className="mt-3 text-base text-neutral-500 leading-relaxed">{service.secondaryText}</p>
              )}

              <ul className="mt-5 sm:mt-6 flex flex-wrap gap-2 text-sm">
                {["Free site survey", "Installed by our own engineers", "Erode, Salem & Coimbatore"].map((fact) => (
                  <li
                    key={fact}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-neutral-600"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                    {fact}
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-[15px] font-semibold transition-colors"
                >
                  Book a free site survey
                </a>
                <a
                  href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                  className="text-center text-[15px] font-semibold text-[#111827] hover:text-[#FF7A00] transition-colors"
                >
                  or call {COMPANY_CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] sm:aspect-square max-h-[460px] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={`/services/${service.id}.jpg`}
                  alt={`${name} installed by S Tec Secure`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* ── 2. Key features ─────────────────────────────── */}
          <section aria-labelledby="features-heading" className="mt-14 sm:mt-20">
            <p className={eyebrow}>Key features</p>
            <h2 id="features-heading" className={`mt-2 ${sectionHeading}`}>
              What you get with {shortName}
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 overflow-hidden sm:overflow-visible rounded-2xl sm:rounded-none border border-neutral-200 sm:border-0 bg-white sm:bg-transparent divide-y divide-neutral-100 sm:divide-y-0">
              {service.keyFeatures.map((feat, i) => (
                <div key={feat.title} className="flex gap-3 sm:block p-5 sm:p-6 sm:rounded-2xl sm:bg-white sm:border sm:border-neutral-200">
                  <span className="inline-flex h-7 sm:h-8 min-w-7 sm:min-w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF4E8] px-2 text-xs sm:text-sm font-bold text-[#FF7A00] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mt-0.5 sm:mt-3 text-base font-bold text-[#111827] leading-snug">{feat.title}</h3>
                    <p className="mt-1 sm:mt-1.5 text-sm text-neutral-600 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Where it's used + what's included ─────────── */}
          <section className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {seo && (
              <div className="lg:col-span-5 rounded-3xl bg-[#0D1C34] text-white p-5 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Where {shortName} is used</h2>
                <ul className="mt-5 divide-y divide-white/10">
                  {seo.useCases.map((u) => (
                    <li key={u.title} className="py-3.5">
                      <p className="text-[15px] font-semibold">{u.title}</p>
                      <p className="mt-0.5 text-sm text-white/60">{u.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={`${seo ? "lg:col-span-7" : "lg:col-span-12"} rounded-3xl bg-white border border-neutral-200 p-5 sm:p-8`}>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">What's included with installation</h2>
              <ol className="mt-5 divide-y divide-neutral-100">
                {included.map((item, i) => {
                  const colon = item.indexOf(":");
                  const title = colon > 0 ? item.slice(0, colon).trim() : item;
                  const desc = colon > 0 ? item.slice(colon + 1).trim() : "";
                  return (
                    <li key={title} className="py-3.5 grid grid-cols-[2.25rem_1fr] gap-2">
                      <span className="text-sm font-bold text-[#FF7A00] tabular-nums pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold text-[#111827]">{title}</p>
                        {desc && <p className="mt-0.5 text-sm text-neutral-600 leading-relaxed">{desc}</p>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* ── 4. FAQ (matches the FAQ structured data) ───────── */}
          <section aria-labelledby="faq-heading" className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className={eyebrow}>Questions</p>
              <h2 id="faq-heading" className={`mt-2 ${sectionHeading}`}>
                {name}: frequently asked questions
              </h2>
              <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
                Quick answers about {shortName}. Can't find yours? Ask our engineers on WhatsApp.
              </p>
            </div>
            <FaqList items={faqs} idPrefix={`faq-${service.id}`} className="lg:col-span-8" />
          </section>

          {/* ── 5. Call to action ─────────────────────────────── */}
          <section
            aria-label="Free site survey"
            className="mt-14 sm:mt-20 rounded-3xl bg-[#0D1C34] text-white px-6 py-7 sm:px-10 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="max-w-2xl">
              <p className="text-xl sm:text-2xl font-bold tracking-tight">Planning {shortName === "CCTV" ? "a CCTV installation" : shortName}?</p>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                Our engineers do free site walk-throughs, blind-spot mapping and quotes across Tamil Nadu.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors flex-shrink-0"
            >
              Talk to an engineer
            </a>
          </section>

          {/* ── 6. Other services (internal links) ──────────────── */}
          <section aria-labelledby="others-heading" className="mt-14 sm:mt-20">
            <div className="flex items-end justify-between gap-4">
              <h2 id="others-heading" className={sectionHeading}>
                Other services
              </h2>
              <Link
                to="/services"
                className="text-sm font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00] hover:text-[#FF7A00] transition-colors"
              >
                View all services
              </Link>
            </div>
            <div className="mt-5 sm:mt-6 -mx-6 px-6 scroll-px-6 flex gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:scroll-px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:overflow-visible">
              {others.map((o) => {
                const oName = serviceSeoName(o.id, o.title);
                return (
                  <Link
                    key={o.id}
                    to="/services/$serviceId"
                    params={{ serviceId: o.id }}
                    className="group flex w-[78%] flex-shrink-0 snap-start sm:w-auto items-center gap-4 rounded-2xl bg-white border border-neutral-200 p-3 hover:border-[#FF7A00]/60 transition-colors"
                  >
                    <img
                      src={`/services/${o.id}.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-16 w-16 flex-shrink-0 rounded-xl object-cover bg-neutral-100"
                    />
                    <span className="min-w-0">
                      <span className="block text-xs text-[#FF7A00] font-semibold">{titleCase(o.badge)}</span>
                      <span className="block mt-0.5 text-sm font-semibold leading-snug text-[#111827] group-hover:text-[#FF7A00] transition-colors">
                        {oName}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
