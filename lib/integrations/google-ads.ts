import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";
import { getSetting } from "@/lib/settings";

export async function uploadGoogleAdsConversion(lead: Lead, conversionActionIdOverride?: string): Promise<IntegrationResult> {
  if (!lead.gclid) return { name: "google_ads", ok: false, error: "no gclid" };

  const customerId = await getSetting("google_ads_customer_id", process.env.GOOGLE_ADS_CUSTOMER_ID);
  const developerToken = await getSetting("google_ads_developer_token", process.env.GOOGLE_ADS_DEVELOPER_TOKEN);
  const defaultActionId = await getSetting("google_ads_conversion_action_id", process.env.GOOGLE_ADS_CONVERSION_ACTION_ID);
  const conversionActionId = conversionActionIdOverride ?? defaultActionId;
  const refreshToken = await getSetting("google_ads_refresh_token", process.env.GOOGLE_ADS_REFRESH_TOKEN);
  const clientId = await getSetting("google_ads_client_id", process.env.GOOGLE_ADS_CLIENT_ID);
  const clientSecret = await getSetting("google_ads_client_secret", process.env.GOOGLE_ADS_CLIENT_SECRET);
  const loginCustomerId = await getSetting("google_ads_login_customer_id", process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID);

  const missing: string[] = [];
  if (!customerId) missing.push("customer_id");
  if (!developerToken) missing.push("developer_token");
  if (!conversionActionId) missing.push("conversion_action_id");
  if (!refreshToken) missing.push("refresh_token");
  if (!clientId) missing.push("client_id");
  if (!clientSecret) missing.push("client_secret");
  if (missing.length > 0) {
    return { name: "google_ads", ok: false, error: `Missing Google Ads settings: ${missing.join(", ")}` };
  }

  try {
    const { GoogleAdsApi, services } = await import("google-ads-api");
    const client = new GoogleAdsApi({ client_id: clientId!, client_secret: clientSecret!, developer_token: developerToken! });
    const customer = client.Customer({ customer_id: customerId!, refresh_token: refreshToken!, login_customer_id: loginCustomerId });
    const conversionActionResource = `customers/${customerId}/conversionActions/${conversionActionId}`;

    const request = new services.UploadClickConversionsRequest({
      customer_id: customerId!,
      conversions: [
        new services.ClickConversion({
          conversion_action: conversionActionResource,
          gclid: lead.gclid,
          conversion_date_time: formatGclidDate(lead.createdAt),
          conversion_value: leadValue(lead.debtAmount, lead.debtAmountBucket),
          currency_code: "USD",
          order_id: `${lead.id}-${conversionActionId}-${Date.now()}`,
        }),
      ],
      partial_failure: true,
      validate_only: false,
    });
    await customer.conversionUploads.uploadClickConversions(request);
    return { name: "google_ads", ok: true };
  } catch (e) {
    return { name: "google_ads", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

function formatGclidDate(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}+00:00`;
}

function leadValue(amount: number | null, bucket: string | null): number {
  if (typeof amount === "number" && amount > 0) {
    return Math.min(1000, Math.max(25, Math.round(amount / 1000)));
  }
  switch (bucket) {
    case "<25k": return 50;
    case "25k-75k": return 100;
    case "75k-200k": return 200;
    case "200k-500k": return 400;
    case "500k+": return 800;
    default: return 25;
  }
}
