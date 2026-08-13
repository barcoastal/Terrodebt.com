import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";
import { db } from "../db";

// Per-source Zapier webhook routing.
// Settings in the DB take priority; env vars are the fallback.
const SOURCE_TO_KEY: Record<string, { settingKey: string; envVar: string | undefined }> = {
  "google-lp": { settingKey: "zapier_webhook_google", envVar: process.env.ZAPIER_WEBHOOK_GOOGLE },
  "affiliate-lp": { settingKey: "zapier_webhook_affiliate", envVar: process.env.ZAPIER_WEBHOOK_AFFILIATE },
};

const DEFAULT_KEY = "zapier_webhook_default";

async function readSetting(key: string): Promise<string | undefined> {
  try {
    const row = await db.setting.findUnique({ where: { key } });
    if (!row) return undefined;
    const v = row.value;
    if (typeof v === "string" && v.trim().length > 0) return v;
    return undefined;
  } catch {
    return undefined;
  }
}

async function webhookForSource(source: string): Promise<{ url: string | undefined; routedTo: string }> {
  const route = SOURCE_TO_KEY[source];
  if (route) {
    const fromDb = await readSetting(route.settingKey);
    const url = fromDb ?? route.envVar;
    if (url) return { url, routedTo: source };
  }
  const defaultFromDb = await readSetting(DEFAULT_KEY);
  const defaultUrl = defaultFromDb ?? process.env.ZAPIER_WEBHOOK_URL;
  return { url: defaultUrl, routedTo: "default" };
}

export async function postToZapier(lead: Lead): Promise<IntegrationResult> {
  const { url, routedTo } = await webhookForSource(lead.source);
  if (!url) return { name: "zapier", ok: false, error: `No webhook configured for source=${lead.source}` };

  const payload = {
    source: "business-debt-insider",
    lead_source: lead.source,
    routed_to: routedTo,
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
    affiliate_clickid: lead.affiliateClickid,
    tkclid: lead.tkclid,
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
