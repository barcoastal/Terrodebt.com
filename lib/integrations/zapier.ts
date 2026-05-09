import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";

export async function postToZapier(lead: Lead): Promise<IntegrationResult> {
  const url = process.env.ZAPIER_WEBHOOK_URL;
  if (!url) return { name: "zapier", ok: false, error: "ZAPIER_WEBHOOK_URL not set" };

  const payload = {
    source: "terradebt",
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
    lead_source: lead.source,
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
