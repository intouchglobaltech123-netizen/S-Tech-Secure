import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { Faq } from "@/components/sections/Faq";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";

const aboutTitle = "About STEC Secure | Premier Security & Automation Experts in Tamil Nadu";
const aboutDescription =
  "Learn about STEC Secure, Tamil Nadu's trusted surveillance and smart automation engineering team. Over 6 years of expertise, 500+ installations, and certified brand hardware.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: aboutTitle },
      { name: "description", content: aboutDescription },
      { property: "og:title", content: aboutTitle },
      { property: "og:description", content: aboutDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stec-secure.vercel.app/about" },
      { property: "og:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: aboutTitle },
      { name: "twitter:description", content: aboutDescription },
      { name: "twitter:image", content: "https://stec-secure.vercel.app/services/cctv.jpg" },
      {
        name: "keywords",
        content:
          "About STEC Secure, CCTV installation company Erode, surveillance engineers Tamil Nadu, home automation team Erode",
      },
    ],
    links: [{ rel: "canonical", href: "https://stec-secure.vercel.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <SiteNav revealed={true} />
      <main className="relative pt-24 min-h-screen">
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

