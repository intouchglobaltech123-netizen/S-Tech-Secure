import { useRef } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  review: string;
  initials: string;
  rating: number;
}

const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Karthik R",
    role: "Restaurant Owner",
    location: "Annamar Punjabi Restaurant, Erode",
    review:
      "Best for quick service and pricing. Installed 4K surveillance cameras at Annamar Punjabi restaurant in Erode. Works excellently with crystal clear night vision—best wishes to Santhosh and the entire team!",
    initials: "KR",
    rating: 5.0,
  },
  {
    id: "2",
    name: "Nagarajan Thangavel",
    role: "Enterprise Facility Manager",
    location: "Commercial Complex, Erode",
    review:
      "These guys adjust camera angles perfectly to eliminate blind spots and offer premium service at an affordable price. A truly dynamic, reliable team for CCTV across Erode. Highly recommended!",
    initials: "NT",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Shahid Basha",
    role: "Retail Shop Owner",
    location: "Electronics Bazaar, Erode",
    review:
      "Needed a trustworthy 3rd eye for my retail shop—S-Tec delivered swift, professional CCTV installation with mobile remote monitoring at the best market price. Highly responsive and valuable service.",
    initials: "SB",
    rating: 4.5,
  },
  {
    id: "4",
    name: "Hari Kumar",
    role: "Residential Homeowner",
    location: "Perundurai Road, Erode",
    review:
      "S-Tec Secure provided unmatched quality and pricing. The CCTV installation in Erode was precise, timely, and included both online and offline view setup. Owner Santhosh was gentle and extremely professional.",
    initials: "HK",
    rating: 5.0,
  },
  {
    id: "5",
    name: "Priyadharsini Ramesh",
    role: "Smart Home Client",
    location: "Greenfield Enclave, Erode",
    review:
      "Clear video resolution, excellent two-way audio, and smooth wireless app integration. S-Tec's team professionally installed our security cameras and smart speakers. Superb workmanship!",
    initials: "PR",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Vasudevan K R",
    role: "Commercial Property Manager",
    location: "Salem Bypass Corridor",
    review:
      "Top-Notch Security Installation by S-Tec Secure! Tireless work ethic, meticulous cabling, courteous and punctual crew. I now enjoy complete peace of mind knowing my property is guarded 24/7.",
    initials: "VK",
    rating: 5.0,
  },
  {
    id: "7",
    name: "Raghunathan Kannan",
    role: "Business Director",
    location: "Textile City Hub, Erode",
    review:
      "They fulfilled all our surveillance expectations without a single mistake and offered transparent, budget-friendly pricing. Truly recommend S-Tec for all commercial and home camera projects!",
    initials: "RK",
    rating: 4.0,
  },
  {
    id: "8",
    name: "Santhosh Kumar",
    role: "Logistics Warehouse Head",
    location: "Coimbatore Highway",
    review:
      "S-Tec helped install 8 high-definition cameras within a single day and gave knowledgeable step-by-step guidance for multi-screen smartphone viewing. Flawless execution and support.",
    initials: "SK",
    rating: 5.0,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-neutral-300" />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-4 w-4 fill-[#FF7A00] text-[#FF7A00]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLUListElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-lg text-[#0D1C34] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors cursor-pointer";

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full py-14 sm:py-24"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF7A00]">Testimonials</p>
            <h2 id="testimonials-heading" className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              What our customers say
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Homes, shops and businesses across Erode and nearby towns.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button type="button" aria-label="Previous reviews" onClick={() => scrollByCard(-1)} className={arrowClass}>
              ←
            </button>
            <button type="button" aria-label="Next reviews" onClick={() => scrollByCard(1)} className={arrowClass}>
              →
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="mt-8 sm:mt-10 -mx-6 px-6 scroll-px-6 sm:mx-0 sm:px-0 sm:scroll-px-0 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ALL_TESTIMONIALS.map((t) => (
            <li
              key={t.id}
              className="snap-start flex-shrink-0 w-[85%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 sm:p-7"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">
                &ldquo;{t.review}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0D1C34] text-xs font-bold text-white">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#111827]">{t.name}</p>
                  <p className="truncate text-xs text-neutral-500">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TestimonialsSection;
