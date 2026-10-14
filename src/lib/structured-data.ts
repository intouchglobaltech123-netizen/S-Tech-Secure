import { company, serviceAreas } from "@/data/company";
import { faqs, solutions } from "@/data/site";

export const STEC_SITE_URL = "https://stecsecure.com";

/**
 * High-authority LocalBusiness Schema matching official stecsecure.com metadata
 */
export const stecLocalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "S Tec Secure",
  alternateName: "S Tec Secure | Surveillance & Automation Solutions",
  legalName: "S Tec Secure",
  url: STEC_SITE_URL,
  logo: `${STEC_SITE_URL}/logo.png`,
  image: `${STEC_SITE_URL}/services/cctv.jpg`,
  telephone: "+91-9600252605",
  email: "stecsecure@gmail.com",
  slogan: "Your Trusted Partner in Smart Security Solutions",
  foundingDate: "2021",
  founder: { "@type": "Person", name: "Santhosh", jobTitle: "CEO" },
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14/2 Thundukadu Street, Veerappan Chatram",
    addressLocality: "Erode",
    addressRegion: "Tamil Nadu",
    postalCode: "638004",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.341,
    longitude: 77.7172,
  },
  areaServed: [
    { "@type": "City", name: "Salem" },
    { "@type": "City", name: "Erode" },
    { "@type": "City", name: "Coimbatore" },
    { "@type": "City", name: "Tirupur" },
    { "@type": "City", name: "Namakkal" },
    { "@type": "City", name: "Karur" },
    { "@type": "AdministrativeArea", name: "Tamil Nadu" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  // CONFIGURE: add your real social profile URLs here (e.g. Instagram, Facebook, LinkedIn)
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+91-9600252605",
      availableLanguage: ["English", "Tamil"],
      areaServed: ["IN-TN"],
      url: "https://wa.me/919600252605",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Surveillance & Smart Automation Packages",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "CCTV Surveillance Systems",
        itemListElement: [
          { "@type": "Offer", name: "Home Basic (4 Cam HD Package)" },
          { "@type": "Offer", name: "Home Pro (6 Cam 5MP AI ColorVu)" },
          { "@type": "Offer", name: "Commercial 4K IP PoE Suite (8-32 Cams)" },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Smart Home Automation",
        itemListElement: [
          { "@type": "Offer", name: "Starter: Smart Lighting & Fans" },
          { "@type": "Offer", name: "Comfort: Lighting, Curtains & Climate" },
          { "@type": "Offer", name: "Elite: Whole-Home Voice & Sensor Scenes" },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Perimeter Security & Access Control",
        itemListElement: [
          { "@type": "Offer", name: "Biometric Face & Fingerprint Access" },
          { "@type": "Offer", name: "Video Door Phones with Mobile App" },
          { "@type": "Offer", name: "Automatic Sliding & Swing Gates" },
          { "@type": "Offer", name: "Intrusion Burglar Alarms with GSM Dialer" },
          { "@type": "Offer", name: "Automatic Boom Barriers" },
        ],
      },
    ],
  },
};

/**
 * WebSite schema with Sitelinks Search
 */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: STEC_SITE_URL,
  name: "S Tec Secure",
  alternateName: "STEC Secure Surveillance & Automation",
  potentialAction: {
    "@type": "SearchAction",
    target: `${STEC_SITE_URL}/services?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/**
 * FAQ Schema generator
 */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * BreadcrumbList Schema generator for nested pages
 */
export function createBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${STEC_SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Service Detail Schema generator
 */
export function createServiceJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "S Tec Secure",
      telephone: "+91-9600252605",
      url: STEC_SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Salem" },
      { "@type": "City", name: "Erode" },
      { "@type": "City", name: "Coimbatore" },
      { "@type": "AdministrativeArea", name: "Tamil Nadu" },
    ],
    url: url.startsWith("http") ? url : `${STEC_SITE_URL}${url}`,
    image: image || `${STEC_SITE_URL}/services/cctv.jpg`,
  };
}

/**
 * Article Schema generator for blog
 */
export function createArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: url.startsWith("http") ? url : `${STEC_SITE_URL}${url}`,
    image: image || `${STEC_SITE_URL}/blog/home-cctv.jpg`,
    datePublished: datePublished || "2026-01-15T09:00:00+05:30",
    dateModified: "2026-03-01T10:00:00+05:30",
    author: {
      "@type": "Organization",
      name: "S Tec Secure Engineering Team",
      url: STEC_SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "S Tec Secure",
      logo: {
        "@type": "ImageObject",
        url: `${STEC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${STEC_SITE_URL}${url}`,
    },
  };
}

// Retain backwards compatibility
export const localBusinessJsonLd = stecLocalBusinessJsonLd;
