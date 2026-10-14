import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { Hero, hasHeroVideoPlayedOnce } from "@/components/hero/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Faq } from "@/components/sections/Faq";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  stecLocalBusinessJsonLd,
  websiteJsonLd,
  faqJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

const title = "S Tec Secure | #1 CCTV Camera Installation & Smart Home Automation in Tamil Nadu";
const description =
  "S Tec Secure provides certified 4K CCTV surveillance, smart IoT home automation, burglar alarms & perimeter gate access across Salem, Erode, Coimbatore & Tamil Nadu. Book a free site survey.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "S Tec Secure, CCTV camera installation, smart home automation, security systems, burglar alarm, Salem, Erode, Coimbatore, Tamil Nadu, 4K CCTV, Hikvision dealer" },
      { name: "author", content: "S Tec Secure" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${STEC_SITE_URL}/` },
      { property: "og:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
      { property: "og:site_name", content: "S Tec Secure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
    ],
    links: [{ rel: "canonical", href: `${STEC_SITE_URL}/` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(stecLocalBusinessJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: Home,
});

function Home() {
  const [navRevealed, setNavRevealed] = useState(hasHeroVideoPlayedOnce);

  useEffect(() => {
    if (hasHeroVideoPlayedOnce) {
      setNavRevealed(true);
      return;
    }
    // If the user scrolls before video completes, reveal nav immediately
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setNavRevealed(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827]">
      <SiteNav revealed={navRevealed} />
      <main id="main-content">
        <Hero active={true} onReveal={() => setNavRevealed(true)} />
        {/* Dynamic Animated Cyber Particle Mesh Background */}
        <div className="relative w-full overflow-hidden">
          <CyberMeshBackground />
          <div className="relative z-10">
            {/* Services Showcase */}
            <ServicesSection />
            {/* Why Choose Us */}
            <WhyChooseUs />
            {/* How It Works */}
            <HowItWorks />
            {/* Client Testimonials */}
            <TestimonialsSection />
            {/* Frequently Asked Questions */}
            <Faq />
            {/* Professional Luxury Footer */}
            <SiteFooter />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
