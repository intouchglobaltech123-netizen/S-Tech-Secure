import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactSection } from "@/components/sections/ContactSection";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import { ShieldCheck, MapPin, CheckCircle2, Clock, PhoneCall, HelpCircle, Compass } from "lucide-react";
import { useState } from "react";
import { serviceAreas } from "@/data/company";

const contactTitle = "Contact STEC Secure | Free Security Site Survey in Erode & Tamil Nadu";
const contactDescription =
  "Contact STEC Secure for free CCTV site surveys, customized security system quotations, and immediate consultation for homes, villas, commercial spaces, and factories across Tamil Nadu.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contactTitle },
      { name: "description", content: contactDescription },
      { property: "og:title", content: contactTitle },
      { property: "og:description", content: contactDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stec-secure.vercel.app/contact" },
      { property: "og:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: contactTitle },
      { name: "twitter:description", content: contactDescription },
      { name: "twitter:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      {
        name: "keywords",
        content:
          "Contact STEC Secure, CCTV quote Erode, security site survey, CCTV dealers phone number Erode, CCTV installation near me, CCTV Tamil Nadu",
      },
    ],
    links: [{ rel: "canonical", href: "https://stec-secure.vercel.app/contact" }],
  }),
  component: ContactPage,
});

const SURVEY_STEPS = [
  {
    step: "01",
    title: "Initial Security Consultation",
    desc: "Reach out via our inquiry form, phone, or WhatsApp. We discuss your property type, security priorities, camera counts, and target coverage zones.",
  },
  {
    step: "02",
    title: "Free On-Site Property Walkthrough",
    desc: "A certified STEC Secure engineer visits your premises in Erode, Salem, or surrounding districts to evaluate angles, perimeter blind spots, and cable runs.",
  },
  {
    step: "03",
    title: "Itemized Transparent Quotation",
    desc: "Receive a detailed, transparent proposal specifying exact camera models, storage duration, wiring specifications, and timeline with zero hidden charges.",
  },
  {
    step: "04",
    title: "Concealed Installation & Setup",
    desc: "Our technicians perform clean, fire-retardant cabling, configure DVR/NVR systems, set up mobile app monitoring on your phone, and provide hands-on training.",
  },
];

const CONTACT_FAQS = [
  {
    q: "Is the on-site security survey completely free?",
    a: "Yes, our on-site survey and security assessment are 100% free with no obligation to purchase. A certified surveillance engineer will inspect your location, identify blind spots, and provide a transparent, itemized quotation tailored to your premises.",
  },
  {
    q: "How quickly can your team visit our site in Erode or nearby areas?",
    a: "For locations within Erode, Perundurai, and Bhavani, we offer same-day or next-day site visits. For Salem, Namakkal, Tiruchengode, Karur, and Coimbatore, site surveys are typically scheduled within 24 to 48 hours of your request.",
  },
  {
    q: "Do your installations include warranty and after-sales support?",
    a: "Every STEC Secure installation includes a 1-year comprehensive on-site service warranty in addition to manufacturer warranties (typically 2 to 3 years on cameras and recording units). We provide prompt local technical support.",
  },
  {
    q: "Which security camera and automation brands do you install?",
    a: "We only supply and install genuine, certified equipment from globally recognized industry leaders including Hikvision, CP PLUS, Dahua, Uniview, TP-Link, and premium gate and boom barrier automation hardware.",
  },
];

function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col justify-between overflow-x-hidden">
      <SiteNav revealed={true} />
      <main className="relative pt-20 sm:pt-24 flex-1 flex flex-col">
        <CyberMeshBackground />
        
        <div className="relative z-10 w-full">
          {/* Main Contact Form Section */}
          <ContactSection />

          {/* ─── Step-by-Step Survey Process ────────────────────────── */}
          <section className="py-12 px-4 sm:px-10 lg:px-14 bg-white/70 backdrop-blur-sm border-t border-neutral-200/80">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                    SEAMLESS ONBOARDING
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                  How Our Free Site Survey Works
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                  From your first message to complete installation, our structured 4-step engineering process ensures optimal security and zero hassle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SURVEY_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-[#FF7A00]/50 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-2xl font-mono font-black text-[#FF7A00] block mb-2">
                        {step.step}
                      </span>
                      <h3 className="text-base font-bold text-[#111827] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Frequently Asked Questions ─────────────────────────── */}
          <section className="py-12 px-4 sm:px-10 lg:px-14 border-t border-neutral-200/80">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <HelpCircle className="w-4 h-4 text-[#FF7A00]" />
                  <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                    COMMON INQUIRIES
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {CONTACT_FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                        isOpen
                          ? "bg-white border-[#FF7A00] shadow-sm"
                          : "bg-white/80 border-neutral-200/80 hover:bg-white"
                      }`}
                    >
                      <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-bold text-[#111827]">
                          {faq.q}
                        </h3>
                        <span className="text-[#FF7A00] text-sm font-bold flex-shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Service Coverage Hub ───────────────────────────────── */}
          <section className="py-10 px-4 sm:px-10 lg:px-14 bg-gradient-to-b from-[#FFF7ED]/50 to-transparent border-t border-neutral-200/80">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-[#FF7A00]" />
                <span className="font-mono text-xs font-bold tracking-widest text-[#FF7A00] uppercase">
                  REGIONAL DISPATCH &amp; COVERAGE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111827] mb-3">
                Prompt On-Site Security Service Across Tamil Nadu
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto mb-6">
                Based out of Erode, our dedicated engineering team services residential layouts, textile units, factories, commercial institutions, and hospitals across Western and Central Tamil Nadu.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area.name}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 shadow-sm text-xs font-semibold text-neutral-700 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                    <span>{area.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default ContactPage;
