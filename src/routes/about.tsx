import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  stecLocalBusinessJsonLd,
  createBreadcrumbJsonLd,
  faqJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

const aboutTitle = "About S TEC SECURE | CCTV & Security Company in Erode";
const aboutDescription =
  "S TEC SECURE has installed CCTV, smart home and security systems across Tamil Nadu since 2021. Meet our CEO and see our mission and the areas we serve.";

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
      { property: "og:image", content: `${STEC_SITE_URL}/ceo.png` },
      { property: "og:image:alt", content: "Mr. Santhosh, CEO of S TEC SECURE" },
      { property: "og:site_name", content: "S Tec Secure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: aboutTitle },
      { name: "twitter:description", content: aboutDescription },
      { name: "twitter:image", content: `${STEC_SITE_URL}/ceo.png` },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: aboutTitle,
          description: aboutDescription,
          url: `${STEC_SITE_URL}/about`,
          mainEntity: { "@type": "Organization", name: "S Tec Secure", foundingDate: "2021", founder: { "@type": "Person", name: "Santhosh", jobTitle: "CEO" } },
        }),
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
      <main id="main-content" className="relative min-h-screen">
        <CyberMeshBackground />
        <div className="relative z-10 pt-24 sm:pt-[104px] lg:pt-28 pb-20">
          <AboutSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default AboutPage;
