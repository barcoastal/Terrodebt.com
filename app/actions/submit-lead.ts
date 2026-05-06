"use server";
import { cookies, headers } from "next/headers";
import { createLead, type LeadSubmitInput } from "@/lib/lead-service";
import { fanOutIntegrations } from "@/lib/integrations";
import { db } from "@/lib/db";

export async function submitLead(input: Omit<LeadSubmitInput, "ip" | "userAgent" | "eliClickid">) {
  try {
    const c = await cookies();
    const h = await headers();
    const lead = await createLead({
      ...input,
      eliClickid: c.get("eli_clickid")?.value,
      ip: h.get("x-forwarded-for")?.split(",")[0] ?? null,
      userAgent: h.get("user-agent"),
    });
    const results = await fanOutIntegrations(lead);
    await db.lead.update({ where: { id: lead.id }, data: { integrationStatus: { db: "ok", integrations: results } } });
    return { ok: true as const, leadId: lead.id };
  } catch (e) {
    console.error("submitLead failed", e);
    return { ok: false as const, error: e instanceof Error ? e.message : "unknown" };
  }
}
