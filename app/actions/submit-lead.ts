"use server";
import { cookies, headers } from "next/headers";
import { createLead, type LeadSubmitInput } from "@/lib/lead-service";
import { fanOutIntegrations } from "@/lib/integrations";
import { db } from "@/lib/db";

export async function submitLead(input: Omit<LeadSubmitInput, "ip" | "userAgent" | "eliClickid">) {
  try {
    const c = await cookies();
    const h = await headers();
    const eliClickid = c.get("eli_clickid")?.value;

    // Click-ID fallback chain: form payload (localStorage) → first-party cookie → Visitor row
    let visitor: Awaited<ReturnType<typeof db.visitor.findUnique>> = null;
    if (eliClickid) {
      try { visitor = await db.visitor.findUnique({ where: { eliClickid } }); } catch {}
    }
    const pick = (formVal: string | undefined, cookieName: string, visitorField: keyof NonNullable<typeof visitor>) =>
      formVal || c.get(cookieName)?.value || (visitor ? (visitor[visitorField] as string | null) ?? undefined : undefined);

    const enriched: LeadSubmitInput = {
      ...input,
      gclid: pick(input.gclid, "td_gclid", "gclid"),
      fbclid: pick(input.fbclid, "td_fbclid", "fbclid"),
      affiliateClickid: pick(input.affiliateClickid, "td_affiliate_clickid", "affiliateClickid"),
      utmSource: pick(input.utmSource, "td_utm_source", "utmSource"),
      utmMedium: pick(input.utmMedium, "td_utm_medium", "utmMedium"),
      utmCampaign: pick(input.utmCampaign, "td_utm_campaign", "utmCampaign"),
      utmContent: pick(input.utmContent, "td_utm_content", "utmContent"),
      utmTerm: pick(input.utmTerm, "td_utm_term", "utmTerm"),
      eliClickid,
      ip: h.get("x-forwarded-for")?.split(",")[0] ?? null,
      userAgent: h.get("user-agent"),
    };

    const lead = await createLead(enriched);
    const results = await fanOutIntegrations(lead);
    await db.lead.update({ where: { id: lead.id }, data: { integrationStatus: { db: "ok", integrations: results } } });
    return { ok: true as const, leadId: lead.id };
  } catch (e) {
    console.error("submitLead failed", e);
    return { ok: false as const, error: e instanceof Error ? e.message : "unknown" };
  }
}
