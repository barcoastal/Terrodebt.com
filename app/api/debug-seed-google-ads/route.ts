import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ALLOWED_KEYS = new Set([
  "google_ads_developer_token",
  "google_ads_customer_id",
  "google_ads_login_customer_id",
  "google_ads_conversion_action_id",
  "google_ads_client_id",
  "google_ads_client_secret",
  "google_ads_refresh_token",
]);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body.token !== "bdi-google-ads-seed-2026-once") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const values = body.values ?? {};
  const seeded: string[] = [];
  for (const [key, value] of Object.entries(values)) {
    if (!ALLOWED_KEYS.has(key)) continue;
    if (typeof value !== "string" || value.length === 0) continue;
    await db.setting.upsert({
      where: { key },
      update: { value: value as unknown as object },
      create: { key, value: value as unknown as object },
    });
    seeded.push(key);
  }
  return NextResponse.json({ ok: true, seeded });
}
