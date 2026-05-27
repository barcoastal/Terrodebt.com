"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

const NUMERIC = new Set(["aggregate_resolved_dollars"]);

// Fields that should NOT be overwritten when blank (preserve stored value).
const SECRET_KEYS = new Set([
  "google_ads_developer_token",
  "google_ads_client_secret",
  "google_ads_refresh_token",
  "postback_secret",
]);

export async function saveSettings(fd: FormData) {
  for (const [key, raw] of fd.entries()) {
    const str = String(raw);
    if (SECRET_KEYS.has(key) && str.length === 0) {
      // Skip empty secret submissions so we don't wipe stored credentials.
      continue;
    }
    let value: unknown = str;
    if (NUMERIC.has(key)) value = Number(raw) || 0;
    await db.setting.upsert({ where: { key }, update: { value: value as object }, create: { key, value: value as object } });
  }
  revalidatePath("/admin/settings");
}
