import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Records a published social post so it shows on the admin calendar.
// Auth: shared secret. Trust-on-first-use: the first request registers its
// secret in the Setting table; later requests must match it.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-social-secret");
  if (!secret || secret.length < 24) {
    return NextResponse.json({ error: "missing secret" }, { status: 401 });
  }

  const existing = await db.setting.findUnique({ where: { key: "social_log_secret" } });
  if (!existing) {
    await db.setting.create({ data: { key: "social_log_secret", value: secret } });
  } else if (existing.value !== secret) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const post = await db.socialPost.create({
    data: {
      slug: body.slug ?? null,
      type: body.type ?? "image",
      caption: String(body.caption ?? "").slice(0, 4000),
      mediaUrl: String(body.mediaUrl ?? ""),
      fbPostId: body.fbPostId ?? null,
      igMediaId: body.igMediaId ?? null,
      igPermalink: body.igPermalink ?? null,
      status: body.status ?? "published",
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    },
  });
  return NextResponse.json({ ok: true, id: post.id });
}
