import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { Faq } from "@/components/sections/Faq";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  stecLocalBusinessJsonLd,
  createBreadcrumbJsonLd,
  faqJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

const aboutTitle = "About S Tec Secure | Premier Surveillance & Smart Automation Firm Tamil Nadu";
const aboutDescription =
  "Learn about S Tec Secure, Tamil Nadu's certified surveillance engineering firm delivering 4K CCTV systems, intelligent IoT home automation, and perimeter security across Salem, Erode & Coimbatore.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: aboutTitle },
      { name: "description", content: aboutDescription },
      {
        name: "keywords",
        content:
          "About S Tec Secure, CCTV installation company Salem, surveillance engineers Erode, smart home automation team Tamil Nadu, security systems Coimbatore",
      },
      { name: "author", content: "S Tec Secure" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: aboutTitle },
      { property: "og:description", content: aboutDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${STEC_SITE_URL}/about` },
      { property: "og:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
      { property: "og:site_name", content: "S Tec Secure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: aboutTitle },
      { name: "twitter:description", content: aboutDescription },
      { name: "twitter:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
    ],
    links: [{ rel: "canonical", href: `${STEC_SITE_URL}/about` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(stecLocalBusinessJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          createBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about" },
          ])
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <SiteNav revealed={true} />
      <main id="main-content" className="relative pt-20 sm:pt-24 min-h-screen">
        <CyberMeshBackground />
        <div className="relative z-10">
          <AboutSection />
          <Faq />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default AboutPage;
