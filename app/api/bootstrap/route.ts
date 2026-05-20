import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ARTICLE_SEEDS } from "@/lib/seed-data/articles";

export const dynamic = "force-dynamic";

export async function GET() {
  const created: string[] = [];
  const skipped: string[] = [];

  for (const a of ARTICLE_SEEDS) {
    const existing = await db.article.findUnique({
      where: { slug: a.slug },
      select: { id: true },
    });
    if (existing) {
      skipped.push(a.slug);
      continue;
    }
    await db.article.create({
      data: { ...a, published: true, publishedAt: new Date() },
    });
    created.push(a.slug);
  }

  const total = await db.article.count();
  return NextResponse.json({
    ok: true,
    total,
    created: created.length,
    skipped: skipped.length,
    createdSlugs: created,
  });
}
