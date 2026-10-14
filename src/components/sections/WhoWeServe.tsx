import { Link } from "@tanstack/react-router";

// Sectors and use cases come from the S TEC SECURE brochure; each links to the most relevant service.
const SECTORS = [
  {
    title: "Homes & villas",
    copy: "CCTV, video door phones and alarms that cover every gate and entrance.",
    serviceId: "cctv",
    service: "CCTV",
  },
  {
    title: "Apartments",
    copy: "See who is at the gate from your flat and talk to security on the intercom.",
    serviceId: "video-door-phone",
    service: "Video door phones",
  },
  {
    title: "Shops & showrooms",
    copy: "Cameras on the counter and a loud alarm that guards your stock after hours.",
    serviceId: "burglar-alarm",
    service: "Burglar alarms",
  },
  {
    title: "Offices",
    copy: "Card and biometric entry so only the right people reach the right rooms.",
    serviceId: "access-control",
    service: "Access control",
  },
  {
    title: "Factories & warehouses",
    copy: "Boom barriers, automatic gates and wide-area CCTV for gates and stores.",
    serviceId: "boom-barriers",
    service: "Boom barriers",
  },
  {
    title: "Hospitals & clinics",
    copy: "Nurse call systems that let patients reach staff from the bed or bathroom.",
    serviceId: "nurse-calling",
    service: "Nurse call",
  },
];

export function WhoWeServe() {
  return (
    <section className="relative w-full py-12 sm:py-16" aria-labelledby="serve-heading" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-3xl bg-[#0D1C34] px-6 py-10 sm:px-10 sm:py-12 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#FF7A00]">Who we serve</p>
              <h2 id="serve-heading" className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight leading-tight">
                Built for homes and businesses
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/60 md:text-right">
              Pick your property type to see the service most people like you start with.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10">
            {SECTORS.map((sector) => (
              <li key={sector.title} className="bg-[#0D1C34]">
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: sector.serviceId }}
                  className="group flex h-full flex-col p-6 hover:bg-white/[0.04] transition-colors"
                >
                  <h3 className="text-lg font-bold">{sector.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{sector.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A00]">
                    {sector.service}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhoWeServe;
