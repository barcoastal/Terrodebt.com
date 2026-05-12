export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "TerraDebt",
  "legalName": "GRL Recovery LLC",
  "alternateName": "GRL Recovery LLC",
  "url": "https://terradebt.com",
  "logo": "https://terradebt.com/logo.png",
  "description":
    "TerraDebt is a business debt restructure firm covering MCA debt relief, SBA loan modification, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt resolution.",
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
    "url": `https://terradebt.com/articles/${a.slug}`,
    "datePublished": a.publishedAt?.toISOString(),
    "dateModified": (a.updatedAt ?? a.publishedAt ?? new Date()).toISOString(),
    "author": { "@type": "Organization", "name": a.author },
    "publisher": { "@type": "Organization", "name": "TerraDebt", "logo": { "@type": "ImageObject", "url": "https://terradebt.com/logo.png" } },
  };
}
