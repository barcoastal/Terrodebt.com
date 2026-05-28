import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({ token: "" }));
  if (token !== "bdi-resend-seed-2026-once") return NextResponse.json({ ok: false }, { status: 401 });

  const entries: Array<[string, string]> = [
    ["resend_api_key", "re_HfYDApJH_PQccCmyNsRPaJMEdR4hKxPnh"],
    ["resend_from", "Business Debt Insider <onboarding@resend.dev>"],
    ["notification_email_to", "bar@albert-capital.com, info@businessdebtinsider.com"],
  ];
  for (const [key, value] of entries) {
    await db.setting.upsert({ where: { key }, update: { value: value as object }, create: { key, value: value as object } });
  }
  return NextResponse.json({ ok: true, seeded: entries.map(([k]) => k) });
}
