/**
 * SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION.
 *
 * Values marked `CONFIGURE` are placeholders — replace them with the real
 * verified business details. Nothing here is invented marketing copy about
 * certifications, ratings or customer names.
 */

export const company = {
  name: "STEC Secure",
  legalName: "STEC Secure", // CONFIGURE: registered legal entity name
  tagline: "Security, engineered.",
  description:
    "Professional CCTV camera installation, IP surveillance and intelligent security systems for homes, offices, factories and commercial spaces.",
  // CONFIGURE: real phone number
  phone: "+91 96 00 25 26 05",
  phoneHref: "tel:+919600252605",
  email: "stecsecure@gmail.com",
  // CONFIGURE: real street address
  address: {
    street: "14/2 Thundukadu Street, Veerappan Chatram",
    locality: "Erode",
    region: "Tamil Nadu",
    postalCode: "638004",
    country: "IN",
  },
  hours: "Mon – Sat, 8:00 AM – 8:00 PM",
  whatsapp: "https://wa.me/919600252605",
  siteUrl: "https://stecsecure.com",
} as const;

export const addressLine = `${company.address.street}, ${company.address.locality}, ${company.address.region} ${company.address.postalCode}`;

/** CONFIGURE: keep only areas genuinely served. */
export const serviceAreas = [
  { name: "Erode", note: "Base of operations and same-day site surveys" },
  { name: "Perundurai", note: "Industrial and residential installations" },
  { name: "Bhavani", note: "Retail and residential surveillance" },
  { name: "Gobichettipalayam", note: "Farm, godown and shop security" },
  { name: "Namakkal", note: "Poultry, transport and warehouse sites" },
  { name: "Tiruchengode", note: "Workshop and commercial premises" },
  { name: "Salem", note: "Office, showroom and factory projects" },
  { name: "Karur", note: "Textile unit and warehouse coverage" },
  { name: "Coimbatore", note: "Commercial and multi-site networks" },
];

/** CONFIGURE: keep only brands actually supplied/installed. */
export const brands = [
  "Hikvision",
  "CP PLUS",
  "Dahua",
  "Uniview",
  "TP-Link",
  "D-Link",
];
