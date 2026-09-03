import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/navigation/SiteNav";
import { ContactSection } from "@/components/sections/ContactSection";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";

const contactTitle = "Contact STEC Secure | Free Security Site Survey in Erode & Tamil Nadu";
const contactDescription =
  "Contact STEC Secure for free CCTV site surveys, customized security system quotations, and immediate consultation for homes, villas, commercial spaces, and factories.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contactTitle },
      { name: "description", content: contactDescription },
      { property: "og:title", content: contactTitle },
      { property: "og:description", content: contactDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stecsecure.com/contact" },
      { property: "og:image", content: "https://stecsecure.com/services/cctv.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: contactTitle },
      { name: "twitter:description", content: contactDescription },
      { name: "twitter:image", content: "https://stecsecure.com/services/cctv.jpg" },
      {
        name: "keywords",
        content:
          "Contact STEC Secure, CCTV quote Erode, security site survey, CCTV dealers phone number Erode, CCTV installation near me",
      },
    ],
    links: [{ rel: "canonical", href: "https://stecsecure.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col justify-between overflow-x-hidden">
      <SiteNav revealed={true} />
      <main className="relative pt-20 sm:pt-24 flex-1 flex flex-col justify-center">
        <CyberMeshBackground />
        <div className="relative z-10 w-full">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

export default ContactPage;
