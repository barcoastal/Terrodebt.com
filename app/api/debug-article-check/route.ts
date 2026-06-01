import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const total = await db.article.count();
  const published = await db.article.count({ where: { published: true } });
  const sample = await db.article.findMany({
    select: { slug: true, published: true, publishedAt: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return NextResponse.json({ total, published, sample });
}
