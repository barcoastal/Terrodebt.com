import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });
  const a = await db.article.findUnique({ where: { slug } });
  if (!a) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({
    slug: a.slug,
    title: a.title,
    published: a.published,
    publishedAt: a.publishedAt,
    contentLength: a.contentMd?.length ?? 0,
    contentStart: a.contentMd?.slice(0, 300) ?? "(none)",
    excerpt: a.excerpt,
  });
}
