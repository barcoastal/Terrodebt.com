import { db } from "./db";

export async function getSetting(key: string, envFallback?: string | undefined): Promise<string | undefined> {
  try {
    const row = await db.setting.findUnique({ where: { key } });
    if (row && row.value !== null && row.value !== undefined) {
      const v = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
      if (v.length > 0) return v;
    }
  } catch {}
  return envFallback;
}
