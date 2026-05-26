export type SourceInput = {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  affiliateClickid?: string | null;
  referrer?: string | null;
};

export type VisitorSource = {
  label: string;
  category: "google-ads" | "facebook-ads" | "affiliate" | "utm" | "organic" | "referral" | "direct";
  detail?: string;
};

export function visitorSource(v: SourceInput): VisitorSource {
  if (v.gclid) {
    return {
      label: v.utmCampaign ? `Google Ads · ${v.utmCampaign}` : "Google Ads",
      category: "google-ads",
      detail: v.gclid.slice(0, 16),
    };
  }
  if (v.fbclid) {
    return {
      label: v.utmCampaign ? `Facebook Ads · ${v.utmCampaign}` : "Facebook Ads",
      category: "facebook-ads",
      detail: v.fbclid.slice(0, 16),
    };
  }
  if (v.affiliateClickid) {
    return {
      label: v.utmSource ? `Affiliate · ${v.utmSource}` : "Affiliate",
      category: "affiliate",
      detail: v.affiliateClickid.slice(0, 16),
    };
  }
  if (v.utmSource) {
    const med = v.utmMedium ? ` · ${v.utmMedium}` : "";
    return { label: `${v.utmSource}${med}`, category: "utm" };
  }
  if (v.referrer) {
    let host = v.referrer;
    try {
      host = new URL(v.referrer).hostname.replace(/^www\./, "");
    } catch {}
    const organicMap: Record<string, string> = {
      "google.com": "Google organic",
      "bing.com": "Bing organic",
      "duckduckgo.com": "DuckDuckGo",
      "search.brave.com": "Brave Search",
      "yahoo.com": "Yahoo Search",
    };
    if (organicMap[host]) return { label: organicMap[host], category: "organic", detail: host };
    return { label: host, category: "referral", detail: host };
  }
  return { label: "Direct", category: "direct" };
}
