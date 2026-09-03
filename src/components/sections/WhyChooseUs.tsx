import { ShieldCheck, Wrench, Clock, BadgeCheck, PhoneCall, Leaf } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Certified Security Engineers",
    description:
      "Our team holds industry certifications and manufacturer training from Hikvision, Dahua, and CP Plus — ensuring expert, reliable installations every time.",
    accent: "#FF7A00",
  },
  {
    icon: Wrench,
    title: "Free Site Survey & Quote",
    description:
      "We visit your premises, design a custom camera layout and cabling plan, then provide a fully transparent, no-obligation quote — at zero cost to you.",
    accent: "#3B82F6",
  },
  {
    icon: Clock,
    title: "24/7 After-Sales Support",
    description:
      "Security never sleeps, and neither do we. Reach our technical team via WhatsApp, call, or email any hour for remote diagnostics or on-site assistance.",
    accent: "#10B981",
  },
  {
    icon: BadgeCheck,
    title: "1-Year Installation Warranty",
    description:
      "Every installation comes with a 12-month comprehensive warranty covering equipment defects, cabling faults, and workmanship issues.",
    accent: "#8B5CF6",
  },
  {
    icon: PhoneCall,
    title: "Rapid Response Time",
    description:
      "Our Erode-based service team guarantees a 4-hour response window for urgent service calls, minimizing downtime for your property.",
    accent: "#F59E0B",
  },
  {
    icon: Leaf,
    title: "Energy-Efficient Systems",
    description:
      "We spec AI-powered PoE cameras and smart NVRs that draw minimal power — cutting electricity costs while delivering superior 4K AI detection.",
    accent: "#06B6D4",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="py-16 sm:py-24 px-6 sm:px-12 lg:px-[100px] relative overflow-hidden"
      aria-label="Why choose STEC Secure"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            Why Thousands Choose <span className="text-[#FF7A00]">Us</span>
          </h2>
          <p className="mt-3 text-[#4B5563] text-sm sm:text-base font-normal max-w-xl">
            We don't just install cameras — we engineer complete security ecosystems built for lasting peace of mind.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group relative p-8 rounded-3xl bg-white border border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_45px_rgba(255,122,0,0.12)] hover:border-[#FF7A00]/25 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                  style={{ backgroundColor: `${reason.accent}15`, border: `1px solid ${reason.accent}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: reason.accent }} />
                </div>

                {/* Text */}
                <h3 className="text-lg font-black text-[#111827] mb-2 leading-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {reason.description}
                </p>

                {/* Bottom accent bar on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-[#FF7A00] rounded-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
