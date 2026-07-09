import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { STATES } from "@/lib/states";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { SERVICES } from "@/lib/service-content";
import { REVIEW_FIRMS } from "@/lib/reviews-content";

export const dynamic = "force-dynamic";

const BASE = "https://businessdebtinsider.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = [
    "", "/about", "/contact", "/trust", "/privacy", "/terms", "/disclosure",
    "/insights", "/industries", "/programs", "/services", "/reviews", "/glossary",
    "/tools", "/tools/apr-calculator", "/tools/stack-calculator", "/tools/health-check",
    "/programs/settlement", "/programs/restructure", "/programs/legal-defense",
    "/mca-defense",
  ];
  const staticUrls = staticPaths.map((p) => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1.0 : 0.8 }));

  const serviceUrls = SERVICES.map((s) => ({ url: `${BASE}/services/${s.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 }));
  const reviewUrls = REVIEW_FIRMS.map((f) => ({ url: `${BASE}/reviews/${f.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 }));
  const verticalUrls = VERTICAL_CONTENT.map((v) => ({ url: `${BASE}/industries/${v.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }));
  const stateUrls = STATES.map((s) => ({ url: `${BASE}/mca-defense/${s.code.toLowerCase()}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));

  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    articleUrls = articles.map((a) => ({ url: `${BASE}/insights/${a.slug}`, lastModified: a.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 }));
  } catch {}

  return [...staticUrls, ...serviceUrls, ...reviewUrls, ...verticalUrls, ...stateUrls, ...articleUrls];
}
