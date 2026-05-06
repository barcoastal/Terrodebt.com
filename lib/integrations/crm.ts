import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";

export async function postToCrm(lead: Lead): Promise<IntegrationResult> {
  const url = process.env.COASTAL_CRM_WEBHOOK_URL;
  const secret = process.env.COASTAL_CRM_WEBHOOK_SECRET;
  if (!url) return { name: "crm", ok: false, error: "COASTAL_CRM_WEBHOOK_URL not set" };

  const payload = {
    source: "terradebt",
    lead: {
      first_name: lead.firstName,
      last_name: lead.lastName,
      business_name: lead.businessName,
      email: lead.email,
      phone: lead.phone,
      has_mca_debt: lead.hasMcaDebt,
      debt_amount_bucket: lead.debtAmountBucket,
      utm: {
        source: lead.utmSource, medium: lead.utmMedium, campaign: lead.utmCampaign,
        content: lead.utmContent, term: lead.utmTerm,
      },
      click_ids: { gclid: lead.gclid, fbclid: lead.fbclid, eli_clickid: lead.eliClickid },
      created_at: lead.createdAt,
      terra_lead_id: lead.id,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-webhook-secret": secret } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { name: "crm", ok: false, error: `HTTP ${res.status}` };
    return { name: "crm", ok: true };
  } catch (e) {
    return { name: "crm", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
