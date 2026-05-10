import { db } from "@/lib/db";
import { saveSettings } from "./actions";

type FieldDef = { key: string; label: string; help?: string; placeholder?: string };

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
    description: "Conversion tracking IDs.",
    fields: [
      { key: "ga4_measurement_id", label: "GA4 measurement ID", placeholder: "G-XXXXXXX" },
      { key: "google_ads_conversion_id", label: "Google Ads conversion ID" },
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
      <p className="mt-2 text-sm text-muted max-w-2xl">Settings stored here override environment variables. If a value is blank, the integration falls back to the matching env var on Railway.</p>

      <form action={saveSettings} className="mt-6 space-y-10 max-w-2xl">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="text-lg font-semibold tracking-tight">{g.title}</h2>
            <p className="text-sm text-muted">{g.description}</p>
            <div className="mt-4 space-y-4">
              {g.fields.map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className="block text-sm font-medium mb-1">{f.label}</label>
                  <input
                    id={f.key}
                    name={f.key}
                    placeholder={f.placeholder}
                    defaultValue={map[f.key] !== undefined ? String(map[f.key]) : ""}
                    className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm"
                  />
                  {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
        <button type="submit" className="bg-electric text-white px-5 py-2.5 rounded-md font-medium">Save settings</button>
      </form>
    </>
  );
}
