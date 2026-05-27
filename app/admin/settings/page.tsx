import { db } from "@/lib/db";
import { saveSettings } from "./actions";

type FieldDef = { key: string; label: string; help?: string; placeholder?: string; secret?: boolean };

const GROUPS: { title: string; description: string; fields: FieldDef[] }[] = [
  {
    title: "Brand",
    description: "Public-facing site values.",
    fields: [
      { key: "site_phone", label: "Site phone", placeholder: "1-800-..." },
      { key: "aggregate_resolved_dollars", label: "Aggregate resolved $", help: "Number, used in homepage counter." },
      { key: "bbb_status", label: "BBB status", placeholder: "founding | accredited" },
    ],
  },
  {
    title: "Zapier webhooks (per landing-page source)",
    description: "When a lead is created with a matching source, the integration POSTs the full lead payload to that webhook. Otherwise it falls back to the default. Leave blank to disable for that source.",
    fields: [
      { key: "zapier_webhook_default", label: "Default Zapier webhook", help: "Used for homepage, /get-started, articles, programs, contact, and any source not listed below.", placeholder: "https://hooks.zapier.com/hooks/catch/..." },
      { key: "zapier_webhook_google", label: "Zapier webhook for /go/google", help: "Fires only for leads with source=google-lp.", placeholder: "https://hooks.zapier.com/hooks/catch/..." },
      { key: "zapier_webhook_affiliate", label: "Zapier webhook for /go/affiliate", help: "Fires only for leads with source=affiliate-lp.", placeholder: "https://hooks.zapier.com/hooks/catch/..." },
    ],
  },
  {
    title: "Other lead routing",
    description: "Lead notifications and CRM forwarding.",
    fields: [
      { key: "slack_leads_webhook_url", label: "Slack leads webhook", placeholder: "https://hooks.slack.com/services/..." },
      { key: "coastal_crm_webhook_url", label: "Coastal CRM webhook", placeholder: "https://..." },
    ],
  },
  {
    title: "Analytics",
    description: "Front-end conversion tracking IDs (loaded by the GA4 and gtag snippets in the site head).",
    fields: [
      { key: "ga4_measurement_id", label: "GA4 measurement ID", placeholder: "G-XXXXXXX" },
      { key: "google_ads_conversion_id", label: "Google Ads conversion ID (gtag)", placeholder: "AW-1234567890" },
    ],
  },
  {
    title: "Postbacks — inbound",
    description: "External networks POST/GET /api/postback to report conversions. Set a shared secret to require auth on every postback. When a postback links to a lead with a stored gclid, a Google Ads conversion is auto-forwarded.",
    fields: [
      { key: "postback_secret", label: "Postback shared secret", help: "Required as ?secret= or Authorization: Bearer on every postback. Leave blank to accept unauthenticated postbacks (not recommended).", secret: true },
      { key: "postback_forward_to_google_ads", label: "Auto-forward to Google Ads", help: "Set to 'false' to disable auto-forwarding. Default is on." },
    ],
  },
  {
    title: "Google Ads — server-side conversion uploads",
    description: "Used by the Send event to Google Ads button on each lead. Secrets stay blank in the form — leave them empty to keep the existing value. See docs/google-ads-setup.md for how to obtain each one.",
    fields: [
      { key: "google_ads_developer_token", label: "Developer token", help: "Google Ads → Tools → API Center.", secret: true },
      { key: "google_ads_customer_id", label: "Customer ID", help: "10 digits, no dashes." },
      { key: "google_ads_login_customer_id", label: "Login customer ID (MCC)", help: "MCC's 10-digit ID, or same as Customer ID if no manager account." },
      { key: "google_ads_conversion_action_id", label: "Default conversion action ID", help: "Fires on every form submit. Funnel-stage actions can be entered ad-hoc on each lead." },
      { key: "google_ads_client_id", label: "OAuth 2.0 Client ID", help: "Google Cloud Console → Credentials." },
      { key: "google_ads_client_secret", label: "OAuth 2.0 Client secret", secret: true },
      { key: "google_ads_refresh_token", label: "Refresh token", help: "Run scripts/get-google-ads-refresh-token.mjs locally with the client ID + secret to generate this.", secret: true },
    ],
  },
];

export default async function SettingsPage() {
  const map: Record<string, unknown> = {};
  try {
    const all = await db.setting.findMany();
    for (const s of all) map[s.key] = s.value;
  } catch {}

  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-sm text-muted max-w-2xl">Settings stored here override environment variables. If a value is blank, the integration falls back to the matching env var on Railway. Secret fields show <code className="text-xs">●●● stored</code> when a value is on file — leave them blank to keep that value.</p>

      <form action={saveSettings} className="mt-6 space-y-10 max-w-2xl">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="text-lg font-semibold tracking-tight">{g.title}</h2>
            <p className="text-sm text-muted">{g.description}</p>
            <div className="mt-4 space-y-4">
              {g.fields.map((f) => {
                const stored = map[f.key];
                const hasStored = stored !== undefined && stored !== null && String(stored).length > 0;
                if (f.secret) {
                  return (
                    <div key={f.key}>
                      <label htmlFor={f.key} className="block text-sm font-medium mb-1">
                        {f.label} {hasStored && <span className="font-mono text-xs text-emerald-700">●●● stored</span>}
                      </label>
                      <input
                        id={f.key}
                        name={f.key}
                        type="password"
                        placeholder={hasStored ? "Leave blank to keep current value" : (f.placeholder ?? "")}
                        className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm"
                      />
                      {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
                    </div>
                  );
                }
                return (
                  <div key={f.key}>
                    <label htmlFor={f.key} className="block text-sm font-medium mb-1">{f.label}</label>
                    <input
                      id={f.key}
                      name={f.key}
                      placeholder={f.placeholder}
                      defaultValue={hasStored ? String(stored) : ""}
                      className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm"
                    />
                    {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <button type="submit" className="bg-electric text-white px-5 py-2.5 rounded-md font-medium">Save settings</button>
      </form>
    </>
  );
}
