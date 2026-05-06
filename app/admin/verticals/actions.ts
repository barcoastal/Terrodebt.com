"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateVertical(id: string, fd: FormData) {
  const data = {
    name: String(fd.get("name") ?? ""),
    headline: String(fd.get("headline") ?? ""),
    subline: String(fd.get("subline") ?? "") || null,
    stats: parseJson(fd.get("stats")),
    painPoints: parseJson(fd.get("painPoints")),
    proof: parseJson(fd.get("proof")),
    faq: parseJson(fd.get("faq")),
    published: fd.get("published") === "on",
  };
  const updated = await db.vertical.update({ where: { id }, data });
  revalidatePath(`/admin/verticals/${id}`);
  revalidatePath("/admin/verticals");
  revalidatePath(`/industries/${updated.slug}`);
}

function parseJson(raw: FormDataEntryValue | null) {
  if (!raw) return null;
  const s = String(raw).trim();
  if (!s) return null;
  try { return JSON.parse(s); } catch { return { _raw: s }; }
}
