import { FaqList } from "@/components/ui/FaqList";

/** Home page FAQs. The home page FAQPage JSON-LD is built from this same list, so they always match. */
export const HOME_FAQS = [
  {
    q: "How many CCTV cameras do I need for my home or business?",
    a: "It depends on the size and layout of your property. A typical house needs 4 to 6 cameras to cover the gate, driveway, entrances and main hall, while shops, offices and warehouses usually need 4 to 16. We work out the exact number and placement during a free site survey.",
  },
  {
    q: "Is the site survey really free?",
    a: "Yes. We visit your property, check entry points, blind spots and camera angles, and then give you an itemised quote. There is no charge for the visit and no obligation to go ahead.",
  },
  {
    q: "Do the cameras come with a warranty?",
    a: "Yes. Cameras and recorders carry a 1 to 3 year manufacturer warranty, depending on the brand and model. We tell you the exact warranty for each item in your quote.",
  },
  {
    q: "Can I watch my cameras on my phone?",
    a: "Yes. At handover we set up the camera app on your Android or iPhone and on your computer, so you can see live video, play back recordings and get motion alerts from anywhere.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in Erode and install and service systems in Erode, Perundurai, Bhavani, Gobichettipalayam, Tiruchengode, Namakkal, Salem, Karur and Coimbatore.",
  },
  {
    q: "Do you repair or upgrade existing CCTV systems?",
    a: "Yes. We handle maintenance, fault repair, camera replacement and upgrades, including systems that were installed by someone else.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full py-20 sm:py-24"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-[#FF7A00]">FAQ</p>
            <h2 id="faq-heading" className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Quick answers about CCTV installation, warranty, phone viewing and site surveys.
            </p>

            <div className="mt-8 rounded-3xl bg-[#0D1C34] p-6 text-white">
              <p className="text-lg font-bold">Still have a question?</p>
              <p className="mt-1.5 text-sm text-white/65">Message us on WhatsApp and an engineer will answer.</p>
              <a
                href={`https://wa.me/919600252605?text=${encodeURIComponent("Hi S TEC SECURE, I have a question.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF8F1F] transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqList items={HOME_FAQS} idPrefix="home-faq" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
