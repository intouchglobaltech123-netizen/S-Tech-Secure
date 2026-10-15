const PHONE = "+91 96002 52605";
const PHONE_HREF = "tel:+919600252605";
const WHATSAPP = `https://wa.me/919600252605?text=${encodeURIComponent(
  "Hi S TEC SECURE, I would like to book a free site survey."
)}`;

const steps = [
  {
    title: "Free site survey",
    description: "We visit your property, check entries and blind spots, and listen to what you want to protect.",
  },
  {
    title: "Clear quote",
    description: "You get a camera and equipment plan with an itemised price. No surprises later.",
  },
  {
    title: "Neat installation",
    description: "Our engineers route cables cleanly, mount and focus the cameras and set up recording.",
  },
  {
    title: "Handover & support",
    description: "We set up the app on your phones, show you how to use it and stay on call for service.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative w-full py-14 sm:py-24" aria-labelledby="how-heading" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#FF7A00]">How it works</p>
          <h2 id="how-heading" className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
            From first visit to full protection
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">Four simple steps, handled by one team.</p>
        </div>

        {/* Steps with a connecting line */}
        <ol className="relative mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          <span aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-neutral-200 lg:block" />
          <span aria-hidden className="absolute left-5 top-5 bottom-16 w-px bg-neutral-200 sm:hidden" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 sm:block">
              <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7A00] text-sm font-bold text-white ring-4 sm:ring-8 ring-[#F8FAFC]">
                {i + 1}
              </span>
              <div>
                <h3 className="mt-2 sm:mt-5 text-lg font-bold text-[#111827]">{step.title}</h3>
                <p className="mt-1 sm:mt-2 text-sm leading-relaxed text-neutral-600 lg:pr-4">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Call to action */}
        <div className="mt-10 sm:mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl bg-[#0D1C34] px-6 py-8 sm:px-10 text-white">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Book your free site survey</h3>
            <p className="mt-1.5 text-sm text-white/65">
              Erode, Salem, Coimbatore and nearby towns. Tell us about your property and we will plan a visit.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF8F1F] transition-colors"
            >
              Book on WhatsApp
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
