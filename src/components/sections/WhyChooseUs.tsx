// Every point below is backed by the brochure or the site's own service details.
const reasons = [
  {
    title: "Free site survey",
    description: "We visit, check entries and blind spots, and suggest the right number of cameras and where to put them.",
  },
  {
    title: "Clear, itemised quote",
    description: "You see exactly what is being installed and why, so you pay only for coverage that adds value.",
  },
  {
    title: "Our own engineers",
    description: "Installation and servicing are done by the S TEC SECURE team from our Erode office, not passed on to others.",
  },
  {
    title: "Neat, concealed wiring",
    description: "Cables are routed cleanly and cameras are focused for the best view of every entry point.",
  },
  {
    title: "Phone viewing set up",
    description: "We set up the app on your phones at handover and show you live view, playback and alerts.",
  },
  {
    title: "Service and repairs",
    description: "Maintenance, repairs and upgrades, including CCTV systems that were installed by others.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative w-full py-20 sm:py-24" aria-labelledby="why-heading" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: heading + highlight */}
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-[#FF7A00]">Why choose us</p>
            <h2 id="why-heading" className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              A local team you can call back
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Since 2021 we have planned, installed and serviced security systems for homes, shops, offices and
              factories around Erode.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
              <div className="bg-white p-5">
                <p className="text-2xl font-bold text-[#0D1C34]">2021</p>
                <p className="mt-1 text-xs font-medium text-neutral-500">Started in Erode</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-2xl font-bold text-[#0D1C34]">1–3 yr</p>
                <p className="mt-1 text-xs font-medium text-neutral-500">Manufacturer warranty</p>
              </div>
            </div>
          </div>

          {/* Right: numbered reasons */}
          <ol className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <li
                key={reason.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 hover:border-[#FF7A00]/40 hover:shadow-[0_10px_30px_rgba(13,28,52,0.06)] transition-all duration-300"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold tabular-nums text-[#FF7A00]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-bold text-[#111827]">{reason.title}</h3>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-neutral-600">{reason.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
