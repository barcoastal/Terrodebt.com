import type { Lead } from "@/app/generated/prisma";
import { db } from "./db";
import { uploadGoogleAdsConversion } from "./integrations/google-ads";

export type FireSource = "auto-on-submit" | "manual-admin" | "postback" | "bulk";

export async function fireGoogleAdsEvent(opts: {
  lead: Lead;
  conversionActionId?: string;
  source: FireSource;
  postbackId?: string;
}) {
  const result = await uploadGoogleAdsConversion(opts.lead, opts.conversionActionId);
  await db.eventFire.create({
    data: {
      platform: "google_ads",
      conversionActionId: opts.conversionActionId ?? null,
      leadId: opts.lead.id,
      postbackId: opts.postbackId ?? null,
      source: opts.source,
      status: result.ok ? "sent" : "failed",
      errorMessage: result.ok ? null : result.error ?? null,
      gclid: opts.lead.gclid ?? null,
      payload: { name: result.name, ok: result.ok, error: result.error ?? null } as object,
    },
  });
  return result;
}
