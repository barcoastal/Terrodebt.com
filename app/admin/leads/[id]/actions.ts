"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { uploadGoogleAdsConversion } from "@/lib/integrations/google-ads";

export async function updateLeadStatus(id: string, status: string) {
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function fireGoogleAdsConversion(id: string, conversionActionId?: string) {
  const lead = await db.lead.findUnique({ where: { id } });
  if (!lead) return { ok: false, error: "lead not found" };
  const result = await uploadGoogleAdsConversion(lead, conversionActionId);
  const existing = (lead.integrationStatus ?? {}) as Record<string, unknown>;
  const history: Record<string, unknown>[] = Array.isArray(existing.gaHistory) ? (existing.gaHistory as Record<string, unknown>[]) : [];
  history.push({ ...result, at: new Date().toISOString(), conversionActionId: conversionActionId ?? "default" });
  await db.lead.update({
    where: { id },
    data: { integrationStatus: { ...existing, gaHistory: history } as object },
  });
  revalidatePath(`/admin/leads/${id}`);
  return result;
}
