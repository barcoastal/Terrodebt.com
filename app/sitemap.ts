import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { STATES } from "@/lib/states";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { SERVICES } from "@/lib/service-content";
import { REVIEW_FIRMS } from "@/lib/reviews-content";

export const dynamic = "force-dynamic";

const BASE = "https://businessdebtinsider.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "", "/about", "/contact", "/trust", "/privacy", "/terms", "/disclosure",
    "/insights", "/industries", "/programs", "/services", "/reviews", "/glossary",
    "/tools", "/tools/apr-calculator", "/tools/stack-calculator", "/tools/health-check", "/calculator",
    "/programs/settlement", "/programs/restructure", "/programs/legal-defense",
    "/mca-defense",
  ];
  // Only emit lastModified when there is an actual content-update timestamp.
  // Request time is not the last time a static page was edited.
  const staticUrls = staticPaths.map((p) => ({ url: `${BASE}${p}` }));

  const serviceUrls = SERVICES.map((s) => ({ url: `${BASE}/services/${s.slug}` }));
  const reviewUrls = REVIEW_FIRMS.map((f) => ({ url: `${BASE}/reviews/${f.slug}` }));
  const verticalUrls = VERTICAL_CONTENT.map((v) => ({ url: `${BASE}/industries/${v.slug}` }));
  const stateUrls = STATES.map((s) => ({ url: `${BASE}/mca-defense/${s.code.toLowerCase()}` }));

  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    articleUrls = articles.map((a) => ({ url: `${BASE}/insights/${a.slug}`, lastModified: a.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 }));
  } catch {}

  return [...staticUrls, ...serviceUrls, ...reviewUrls, ...verticalUrls, ...stateUrls, ...articleUrls];
}
