import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";

// Per-source Zapier webhook routing.
// Set these env vars on Railway; falls back to ZAPIER_WEBHOOK_URL for anything else.
const SOURCE_WEBHOOKS: Record<string, string | undefined> = {
  "google-lp": process.env.ZAPIER_WEBHOOK_GOOGLE,
  "affiliate-lp": process.env.ZAPIER_WEBHOOK_AFFILIATE,
};

function webhookForSource(source: string): string | undefined {
  return SOURCE_WEBHOOKS[source] ?? process.env.ZAPIER_WEBHOOK_URL;
}

export async function postToZapier(lead: Lead): Promise<IntegrationResult> {
  const url = webhookForSource(lead.source);
  if (!url) return { name: "zapier", ok: false, error: `No webhook configured for source=${lead.source}` };

  const payload = {
    source: "terradebt",
    lead_source: lead.source,
    routed_to: lead.source in SOURCE_WEBHOOKS ? lead.source : "default",
    lead_id: lead.id,
    created_at: lead.createdAt,
    first_name: lead.firstName,
    last_name: lead.lastName,
    business_name: lead.businessName,
    email: lead.email,
    phone: lead.phone,
    has_mca_debt: lead.hasMcaDebt,
    debt_amount: lead.debtAmount,
    debt_amount_bucket: lead.debtAmountBucket,
    status: lead.status,
    utm_source: lead.utmSource,
    utm_medium: lead.utmMedium,
    utm_campaign: lead.utmCampaign,
    utm_content: lead.utmContent,
    utm_term: lead.utmTerm,
    gclid: lead.gclid,
    fbclid: lead.fbclid,
    eli_clickid: lead.eliClickid,
    ip: lead.ip,
    user_agent: lead.userAgent,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { name: "zapier", ok: false, error: `HTTP ${res.status}` };
    return { name: "zapier", ok: true };
  } catch (e) {
    return { name: "zapier", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
