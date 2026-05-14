export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Freshline Advisory",
  "legalName": "GRL Recovery LLC",
  "alternateName": "GRL Recovery LLC",
  "url": "https://freshlineadvisory.com",
  "logo": "https://freshlineadvisory.com/logo.png",
  "description":
    "Freshline Advisory is a business debt restructure company covering MCA debt relief, SBA loan modification, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt resolution.",
  "areaServed": { "@type": "Country", "name": "United States" },
  "serviceType": [
    "MCA Debt Relief",
    "SBA Loan Modification",
    "Equipment Finance Restructure",
    "Vendor and Supplier Debt Negotiation",
    "Bank Loan and Line of Credit Workouts",
    "Business Tax Debt Resolution",
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6301 NW 5th Way 5100",
    "addressLocality": "Fort Lauderdale",
    "addressRegion": "FL",
    "postalCode": "33309",
    "addressCountry": "US",
  },
};

export type ArticleLdInput = {
  title: string;
  excerpt?: string | null;
  slug: string;
  publishedAt?: Date | null;
  updatedAt?: Date;
  author: string;
};

export function articleLd(a: ArticleLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": a.title,
    "description": a.excerpt ?? undefined,
    "url": `https://freshlineadvisory.com/insights/${a.slug}`,
    "datePublished": a.publishedAt?.toISOString(),
    "dateModified": (a.updatedAt ?? a.publishedAt ?? new Date()).toISOString(),
    "author": { "@type": "Organization", "name": a.author },
    "publisher": { "@type": "Organization", "name": "Freshline Advisory", "logo": { "@type": "ImageObject", "url": "https://freshlineadvisory.com/logo.png" } },
  };
}
