"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

const NUMERIC = new Set(["aggregate_resolved_dollars"]);

export async function saveSettings(fd: FormData) {
  for (const [key, raw] of fd.entries()) {
    let value: unknown = String(raw);
    if (NUMERIC.has(key)) value = Number(raw) || 0;
    await db.setting.upsert({ where: { key }, update: { value: value as object }, create: { key, value: value as object } });
  }
  revalidatePath("/admin/settings");
}
