import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";

export async function notifySlack(lead: Lead): Promise<IntegrationResult> {
  const url = process.env.SLACK_LEADS_WEBHOOK_URL;
  if (!url) return { name: "slack", ok: false, error: "SLACK_LEADS_WEBHOOK_URL not set" };

  const text = `*New TerraDebt lead* :seedling:
*Name:* ${lead.firstName} ${lead.lastName}
*Business:* ${lead.businessName}
*Email:* ${lead.email}
*Phone:* ${lead.phone}
*Has MCA debt:* ${lead.hasMcaDebt ? "Yes" : "No"}
*Debt:* ${lead.debtAmountBucket ?? "n/a"}
*Source:* ${lead.source}
*UTM:* ${lead.utmSource ?? "—"} / ${lead.utmCampaign ?? "—"}
*gclid:* ${lead.gclid ?? "—"}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return { name: "slack", ok: false, error: `HTTP ${res.status}` };
    return { name: "slack", ok: true };
  } catch (e) {
    return { name: "slack", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
