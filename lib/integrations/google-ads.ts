import type { Lead } from "@/app/generated/prisma";
import type { IntegrationResult } from ".";

export async function uploadGoogleAdsConversion(lead: Lead): Promise<IntegrationResult> {
  if (!lead.gclid) return { name: "google_ads", ok: false, error: "no gclid" };

  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  if (!customerId || !developerToken || !conversionActionId || !refreshToken || !clientId || !clientSecret) {
    return { name: "google_ads", ok: false, error: "Google Ads env vars not set" };
  }

  try {
    const { GoogleAdsApi, services } = await import("google-ads-api");
    const client = new GoogleAdsApi({ client_id: clientId, client_secret: clientSecret, developer_token: developerToken });
    const customer = client.Customer({ customer_id: customerId, refresh_token: refreshToken, login_customer_id: loginCustomerId });
    const conversionActionResource = `customers/${customerId}/conversionActions/${conversionActionId}`;

    const request = new services.UploadClickConversionsRequest({
      customer_id: customerId,
      conversions: [
        new services.ClickConversion({
          conversion_action: conversionActionResource,
          gclid: lead.gclid,
          conversion_date_time: formatGclidDate(lead.createdAt),
          conversion_value: bucketToValue(lead.debtAmountBucket),
          currency_code: "USD",
          order_id: lead.id,
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
