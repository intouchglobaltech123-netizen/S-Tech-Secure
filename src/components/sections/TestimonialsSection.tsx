import { useState, useEffect, useRef } from "react";
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

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const starSizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1 text-[#FF7A00]">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${starSizeClass} fill-[#FF7A00] text-[#FF7A00] drop-shadow-sm`}
        />
      ))}
      {/* Half Star */}
      {hasHalf && (
        <div className={`relative ${starSizeClass}`}>
          <Star className={`${starSizeClass} text-neutral-300`} />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star className={`${starSizeClass} fill-[#FF7A00] text-[#FF7A00]`} />
          </div>
        </div>
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${starSizeClass} text-neutral-300`} />
      ))}
      {size === "md" && (
        <span className="font-mono text-xs font-bold text-neutral-400 ml-2">
          {rating.toFixed(1)} / 5.0
        </span>
      )}
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const centerCardRef = useRef<HTMLDivElement | null>(null);

  const total = ALL_TESTIMONIALS.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Continuous gentle rotation every 3 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Interactive 3D Card Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = centerCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild, luxurious tilt angle
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  // Compute Left, Center, and Right card indices for the 3D Arc
  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  const leftItem = ALL_TESTIMONIALS[leftIndex];
  const centerItem = ALL_TESTIMONIALS[activeIndex];
  const rightItem = ALL_TESTIMONIALS[rightIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full pt-[50px] pb-[50px] px-4 sm:px-12 lg:px-[100px] overflow-hidden select-none bg-transparent text-[#111827]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Standardized Section Header */}
        <div className="text-left mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-[#4B5563] text-sm sm:text-base max-w-xl font-medium">
            Real feedback and verified surveillance reviews from residential and commercial clients across Tamil Nadu.
          </p>
        </div>

        {/* 3D Holographic Kinetic Review Chamber */}
        <div
          className="relative w-full py-6 sm:py-10"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF7A00]/8 blur-[160px] rounded-full pointer-events-none" />

          {/* 3-Card 3D Spatial Deck */}
          <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[420px]">
            {/* 1. LEFT CARD (3D Tilted Arc, Click to focus) */}
            <div
              onClick={prevSlide}
              className="hidden lg:block absolute left-4 xl:left-12 z-10 w-[380px] p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-neutral-200/70 shadow-lg cursor-pointer transition-all duration-700 ease-out hover:opacity-100 opacity-60 hover:scale-[0.98]"
              style={{
                transform: "rotateY(18deg) scale(0.9) translateZ(-80px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="mb-4">
                <StarRating rating={leftItem.rating} size="sm" />
              </div>
              <p className="text-xs text-[#6B7280] line-clamp-3 mb-4 italic leading-relaxed">
                "{leftItem.review}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-[#111827]">{leftItem.name}</h4>
                <span className="text-[11px] text-neutral-400 font-mono block">{leftItem.location}</span>
              </div>
            </div>

            {/* 2. CENTER CARD (Active Holographic Kinetic Card with Gyroscopic Tilt) */}
            <div
              ref={centerCardRef}
              onMouseMove={handleMouseMove}
              className="relative z-30 w-full max-w-[620px] rounded-3xl bg-white/95 backdrop-blur-2xl border-2 border-[#FF7A00]/70 shadow-[0_25px_65px_-12px_rgba(255,122,0,0.22)] p-8 sm:p-12 transition-all duration-200 ease-out overflow-hidden"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Surveillance HUD Precision Corner Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FF7A00] pointer-events-none opacity-80" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#FF7A00] pointer-events-none opacity-80" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#FF7A00] pointer-events-none opacity-80" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#FF7A00] pointer-events-none opacity-80" />

              {/* Glowing Holographic Laser Scan Sweep Beam */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent animate-pulse" />

              {/* Dynamic Star Rating */}
              <div className="mb-6">
                <StarRating rating={centerItem.rating} size="md" />
              </div>

              {/* Review Statement */}
              <blockquote className="text-base sm:text-lg text-[#1F2937] font-medium leading-relaxed mb-8 italic">
                "{centerItem.review}"
              </blockquote>

              {/* Bottom Client Identity Banner */}
              <div className="pt-6 border-t border-neutral-100">
                <h3 className="text-lg sm:text-xl font-black text-[#111827] tracking-tight">
                  {centerItem.name}
                </h3>
                <span className="text-xs text-[#FF7A00] font-bold block">
                  {centerItem.role}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono block">
                  📍 {centerItem.location}
                </span>
              </div>
            </div>

            {/* 3. RIGHT CARD (3D Tilted Arc, Click to focus) */}
            <div
              onClick={nextSlide}
              className="hidden lg:block absolute right-4 xl:right-12 z-10 w-[380px] p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-neutral-200/70 shadow-lg cursor-pointer transition-all duration-700 ease-out hover:opacity-100 opacity-60 hover:scale-[0.98]"
              style={{
                transform: "rotateY(-18deg) scale(0.9) translateZ(-80px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="mb-4">
                <StarRating rating={rightItem.rating} size="sm" />
              </div>
              <p className="text-xs text-[#6B7280] line-clamp-3 mb-4 italic leading-relaxed">
                "{rightItem.review}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-[#111827]">{rightItem.name}</h4>
                <span className="text-[11px] text-neutral-400 font-mono block">{rightItem.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
