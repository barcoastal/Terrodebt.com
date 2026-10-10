import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/product-content";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { GLOSSARY } from "@/lib/glossary";
import { db } from "@/lib/db";
import { LENDERS } from "@/lib/lender-content";
import { REVIEW_FIRMS } from "@/lib/reviews-content";

export const revalidate = 600;

type SearchItem = {
  type: "article" | "topic" | "industry" | "glossary" | "tool" | "lender" | "review";
  title: string;
  slug: string;
  excerpt?: string;
};

const TOOLS: SearchItem[] = [
  { type: "tool", title: "MCA APR Calculator", slug: "/tools/apr-calculator", excerpt: "Estimate financing cost from fees and equal payments" },
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
  items.push(...LENDERS.map((lender) => ({ type: "lender" as const, title: `${lender.name} review`, slug: `/lenders/${lender.slug}`, excerpt: lender.summary })));
  items.push(...REVIEW_FIRMS.map((firm) => ({ type: "review" as const, title: `${firm.name} review`, slug: `/reviews/${firm.slug}`, excerpt: firm.oneLiner })));

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
        slug: `/insights/${a.slug}`,
        excerpt: a.excerpt ?? undefined,
      });
    }
  } catch {
    // DB unreachable; skip article entries
  }

  return NextResponse.json({ items });
}
