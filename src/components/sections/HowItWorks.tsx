import { ClipboardCheck, Wrench, ShieldAlert, CheckCircle2, ArrowRight, PhoneCall } from "lucide-react";

const steps = [
  {
    step: "01",
    phase: "PHASE 01",
    icon: ClipboardCheck,
    title: "Free Site Survey",
    subtitle: "Precision blueprint & blind spot audit",
    description:
      "Our senior technician inspects your perimeter, identifies high-risk angles, and architects a custom camera layout tailored to your property and budget.",
    features: [
      "Perimeter & blind-spot audit",
      "Concealed cable route planning",
      "Instant zero-obligation quote",
    ],
    detail: "Done within 24 hours of booking",
    accent: "#FF7A00",
    glowColor: "rgba(255,122,0,0.15)",
  },
  {
    step: "02",
    phase: "PHASE 02",
    icon: Wrench,
    title: "Expert Installation",
    subtitle: "Clean cabling & 4K calibration",
    description:
      "Our trained engineers deploy industrial-grade conduit piping, mount certified 4K/AI cameras, align focal lenses, and configure secure local NVR storage.",
    features: [
      "Concealed aesthetic wiring",
      "4K focal angle calibration",
      "Zero disruption to your routine",
    ],
    detail: "1-Day deployment for most homes",
    accent: "#3B82F6",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    step: "03",
    phase: "PHASE 03",
    icon: ShieldAlert,
    title: "Monitor & Protect",
    subtitle: "Mobile app sync & 24/7 hotline",
    description:
      "We install the remote viewing app on all your family or staff phones, test AI human detection alerts, and provide 24/7 priority support.",
    features: [
      "Live remote phone & PC access",
      "AI instant push intrusion alerts",
      "1-Year warranty & 24/7 hotline",
    ],
    detail: "Lifetime remote troubleshooting",
    accent: "#10B981",
    glowColor: "rgba(16,185,129,0.15)",
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-20 sm:py-28 px-6 sm:px-12 lg:px-[100px] relative"
      aria-label="How STEC Secure installation works"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-tight">
            From First Survey to <span className="text-[#FF7A00]">Complete Protection</span>
          </h2>
          <p className="mt-3 text-[#4B5563] text-sm sm:text-base font-normal max-w-xl">
            A seamless 3-stage deployment crafted to give you total peace of mind with zero guesswork.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="group relative flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(255,122,0,0.12)] hover:border-[#FF7A00]/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Card Top: Icon pod & phase pill */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: `${step.accent}14`,
                        border: `1.5px solid ${step.accent}35`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.accent }} />
                    </div>

                    <span
                      className="text-xs font-mono font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border shadow-xs select-none"
                      style={{
                        backgroundColor: `${step.accent}15`,
                        color: step.accent,
                        borderColor: `${step.accent}35`,
                      }}
                    >
                      {step.phase}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-black text-[#111827] tracking-tight group-hover:text-[#FF7A00] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF7A00] mt-1 mb-3 uppercase tracking-wider">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Key Feature Checkpoints */}
                  <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                    {step.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-[#374151] font-medium">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: step.accent }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Tag */}
                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.accent }}
                    />
                    <span>{step.detail}</span>
                  </div>

                  {/* Arrow Indicator */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex items-center text-neutral-300 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Subtle Hover Glow Strip at the bottom */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Elegant Action Card Below Steps */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#111827] to-[#1F2937] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
              Ready to Secure Your Property?
            </span>
            <h4 className="text-2xl sm:text-3xl font-black mt-1">
              Book Your Free On-Site Survey Today
            </h4>
            <p className="text-neutral-300 text-sm mt-1 max-w-xl">
              Get a custom camera coverage plan and transparent pricing within 24 hours across Erode and surrounding districts.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/919600252605?text=Hi%20STEC%20Secure%2C%20I%20would%20like%20to%20book%20a%20free%20site%20survey."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#FF7A00] hover:bg-[#FF8F00] text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(255,122,0,0.4)] hover:shadow-[0_8px_35px_rgba(255,122,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span>WhatsApp Booking</span>
            </a>
            <a
              href="tel:+919600252605"
              className="hidden md:inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-[#FF7A00]" />
              <span>+91 96002 52605</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
