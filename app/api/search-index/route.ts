import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/product-content";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { GLOSSARY } from "@/lib/glossary";
import { db } from "@/lib/db";

export const revalidate = 600;

type SearchItem = {
  type: "article" | "topic" | "industry" | "glossary" | "tool";
  title: string;
  slug: string;
  excerpt?: string;
};

const TOOLS: SearchItem[] = [
  { type: "tool", title: "Effective APR Calculator", slug: "/tools/apr-calculator", excerpt: "Compute the real annualized cost of an MCA" },
  { type: "tool", title: "MCA Stack Calculator", slug: "/tools/stack-calculator", excerpt: "Map daily debits across multiple advances" },
  { type: "tool", title: "Debt Health Check", slug: "/tools/health-check", excerpt: "10-question diagnostic across debt categories" },
];

export async function GET() {
  const items: SearchItem[] = [];

  for (const p of PRODUCTS) {
    items.push({
      type: "topic",
      title: p.name,
      slug: `/services/${p.slug}`,
      excerpt: p.subline,
    });
  }

  for (const v of VERTICAL_CONTENT) {
    items.push({
      type: "industry",
      title: v.name,
      slug: `/industries/${v.slug}`,
      excerpt: v.subline,
    });
  }

  for (const g of GLOSSARY) {
    items.push({
      type: "glossary",
      title: g.term,
      slug: `/glossary#${g.slug}`,
      excerpt: g.definition,
    });
  }

  items.push(...TOOLS);

  try {
    const articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, excerpt: true },
    });
    for (const a of articles) {
      items.push({
        type: "article",
        title: a.title,
        slug: `/articles/${a.slug}`,
        excerpt: a.excerpt ?? undefined,
      });
    }
  } catch {
    // DB unreachable; skip article entries
  }

  return NextResponse.json({ items });
}
