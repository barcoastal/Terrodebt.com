import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";
import crypto from "node:crypto";

export async function fireGa4Conversion(lead: Lead): Promise<IntegrationResult> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return { name: "ga4", ok: false, error: "GA4 env vars not set" };

  const clientId = lead.eliClickid ?? crypto.randomUUID();
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
  const payload = {
    client_id: clientId,
    user_id: lead.id,
    events: [{
      name: "generate_lead",
      params: {
        currency: "USD",
        value: bucketToValue(lead.debtAmountBucket),
        terra_source: lead.source,
        debt_bucket: lead.debtAmountBucket ?? "unknown",
      },
    }],
  };

  try {
    const res = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
    if (!res.ok) return { name: "ga4", ok: false, error: `HTTP ${res.status}` };
    return { name: "ga4", ok: true };
  } catch (e) {
    return { name: "ga4", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

function bucketToValue(b: string | null): number {
  switch (b) {
    case "<25k": return 50;
    case "25k-75k": return 100;
    case "75k-200k": return 200;
    case "200k-500k": return 400;
    case "500k+": return 800;
    default: return 25;
  }
}
