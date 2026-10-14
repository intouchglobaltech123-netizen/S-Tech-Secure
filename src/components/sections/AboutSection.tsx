import { Link } from "@tanstack/react-router";
import { COMPANY_CONTACT, SERVICES_DATA } from "@/data/servicesData";
import { serviceAreas } from "@/data/company";
import { faqs } from "@/data/site";
import { FaqList } from "@/components/ui/FaqList";

// Content below is taken from the S TEC SECURE company brochure.

const WHAT_WE_DO = [
  {
    title: "Advanced surveillance",
    copy: "Cameras and monitoring that give you real-time security and protect your property day and night.",
  },
  {
    title: "Intelligent automation",
    copy: "Integrated automation that makes homes and businesses more secure, efficient and convenient.",
  },
  {
    title: "Reliable, scalable systems",
    copy: "Built on the latest technology, so your security can grow as your needs change.",
  },
];

const REASONS = [
  {
    title: "Tailored to your site",
    copy: "Every system is planned after a site survey, so you pay only for the coverage you need.",
  },
  {
    title: "Our own engineers",
    copy: "Installation and servicing are done by the S TEC SECURE team, not passed on to others.",
  },
  {
    title: "Latest technology",
    copy: "HD and 4K cameras, smart detection and mobile access from leading brands.",
  },
  {
    title: "Support after handover",
    copy: "We stay with you for maintenance, repairs and upgrades as your needs grow.",
  },
];

const eyebrow = "text-sm font-semibold text-[#FF7A00]";
const sectionHeading = "text-2xl sm:text-[28px] font-bold tracking-tight text-[#111827]";

const whatsapp = (text: string) => `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`;

export function AboutSection() {
  return (
    <section id="about" className="relative w-full text-[#111827]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ── 1. Intro (text left, engineer photo right) ───── */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.12]">
              About <span className="text-[#FF7A00]">S TEC SECURE</span>
            </h1>
            <p className="mt-5 text-lg text-neutral-700 leading-relaxed">
              Your trusted partner in surveillance and automation since 2021. We specialise in advanced security
              technology that protects your assets and makes everyday operations easier.
            </p>
            <p className="mt-3 text-base text-neutral-500 leading-relaxed">
              Our team designs tailored surveillance and smart automation systems for homes and businesses, from
              cameras to fully integrated automation, with your safety and convenience first.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/services"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-[15px] font-semibold transition-colors"
              >
                Explore our services
              </Link>
              <a
                href={whatsapp("Hi S TEC SECURE, I would like to know more about your security solutions.")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-neutral-300 bg-white text-[#111827] text-[15px] font-semibold hover:border-[#0D1C34] transition-colors"
              >
                Talk to an engineer
              </a>
            </div>
          </div>

          <figure className="lg:col-span-5 relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 border border-neutral-200">
              <img
                src="/blog/cctv-maintenance.jpg"
                alt="S TEC SECURE engineer servicing a CCTV camera"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="absolute left-4 bottom-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-[#0D1C34] shadow-sm">
              Installed and serviced by our own engineers
            </figcaption>
          </figure>
        </header>

        {/* Stats */}
        <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
          {[
            { value: "2021", label: "Founded in Erode" },
            { value: String(SERVICES_DATA.length), label: "Security & automation services" },
            { value: String(serviceAreas.length), label: "Towns and cities served" },
            { value: "Free", label: "Site survey before every job" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end bg-white px-5 py-4 sm:px-6">
              <dt className="mt-0.5 text-xs sm:text-sm text-neutral-500">{stat.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-[#111827]">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* ── 2. What we do ───────────────────────────────── */}
        <section aria-labelledby="what-heading" className="mt-20">
          <p className={eyebrow}>What we do</p>
          <h2 id="what-heading" className={`mt-2 ${sectionHeading}`}>
            Security and automation, done properly
          </h2>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHAT_WE_DO.map((item, i) => (
              <li key={item.title} className="rounded-2xl bg-white border border-neutral-200 p-6">
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#FFF4E8] px-2 text-sm font-bold text-[#FF7A00] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{item.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 3. CEO message (navy panel) ─────────────────── */}
        <section
          aria-labelledby="ceo-heading"
          className="mt-20 relative overflow-hidden rounded-3xl bg-[#0D1C34] text-white"
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF7A00]/15 blur-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 lg:pr-0">
              <div className="mx-auto lg:mx-0 max-w-[300px] aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                <img
                  src="/ceo.png"
                  alt="Mr. Santhosh, CEO of S TEC SECURE"
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:col-span-8 flex flex-col justify-center p-6 pt-0 sm:p-8 sm:pt-0 lg:p-12">
              <p className="text-sm font-semibold text-[#FFA04D]">A message from our CEO</p>
              <h2 id="ceo-heading" className="sr-only">
                Message from the CEO
              </h2>
              <blockquote className="mt-4">
                <p className="text-2xl sm:text-3xl font-bold leading-snug tracking-tight">
                  <span aria-hidden className="text-[#FF7A00]">“</span>
                  At S TEC SECURE, we are dedicated to safeguarding your world with advanced, reliable security
                  solutions. Join us in building a safer future with protection you can count on.
                  <span aria-hidden className="text-[#FF7A00]">”</span>
                </p>
                <footer className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-lg font-bold">Mr. Santhosh</p>
                    <p className="text-sm text-white/60">CEO, S TEC SECURE</p>
                  </div>
                  <a
                    href={whatsapp("Hi S TEC SECURE, I would like to know more about your security solutions.")}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors"
                  >
                    Connect on WhatsApp
                  </a>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── 4. Mission & vision ─────────────────────────── */}
        <section aria-labelledby="mission-heading" className="mt-20">
          <p className={eyebrow}>Mission &amp; vision</p>
          <h2 id="mission-heading" className={`mt-2 ${sectionHeading}`}>
            What drives us
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold">Our mission</h3>
              <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
                To deliver state-of-the-art surveillance and automation solutions that protect assets and improve how
                our clients work. We aim for lasting relationships built on trust, transparency and excellence, and we
                keep adapting to new technology so our solutions stay efficient and future-ready.
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFF4E8] border border-[#FFE2C2] p-6 sm:p-8">
              <h3 className="text-lg font-bold">Our vision</h3>
              <p className="mt-3 text-[15px] text-[#7C2D12]/80 leading-relaxed">
                To be a leader in security and automation, known for excellence, innovation and customer-first
                solutions. We want to create smarter, safer spaces for businesses and families, and to keep raising the
                standard for security in the region.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. Why choose us (light orange panel, checklist) ── */}
        <section
          aria-labelledby="why-heading"
          className="mt-20 rounded-3xl bg-[#FFF4E8] border border-[#FFE2C2] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <div className="lg:col-span-4">
            <p className={eyebrow}>Why S TEC SECURE</p>
            <h2 id="why-heading" className={`mt-2 ${sectionHeading}`}>
              Reasons customers choose us
            </h2>
            <p className="mt-3 text-[15px] text-[#7C2D12]/80 leading-relaxed">
              Straightforward advice, careful installation and support that continues after the job is done.
            </p>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            {REASONS.map((r) => (
              <li key={r.title} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7A00] text-sm font-bold text-white"
                >
                  ✓
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#111827]">{r.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{r.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 6. Areas we serve ───────────────────────────── */}
        <section aria-labelledby="areas-heading" className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <p className={eyebrow}>Service areas</p>
            <h2 id="areas-heading" className={`mt-2 ${sectionHeading}`}>
              Areas we serve
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
              From our office in Erode we install and service systems across western Tamil Nadu. Not sure if we cover
              your area? Just ask.
            </p>
            <a
              href={whatsapp("Hi S TEC SECURE, do you cover my area?")}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-5 inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#0D1C34] hover:bg-[#142A4D] text-white text-sm font-semibold transition-colors"
            >
              Check my area on WhatsApp
            </a>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {serviceAreas.map((a, i) => (
              <li
                key={a.name}
                className={`rounded-2xl border px-4 py-3 transition-colors ${
                  i === 0 ? "bg-[#FFF4E8] border-[#FFE2C2]" : "bg-white border-neutral-200 hover:border-[#FF7A00]/50"
                }`}
              >
                <p className="flex items-center gap-2 text-[15px] font-semibold text-[#111827]">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                  {a.name}
                  {i === 0 && <span className="ml-auto text-xs font-semibold text-[#C25E00]">Head office</span>}
                </p>
                <p className="mt-1 text-xs text-neutral-500 leading-snug">{a.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 7. FAQ (matches the FAQ structured data on this page) ── */}
        <section aria-labelledby="faq-heading" className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className={eyebrow}>Questions</p>
            <h2 id="faq-heading" className={`mt-2 ${sectionHeading}`}>
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed">
              Answers to what customers ask most before installing a security system.
            </p>
          </div>
          <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} idPrefix="about-faq" className="lg:col-span-8" />
        </section>

        {/* ── 8. Call to action ───────────────────────────── */}
        <section
          aria-label="Free site survey"
          className="mt-20 rounded-3xl bg-[#0D1C34] text-white px-6 py-7 sm:px-10 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-5"
        >
          <div className="max-w-2xl">
            <p className="text-xl sm:text-2xl font-bold tracking-tight">Need advice for your property?</p>
            <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
              Our engineers do free site walk-throughs, blind-spot mapping and quotes across Tamil Nadu.
            </p>
          </div>
          <a
            href={whatsapp("Hi S TEC SECURE, I would like a free site survey.")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors flex-shrink-0"
          >
            Talk to an engineer
          </a>
        </section>
      </div>
    </section>
  );
}

export default AboutSection;
