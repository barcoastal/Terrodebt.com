// JSON-LD building blocks. Validated against schema.org spec.

const SITE = "https://businessdebtinsider.com";
const LOGO = `${SITE}/icon.svg`;

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}#org`,
  name: "Business Debt Insider",
  legalName: "GRL Recovery LLC",
  url: SITE,
  logo: LOGO,
  image: `${SITE}/opengraph-image`,
  description:
    "Strategic financial consulting practice in Fort Lauderdale specializing in business debt restructure for small and mid-sized enterprises across MCA, equipment, vendor, bank, and tax debt.",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "MCA debt relief",
    "Merchant cash advance restructure",
    "Equipment finance restructure",
    "Vendor and supplier debt negotiation",
    "Bank loan and line of credit workouts",
    "Business tax debt resolution",
    "Forensic financial audit",
    "Liquidity engineering",
    "Creditor liaison",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "6301 NW 5th Way, Suite 5100",
    addressLocality: "Fort Lauderdale",
    addressRegion: "FL",
    postalCode: "33309",
    addressCountry: "US",
  },
  email: "hello@businessdebtinsider.com",
  founder: {
    "@type": "Organization",
    name: "GRL Recovery LLC",
  },
};

export type ArticleLdInput = {
  title: string;
  excerpt?: string | null;
  slug: string;
  publishedAt?: Date | null;
  updatedAt?: Date;
  author: string;
  heroImage?: string | null;
};

export function articleLd(a: ArticleLdInput) {
  const url = `${SITE}/insights/${a.slug}`;
  const image = a.heroImage ? (a.heroImage.startsWith("http") ? a.heroImage : `${SITE}${a.heroImage}`) : `${SITE}/opengraph-image`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: a.title,
    description: a.excerpt ?? undefined,
    url,
    image,
    datePublished: (a.publishedAt ?? new Date()).toISOString(),
    dateModified: (a.updatedAt ?? a.publishedAt ?? new Date()).toISOString(),
    author: {
      "@type": "Organization",
      name: a.author || "Business Debt Insider",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Business Debt Insider",
      logo: { "@type": "ImageObject", url: LOGO },
    },
  };
}
