"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { fireGoogleAdsEvent } from "@/lib/event-fire";
import { notifyStatusChange } from "@/lib/notifications";

export async function updateLeadStatus(id: string, status: string) {
  const before = await db.lead.findUnique({ where: { id }, select: { status: true } });
  const updated = await db.lead.update({ where: { id }, data: { status } });
  if (before && before.status !== status) {
    await notifyStatusChange(updated, before.status);
  }
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function fireGoogleAdsConversion(id: string, conversionActionId?: string) {
  const lead = await db.lead.findUnique({ where: { id } });
  if (!lead) return { ok: false, error: "lead not found" };
  const result = await fireGoogleAdsEvent({ lead, conversionActionId, source: "manual-admin" });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/events");
  return result;
}
