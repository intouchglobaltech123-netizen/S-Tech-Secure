"use client";

import React, { useState } from "react";
import { COMPANY_CONTACT } from "@/data/servicesData";

const PROPERTY_TYPES = [
  { id: "residential", label: "Home / Villa" },
  { id: "commercial", label: "Shop / Office" },
  { id: "industrial", label: "Factory / Warehouse" },
  { id: "community", label: "Apartment / Layout" },
];

const SERVICE_OPTIONS = [
  "CCTV Surveillance",
  "Home Automation",
  "Video Door Phone",
  "Burglar Alarm",
  "Gate Automation",
  "Boom Barrier",
];

const MAP_QUERY = "14/2+THUNDUKADU+STREET+VERRAPPAN+CHATRAM+ERODE-638004";

const inputClass =
  "w-full px-4 py-2.5 lg:[@media(min-height:860px)]:py-3 rounded-xl bg-white border border-neutral-200 text-sm text-[#111827] placeholder-neutral-400 focus:outline-none focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 transition";

const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5 lg:[@media(min-height:860px)]:mb-2";

function chipClass(selected: boolean) {
  return `flex-shrink-0 whitespace-nowrap px-3.5 py-1.5 lg:[@media(min-height:860px)]:px-4 lg:[@media(min-height:860px)]:py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer ${
    selected
      ? "bg-[#FFF4E8] border-[#FF7A00] text-[#C25E00]"
      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-[#111827]"
  }`;
}

/**
 * Contact page content: one page heading, then two cards (details + survey form)
 * sized to fit together in a single laptop screen.
 */
export function ContactSection({ showHeader = true }: { showHeader?: boolean } = {}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("residential");
  const [selectedServices, setSelectedServices] = useState<string[]>(["CCTV Surveillance"]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const propLabel = PROPERTY_TYPES.find((p) => p.id === propertyType)?.label || propertyType;

    const formattedText = `Hi STEC SECURE,

*New Survey & Quote Request:*
• *Name:* ${name.trim() || "Not specified"}
• *Phone:* ${phone.trim() || "Not specified"}
• *Property:* ${propLabel}
• *Services:* ${selectedServices.join(", ")}
${notes.trim() ? `• *Location / Notes:* ${notes.trim()}` : ""}

Please share pricing and schedule a free on-site survey.`;

    const encoded = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=${encoded}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
    }, 200);
  };

  const contactRows: { label: string; value: React.ReactNode; desktopOnly?: boolean }[] = [
    {
      label: "Phone",
      desktopOnly: true,
      value: (
        <a
          href={`tel:${COMPANY_CONTACT.phoneRaw}`}
          className="font-semibold text-white hover:text-[#FF7A00] transition-colors"
        >
          {COMPANY_CONTACT.phone}
        </a>
      ),
    },
    {
      label: "WhatsApp",
      desktopOnly: true,
      value: (
        <a
          href={`https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20STEC%20Secure%2C%20I%20would%20like%20to%20consult%20regarding%20security%20installation.`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-semibold text-white hover:text-[#FF7A00] transition-colors"
        >
          Chat with our engineers
        </a>
      ),
    },
    {
      label: "Email",
      value: (
        <a href="mailto:stecsecure@gmail.com" className="text-white hover:text-[#FF7A00] transition-colors">
          stecsecure@gmail.com
        </a>
      ),
    },
    {
      label: "Address",
      value: <span className="text-white">14/2 Thundukadu Street, Veerappan Chatram, Erode – 638004</span>,
    },
    {
      label: "Hours",
      value: <span className="text-white">Mon – Sat, 08:00 AM – 08:00 PM</span>,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-transparent text-[#111827]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* The single page heading */}
        {showHeader && (
          <div className="mb-6 lg:mb-3 flex flex-col gap-1.5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <h1
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-[34px] font-bold tracking-tight text-[#111827] leading-tight"
            >
              Contact <span className="text-[#FF7A00]">Us</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-500 lg:text-right lg:pb-1">
              Free site survey and a clear quote, anywhere around Erode.
            </p>
          </div>
        )}

        {/* Phones: the two fastest ways to reach us, first */}
        <div className="lg:hidden mb-4 grid grid-cols-2 gap-3">
          <a
            href={`tel:${COMPANY_CONTACT.phoneRaw}`}
            className="flex h-12 items-center justify-center rounded-xl bg-[#0D1C34] text-[15px] font-semibold text-white active:scale-[0.98] transition-transform"
          >
            Call us
          </a>
          <a
            href={`https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20STEC%20Secure%2C%20I%20would%20like%20to%20consult%20regarding%20security%20installation.`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex h-12 items-center justify-center rounded-xl border border-neutral-300 bg-white text-[15px] font-semibold text-[#0D1C34] active:scale-[0.98] transition-transform"
          >
            WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 xl:gap-6 items-stretch">
          {/* Left: contact details + map */}
          <div className="order-2 lg:order-none lg:col-span-5 rounded-3xl bg-[#0D1C34] text-white p-5 sm:p-6 lg:p-5 lg:[@media(min-height:860px)]:p-7 flex flex-col shadow-[0_20px_50px_-24px_rgba(13,28,52,0.55)]">
            <dl className="-mt-2.5 lg:mt-0 divide-y divide-white/10 max-lg:[&>div:nth-child(3)]:border-t-0">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className={`${row.desktopOnly ? "hidden lg:grid" : "grid"} grid-cols-[72px_1fr] lg:grid-cols-[84px_1fr] gap-4 py-2.5 lg:first:pt-0 text-sm`}
                >
                  <dt className="text-white/50">{row.label}</dt>
                  <dd className="leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex-1 min-h-[180px] lg:min-h-[160px] rounded-2xl overflow-hidden ring-1 ring-white/10">
              <iframe
                title="S TEC SECURE Office Location"
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 160 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right: survey request form */}
          <form
            onSubmit={handleSendWhatsApp}
            aria-label="Request a free site survey"
            className="order-1 lg:order-none lg:col-span-7 rounded-3xl bg-white border border-neutral-200 p-5 sm:p-6 lg:p-5 lg:[@media(min-height:860px)]:p-7 flex flex-col gap-4 lg:gap-3.5 lg:[@media(min-height:860px)]:gap-4 shadow-[0_20px_50px_-28px_rgba(13,28,52,0.25)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className={labelClass}>
                  Mobile / WhatsApp number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">+91</span>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>Property type</legend>
              <div className="-mx-5 px-5 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    aria-pressed={propertyType === pt.id}
                    onClick={() => setPropertyType(pt.id)}
                    className={chipClass(propertyType === pt.id)}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClass}>Services needed</legend>
              <div className="-mx-5 px-5 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SERVICE_OPTIONS.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    aria-pressed={selectedServices.includes(svc)}
                    onClick={() => toggleService(svc)}
                    className={chipClass(selectedServices.includes(svc))}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="contact-notes" className={labelClass}>
                Location &amp; requirements <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="contact-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 4 cameras for a house in Erode with remote mobile viewing"
                className={`${inputClass} resize-none h-24 sm:h-16 lg:[@media(min-height:860px)]:h-20`}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 lg:[@media(min-height:860px)]:py-3.5 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] disabled:opacity-70 text-white font-semibold text-[15px] transition-colors cursor-pointer"
              >
                {isSubmitting ? "Opening WhatsApp…" : "Send request on WhatsApp"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
