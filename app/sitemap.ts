import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { STATES } from "@/lib/states";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

const BASE = "https://terradebt.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = [
    "", "/about", "/contact", "/trust", "/privacy", "/terms", "/disclosure",
    "/calculator", "/articles", "/case-studies", "/industries", "/programs",
    "/services/mca-debt-relief",
    "/tools", "/tools/apr-calculator", "/tools/stack-calculator", "/tools/health-check",
    "/programs/settlement", "/programs/restructure", "/programs/reverse-consolidation-defense", "/programs/legal-defense",
  ];
  const staticUrls = staticPaths.map((p) => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1.0 : 0.8 }));

  const verticalUrls = VERTICAL_CONTENT.map((v) => ({ url: `${BASE}/industries/${v.slug}`, lastModified: now, priority: 0.7 }));
  const stateUrls = STATES.map((s) => ({ url: `${BASE}/mca-defense/${s.code.toLowerCase()}`, lastModified: now, priority: 0.6 }));

  let articleUrls: MetadataRoute.Sitemap = [];
  let studyUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    articleUrls = articles.map((a) => ({ url: `${BASE}/articles/${a.slug}`, lastModified: a.updatedAt, priority: 0.6 }));
    const studies = await db.caseStudy.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    studyUrls = studies.map((s) => ({ url: `${BASE}/case-studies/${s.slug}`, lastModified: s.updatedAt, priority: 0.6 }));
  } catch {}

  return [...staticUrls, ...verticalUrls, ...stateUrls, ...articleUrls, ...studyUrls];
}
