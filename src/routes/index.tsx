import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { Hero, hasHeroPlayedInSession } from "@/components/hero/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  stecLocalBusinessJsonLd,
  websiteJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

const title = "CCTV & Smart Home Automation in Erode | S Tec Secure";
const description =
  "CCTV cameras, smart home automation, burglar alarms, gates and access control installed by our own engineers in Erode, Salem and Coimbatore. Free site survey.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "CCTV installation Erode, CCTV camera Salem, smart home automation Coimbatore, burglar alarm, video door phone, gate automation, access control, Tamil Nadu" },
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
    ],
  }),
  component: Home,
});

function Home() {
  const [navRevealed, setNavRevealed] = useState(hasHeroPlayedInSession());
  // Phones: show the logo once the opening animation has finished
  const [introOpen, setIntroOpen] = useState(false);

  useEffect(() => {
    if (hasHeroPlayedInSession()) {
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
      <SiteNav revealed={navRevealed} logoOnly={introOpen} />
      <main id="main-content">
        <Hero active={true} onReveal={() => setNavRevealed(true)} onIntroOpen={() => setIntroOpen(true)} />
        {/* Dynamic Animated Cyber Particle Mesh Background */}
        <div className="relative w-full overflow-hidden">
          <CyberMeshBackground />
          <div className="relative z-10">
            {/* Services Showcase */}
            <ServicesSection />
            {/* Why Choose Us */}
            <WhyChooseUs />
            {/* Who We Serve */}
            <WhoWeServe />
            {/* How It Works */}
            <HowItWorks />
            {/* Client Testimonials */}
            <TestimonialsSection />
            <SiteFooter />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
