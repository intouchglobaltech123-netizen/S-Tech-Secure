import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { ContactSection } from "@/components/sections/ContactSection";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  stecLocalBusinessJsonLd,
  createBreadcrumbJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

const contactTitle = "Contact S Tec Secure | Free Security Site Survey in Salem, Erode & Coimbatore";
const contactDescription =
  "Schedule your free on-site security walkthrough with S Tec Secure engineers. Transparent pricing on CCTV, smart home automation & access systems across Tamil Nadu. Call +91 96002 52605.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contactTitle },
      { name: "description", content: contactDescription },
      {
        name: "keywords",
        content:
          "Contact S Tec Secure, CCTV quote Salem, security site survey Erode, CCTV dealers phone number Coimbatore, CCTV installation near me, CCTV Tamil Nadu",
      },
      { name: "author", content: "S Tec Secure" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: contactTitle },
      { property: "og:description", content: contactDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${STEC_SITE_URL}/contact` },
      { property: "og:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
      { property: "og:site_name", content: "S Tec Secure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: contactTitle },
      { name: "twitter:description", content: contactDescription },
      { name: "twitter:image", content: `${STEC_SITE_URL}/services/cctv.jpg` },
    ],
    links: [{ rel: "canonical", href: `${STEC_SITE_URL}/contact` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(stecLocalBusinessJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          createBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Contact Us & Free Survey", url: "/contact" },
          ])
        ),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col justify-between overflow-x-hidden relative">
      <SiteNav revealed={true} />
      
      {/* Fits in one screen on laptops: nav height + heading + two cards */}
      <main className="relative pt-24 sm:pt-[104px] lg:pt-[88px] lg:[@media(min-height:860px)]:pt-24 pb-8 lg:pb-4 lg:[@media(min-height:860px)]:pb-8 flex-1 flex flex-col justify-center lg:min-h-[100svh]">
        <CyberMeshBackground />

        <div className="relative z-10 w-full">
          <ContactSection showHeader />
        </div>
      </main>
    </div>
  );
}

export default ContactPage;
