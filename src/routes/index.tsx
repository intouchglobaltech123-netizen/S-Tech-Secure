import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Splash } from "@/components/splash/Splash";
import { SiteNav } from "@/components/navigation/SiteNav";
import { Hero } from "@/components/hero/Hero";
import { SecurityIntro } from "@/components/sections/SecurityIntro";
import { Solutions } from "@/components/sections/Solutions";
import { Products } from "@/components/sections/Products";
import { AiIntelligence } from "@/components/sections/AiIntelligence";
import { Coverage } from "@/components/sections/Coverage";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Brands } from "@/components/sections/Brands";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";
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
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "CCTV camera installation, security camera installation, IP camera installation, CCTV dealers Erode, AI CCTV camera, PTZ camera installation, CCTV maintenance",
      },
    ],
    links: [{ rel: "canonical", href: "https://stecsecure.example/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: Home,
});

function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <Splash onDone={() => setEntered(true)} />
      <SiteNav revealed={entered} />
      <main>
        <Hero active={entered} />
        <SecurityIntro />
        <Solutions />
        <Products />
        <AiIntelligence />
        <Coverage />
        <Industries />
        <WhyUs />
        <Process />
        <Brands />
        <Projects />
        <Testimonials />
        <ServiceAreas />
        <Faq />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
