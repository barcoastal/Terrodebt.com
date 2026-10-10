import { hasStateGuide } from "@/lib/state-guides";
import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { STATES } from "@/lib/states";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { SERVICES } from "@/lib/service-content";
import { REVIEW_FIRMS } from "@/lib/reviews-content";
import { LENDERS, LENDER_REVIEW_DATE } from "@/lib/lender-content";

export const dynamic = "force-dynamic";

const BASE = "https://businessdebtinsider.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "", "/editorial-policy", "/about", "/contact", "/trust", "/privacy", "/terms", "/disclosure",
    "/insights", "/industries", "/programs", "/services", "/reviews", "/glossary",
    "/tools", "/tools/apr-calculator", "/tools/stack-calculator", "/tools/health-check", "/calculator",
    "/programs/settlement", "/programs/restructure", "/programs/legal-defense",
    "/mca-defense", "/lenders",
  ];
  // Only emit lastModified when there is an actual content-update timestamp.
  // Request time is not the last time a static page was edited.
  const staticUrls = staticPaths.map((p) => ({ url: `${BASE}${p}` }));

  const serviceUrls = SERVICES.map((s) => ({ url: `${BASE}/services/${s.slug}` }));
  const lenderUrls = LENDERS.map((lender) => ({ url: `${BASE}/lenders/${lender.slug}`, lastModified: LENDER_REVIEW_DATE }));
  const reviewUrls = REVIEW_FIRMS.map((f) => ({ url: `${BASE}/reviews/${f.slug}`, ...(f.checkedAt ? { lastModified: f.checkedAt } : {}) }));
  const verticalUrls = VERTICAL_CONTENT.map((v) => ({ url: `${BASE}/industries/${v.slug}` }));
  const stateUrls = STATES.filter((s) => hasStateGuide(s.code)).map((s) => ({ url: `${BASE}/mca-defense/${s.code.toLowerCase()}` }));

  // Let a database failure produce a server error so crawlers can retry.
  // A successful but partial sitemap would incorrectly omit every article.
  const articles = await db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({ url: `${BASE}/insights/${a.slug}`, lastModified: a.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [...staticUrls, ...serviceUrls, ...reviewUrls, ...lenderUrls, ...verticalUrls, ...stateUrls, ...articleUrls];
}
