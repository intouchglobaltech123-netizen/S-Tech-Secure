"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Shield,
  Sparkles,
  Smartphone,
  Layers,
  Plus,
  Minus,
} from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  category: string;
  icon: typeof Shield;
  highlight: string;
}

const FAQS: FaqItem[] = [
  {
    q: "How many CCTV cameras do I need for my home or business?",
    a: "It depends on the size and layout of your premises. For a typical 3BHK home, 4–6 cameras (entry/exit gates, driveway, perimeter, main hall) provide comprehensive security. For commercial shops, offices, or warehouses, 4–16 cameras are standard. We provide a 100% free on-site survey to map blind spots and suggest the optimal camera count.",
    category: "PLANNING & SETUP",
    icon: Layers,
    highlight: "4–6 cameras for 3BHK homes; customized layouts for commercial sites",
  },
  {
    q: "Is there a free consultation or site survey available?",
    a: "Yes! We offer a completely free, zero-obligation site survey across Tamil Nadu. Our certified technician will visit your location, assess risk areas and camera angles, demonstrate sample live footage, and provide an itemized quote with no hidden charges.",
    category: "FREE SITE SURVEY",
    icon: CheckCircle2,
    highlight: "100% Free on-site survey with zero cost and zero obligation",
  },
  {
    q: "Do you provide a warranty on cameras and installation work?",
    a: "Yes, all cameras and DVR/NVR recording units carry a 1 to 3 year official manufacturer replacement warranty. In addition, STEC Secure provides a 1-year service warranty covering our cabling and installation craftsmanship, with same-day engineer dispatch for critical issues.",
    category: "WARRANTY & ASSURANCE",
    icon: Shield,
    highlight: "1–3 Year hardware warranty + 1 Year free service warranty",
  },
  {
    q: "Can I view my cameras remotely on my phone, tablet, or laptop?",
    a: "Absolutely. Every system we install is configured with encrypted mobile and PC streaming apps (Hik-Connect, DMSS, EZVIZ, etc.) on iOS, Android, and Windows. You get real-time HD video, instant motion alerts, and two-way audio from anywhere in the world.",
    category: "REMOTE VIEWING",
    icon: Smartphone,
    highlight: "Live HD streaming on Android & iOS with instant motion alerts",
  },
  {
    q: "What camera brands do you supply and install?",
    a: "We only supply genuine, brand-authorized products from world-leading surveillance manufacturers including Hikvision, Dahua, CP Plus, Honeywell, Bosch, and Godrej. Every unit comes with original serial numbers and official manufacturer warranties.",
    category: "GENUINE BRANDS",
    icon: Sparkles,
    highlight: "Authorized Hikvision, Dahua, CP Plus, Honeywell & Bosch",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-20 sm:py-28 overflow-hidden bg-transparent"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Left-Aligned Section Header (Shifted 120px Left) */}
        <div className="mb-12 sm:mb-16 relative sm:-translate-x-[120px]">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
              TRANSPARENT ANSWERS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-[1.15]">
            Frequently Asked <span className="text-[#FF7A00]">Questions</span>
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-[#4B5563] font-normal leading-relaxed max-w-2xl">
            Everything you need to know about our CCTV security camera installations, warranties, remote viewing, and on-site surveys.
          </p>
        </div>

        {/* Enhanced Line-by-Line Accordion Stack */}
        <div className="space-y-4 mb-14">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const IconComp = faq.icon;

            return (
              <div
                key={faq.q}
                className={`group rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#FF7A00] shadow-[0_16px_40px_rgba(255,122,0,0.12)] ring-2 ring-[#FF7A00]/15"
                    : "bg-white/85 hover:bg-white border-neutral-200/90 hover:border-neutral-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Number / Icon Badge with Hover Transformation */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-mono font-black text-xs sm:text-sm transition-all duration-300 shadow-sm ${
                        isOpen
                          ? "bg-gradient-to-br from-[#FF7A00] to-[#E66E00] text-white shadow-[0_6px_20px_rgba(255,122,0,0.35)] scale-105"
                          : "bg-[#FFF7ED] text-[#FF7A00] border border-[#FFEDD5] group-hover:bg-[#FF7A00] group-hover:text-white group-hover:scale-105"
                      }`}
                    >
                      <IconComp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF7A00]">
                          {faq.category}
                        </span>
                      </div>
                      <h3
                        className={`text-base sm:text-lg lg:text-xl font-extrabold tracking-tight leading-snug transition-colors duration-200 ${
                          isOpen
                            ? "text-[#111827]"
                            : "text-[#1F2937] group-hover:text-[#FF7A00]"
                        }`}
                      >
                        {faq.q}
                      </h3>
                    </div>
                  </div>

                  {/* Expand / Collapse Pill Indicator */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FF7A00] text-white shadow-md rotate-180 scale-105"
                        : "bg-neutral-100 text-neutral-500 group-hover:bg-[#FFF7ED] group-hover:text-[#FF7A00] group-hover:border group-hover:border-[#FFEDD5]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </div>
                </button>

                {/* Animated Dropdown Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-7 pt-1">
                      <div className="pl-4 sm:pl-6 border-l-2 border-[#FF7A00] space-y-4">
                        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
                          {faq.a}
                        </p>

                        {/* Highlight Capsule */}
                        <div className="pt-2">
                          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#C25E00]">
                            <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                            <span>{faq.highlight}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
