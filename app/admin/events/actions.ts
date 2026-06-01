"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { fireGoogleAdsEvent } from "@/lib/event-fire";
import { STATUS_TO_CONVERSION_ACTION, STATUS_LABELS, type LeadStatus } from "@/lib/lead-funnel";

export async function seedDefaultConversionActions() {
  for (const status of ["lead", "opportunity", "closed_won"] as LeadStatus[]) {
    const actionId = STATUS_TO_CONVERSION_ACTION[status];
    if (!actionId) continue;
    await db.conversionAction.upsert({
      where: { platform_actionId: { platform: "google_ads", actionId } },
      update: { name: STATUS_LABELS[status] },
      create: { name: STATUS_LABELS[status], actionId, platform: "google_ads" },
    });
  }
  revalidatePath("/admin/events");
}

export async function saveConversionAction(fd: FormData) {
  const name = String(fd.get("name") ?? "").trim();
  const actionId = String(fd.get("actionId") ?? "").trim();
  if (!name || !actionId) return;
  await db.conversionAction.upsert({
    where: { platform_actionId: { platform: "google_ads", actionId } },
    update: { name },
    create: { name, actionId, platform: "google_ads" },
  });
  revalidatePath("/admin/events");
}

export async function updateConversionAction(fd: FormData) {
  const id = String(fd.get("id") ?? "").trim();
  const name = String(fd.get("name") ?? "").trim();
  const actionId = String(fd.get("actionId") ?? "").trim();
  if (!id || !name || !actionId) return;
  await db.conversionAction.update({
    where: { id },
    data: { name, actionId },
  });
  revalidatePath("/admin/events");
}

export async function deleteConversionAction(id: string) {
  await db.conversionAction.delete({ where: { id } });
  revalidatePath("/admin/events");
}

export async function fireEvent(fd: FormData) {
  const leadId = String(fd.get("leadId") ?? "").trim();
  const conversionActionId = String(fd.get("conversionActionId") ?? "").trim() || undefined;
  if (!leadId) return;
  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead) return;
  await fireGoogleAdsEvent({ lead, conversionActionId, source: "manual-admin" });
  revalidatePath("/admin/events");
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function bulkFire(fd: FormData) {
  const conversionActionId = String(fd.get("conversionActionId") ?? "").trim() || undefined;
  const filter = String(fd.get("filter") ?? "all-with-gclid");
  const limit = Math.min(100, Math.max(1, parseInt(String(fd.get("limit") ?? "10"), 10) || 10));

  const whereByFilter: Record<string, Record<string, unknown>> = {
    "all-with-gclid": { gclid: { not: null } },
    "lead": { gclid: { not: null }, status: "lead" },
    "opportunity": { gclid: { not: null }, status: "opportunity" },
    "closed_won": { gclid: { not: null }, status: "closed_won" },
  };
  const where = whereByFilter[filter] ?? whereByFilter["all-with-gclid"];

  const leads = await db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: limit });
  for (const lead of leads) {
    await fireGoogleAdsEvent({ lead, conversionActionId, source: "bulk" });
  }
  revalidatePath("/admin/events");
}
