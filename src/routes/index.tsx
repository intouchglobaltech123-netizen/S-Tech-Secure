import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { Hero } from "@/components/hero/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/structured-data";

const title = "CCTV Camera Installation & Security Systems in Erode | STEC Secure";
const description =
  "Professional CCTV camera installation, IP surveillance, AI video analytics and access control in Erode, Salem, Namakkal and nearby areas. Free site survey and coverage plan.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stec-secure.vercel.app/" },
      { property: "og:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      {
        name: "keywords",
        content:
          "CCTV camera installation, security camera installation, IP camera installation, CCTV dealers Erode, AI CCTV camera, PTZ camera installation, CCTV maintenance",
      },
    ],
    links: [{ rel: "canonical", href: "https://stec-secure.vercel.app/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: Home,
});

import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";

function Home() {
  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827]">
      <SiteNav />
      <main>
        <Hero active={true} />
        {/* Dynamic Animated Cyber Particle Mesh & IoT Neural Network Background */}
        <div className="relative w-full overflow-hidden">
          <CyberMeshBackground />
          <div className="relative z-10">
            {/* Services Showcase (Explore Our Services) */}
            <ServicesSection />
            {/* Why Choose Us */}
            <WhyChooseUs />
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
