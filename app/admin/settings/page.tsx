import { db } from "@/lib/db";
import { saveSettings } from "./actions";

const KEYS = ["site_phone", "aggregate_resolved_dollars", "bbb_status", "slack_leads_webhook_url", "coastal_crm_webhook_url", "ga4_measurement_id", "google_ads_conversion_id"] as const;

export default async function SettingsPage() {
  const map: Record<string, unknown> = {};
  try {
    const all = await db.setting.findMany();
    for (const s of all) map[s.key] = s.value;
  } catch {}

  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <form action={saveSettings} className="mt-6 space-y-4 max-w-xl">
        {KEYS.map((k) => (
          <div key={k}>
            <label className="block text-sm font-medium mb-1">{k}</label>
            <input name={k} defaultValue={map[k] !== undefined ? String(map[k]) : ""} className="w-full border border-border rounded-md px-3 py-2" />
          </div>
        ))}
        <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Save</button>
      </form>
    </>
  );
}
