"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Home,
  Store,
  Factory,
  Building,
  ExternalLink,
  Send,
  Sparkles,
} from "lucide-react";
import { COMPANY_CONTACT } from "@/data/servicesData";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const PROPERTY_TYPES = [
  { id: "residential", label: "Home / Villa", icon: Home },
  { id: "commercial", label: "Shop / Office", icon: Store },
  { id: "industrial", label: "Factory / Warehouse", icon: Factory },
  { id: "community", label: "Apartment / Layout", icon: Building },
];

const SERVICE_OPTIONS = [
  "CCTV Surveillance",
  "Home Automation",
  "Video Door Phone",
  "Burglar Alarm",
  "Gate Automation",
  "Boom Barrier",
];

export function ContactSection({ showHeader = false }: { showHeader?: boolean } = {}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("residential");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "CCTV Surveillance",
  ]);
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

    const propLabel =
      PROPERTY_TYPES.find((p) => p.id === propertyType)?.label || propertyType;

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

  return (
    <section
      id="contact"
      className="relative w-full pt-4 sm:pt-6 pb-8 sm:pb-12 px-4 sm:px-10 lg:px-14 select-none bg-transparent text-[#111827]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* ─── Optional Header ───────────────────────────────────── */}
        {showHeader && (
          <div className="mb-8 border-b border-neutral-200/80 pb-6">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                DIRECT ENGINEERING DESK
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-[1.1] mb-2.5">
                Get in Touch with <span className="text-[#FF7A00]">S TEC SECURE</span>
              </h1>
              <p className="text-sm sm:text-base text-[#6B7280] font-normal leading-relaxed">
                Free on-site camera surveys, wiring blueprints, and transparent quotations across Tamil Nadu.
              </p>
            </div>
          </div>
        )}

        {/* ─── Unified Two-Column Bento Layout (Equal Height) ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column (5 cols): Unified Executive Contact Card */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A00]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-700">
                    OFFICE OPEN TODAY
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                  Headquarters &amp; Support
                </h2>
              </div>

              {/* 2 Fast Action Buttons */}
              <div className="space-y-2.5">
                {/* Call */}
                <a
                  href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                  className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-[#FFF7ED] border border-neutral-200/80 hover:border-[#FFEDD5] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FF7A00] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">
                        DIRECT CALL
                      </span>
                      <span className="text-sm font-black text-[#111827] group-hover:text-[#FF7A00] transition-colors truncate block">
                        {COMPANY_CONTACT.phone}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all" />
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20STEC%20Secure%2C%20I%20would%20like%20to%20consult%20regarding%20security%20installation.`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-emerald-50/80 border border-neutral-200/80 hover:border-emerald-200 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <WhatsAppIcon className="w-5 h-5 fill-white" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">
                        WHATSAPP CHAT
                      </span>
                      <span className="text-sm font-black text-[#111827] group-hover:text-[#25D366] transition-colors truncate block">
                        Chat with Engineers
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* Office Details */}
              <div className="space-y-3 pt-3 border-t border-neutral-100 text-xs">
                <div className="flex items-start gap-3 text-neutral-700">
                  <MapPin className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111827]">14/2 Thundukadu Street</span>, Veerappan Chatram, Erode - 638004
                  </div>
                </div>

                <div className="flex items-center gap-3 text-neutral-700">
                  <Mail className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                  <span>stecsecure@gmail.com</span>
                </div>

                <div className="flex items-center gap-3 text-neutral-700">
                  <Clock className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                  <span>Mon – Sat: 08:00 AM – 08:00 PM</span>
                </div>
              </div>

              {/* Seamless Embedded Google Map */}
              <div className="rounded-2xl border border-neutral-200 overflow-hidden relative shadow-inner">
                <div className="h-36 w-full relative">
                  <iframe
                    title="S TEC SECURE Office Location"
                    src="https://maps.google.com/maps?q=14/2+THUNDUKADU+STREET+VERRAPPAN+CHATRAM+ERODE-638004&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Floating Map Chip */}
                  <a
                    href="https://maps.google.com/maps?q=14/2+THUNDUKADU+STREET+VERRAPPAN+CHATRAM+ERODE-638004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg border border-neutral-200 text-[11px] font-bold text-[#FF7A00] hover:underline flex items-center gap-1 shadow-sm"
                  >
                    <span>Open Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Brochure Link Footer */}
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <a
                href={COMPANY_CONTACT.brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 rounded-xl bg-neutral-50 hover:bg-[#FFF7ED] text-neutral-700 hover:text-[#C25E00] border border-neutral-200 hover:border-[#FFEDD5] transition-all flex items-center justify-between text-xs font-bold cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF7A00]" />
                  Download Company Brochure (PDF)
                </span>
                <Download className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column (7 cols): Clean Survey & Quote Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                    Request a Free Site Survey
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Get exact camera counts, wiring blueprint, and itemized quotation.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> FREE VISIT
                </span>
              </div>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-500 mb-1.5">
                      Your Name <span className="text-[#FF7A00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-[#111827] placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-500 mb-1.5">
                      Mobile / WhatsApp Number <span className="text-[#FF7A00]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-neutral-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-[#111827] placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/15 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Property Type Selector */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-500 mb-1.5">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PROPERTY_TYPES.map((pt) => {
                      const IconComp = pt.icon;
                      const isSelected = propertyType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setPropertyType(pt.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FFF7ED] border-[#FF7A00] text-[#C25E00] shadow-sm"
                              : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-white"
                          }`}
                        >
                          <IconComp
                            className={`w-3.5 h-3.5 ${
                              isSelected ? "text-[#FF7A00]" : "text-neutral-400"
                            }`}
                          />
                          <span className="text-center text-[11px] truncate w-full">{pt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 3: Services (Balanced 3-Column Grid) */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-500 mb-1.5">
                    Select Services Needed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICE_OPTIONS.map((svc) => {
                      const isChecked = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isChecked
                              ? "bg-[#FF7A00] border-[#FF7A00] text-white shadow-sm"
                              : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-white"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                              isChecked ? "text-white" : "text-neutral-400"
                            }`}
                          />
                          <span className="truncate">{svc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: Notes & Location */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-500 mb-1.5">
                    Location &amp; Requirements (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. 4 cameras for house in Erode with remote mobile viewing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-[#111827] placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/15 transition-all"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-extrabold text-sm tracking-wide shadow-[0_8px_25px_rgba(255,122,0,0.35)] hover:shadow-[0_12px_30px_rgba(255,122,0,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Send Survey Request via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom Trust Line (Balanced 3 Columns) */}
            <div className="pt-4 mt-5 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-neutral-500">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-neutral-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00] flex-shrink-0" />
                <span>100% Free Site Survey</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-neutral-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Genuine Hardware Warranty</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-1.5 text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00] flex-shrink-0" />
                <span>Erode, Salem &amp; Coimbatore</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;
