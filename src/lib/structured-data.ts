import { company, serviceAreas } from "@/data/company";
import { faqs, solutions } from "@/data/site";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  legalName: company.legalName,
  description: company.description,
  url: company.siteUrl,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
  areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
  openingHours: company.hours,
  makesOffer: solutions.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.copy },
  })),
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
