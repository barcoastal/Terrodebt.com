import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateLeadStatus, fireGoogleAdsConversion } from "./actions";
import { LEAD_STATUSES, STATUS_LABELS, STATUS_TO_CONVERSION_ACTION, type LeadStatus } from "@/lib/lead-funnel";

type GaHistoryEntry = { name?: string; ok: boolean; error?: string; at: string; conversionActionId?: string };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let lead: Awaited<ReturnType<typeof db.lead.findUnique>> = null;
  try { lead = await db.lead.findUnique({ where: { id } }); } catch {}
  if (!lead) notFound();

  const status = (lead.integrationStatus ?? {}) as Record<string, unknown>;
  const consent = (status.consent ?? null) as { agreed?: boolean; text?: string; at?: string } | null;

  return (
    <div>
      <div className="flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">{lead.firstName} {lead.lastName}</h1>
          <p className="text-muted">{lead.businessName}</p>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-muted">{lead.createdAt.toISOString()}</span>
      </div>

      {/* Contact */}
      <Section title="Contact">
        <Field label="Email" value={lead.email} />
        <Field label="Phone" value={lead.phone} />
        <Field label="Business name" value={lead.businessName} />
      </Section>

      {/* Qualification */}
      <Section title="Qualification">
        <Field label="Has more than 1 MCA" value={lead.hasMcaDebt ? "Yes" : "No"} />
        <Field label="Debt amount (raw)" value={lead.debtAmount != null ? `$${lead.debtAmount.toLocaleString()}` : "-"} mono />
        <Field label="Debt bucket" value={lead.debtAmountBucket ?? "-"} mono />
        <Field label="Source page" value={lead.source} mono />
        <Field label="Status" value={lead.status} />
      </Section>

      {/* Attribution */}
      <Section title="Attribution (UTM + click IDs)">
        <Field label="utm_source" value={lead.utmSource ?? "-"} mono />
        <Field label="utm_medium" value={lead.utmMedium ?? "-"} mono />
        <Field label="utm_campaign" value={lead.utmCampaign ?? "-"} mono />
        <Field label="utm_content" value={lead.utmContent ?? "-"} mono />
        <Field label="utm_term" value={lead.utmTerm ?? "-"} mono />
        <Field label="gclid" value={lead.gclid ?? "-"} mono />
        <Field label="fbclid" value={lead.fbclid ?? "-"} mono />
        <Field label="affiliate_clickid" value={lead.affiliateClickid ?? "-"} mono />
        <Field label="tkclid" value={lead.tkclid ?? "-"} mono />
        <Field label="eli_clickid" value={lead.eliClickid ?? "-"} mono />
      </Section>

      {/* Device */}
      <Section title="Device">
        <Field label="IP" value={lead.ip ?? "-"} mono />
        <Field label="User agent" value={lead.userAgent ?? "-"} mono full />
      </Section>

      {/* Consent */}
      <Section title="Consent (TCPA)">
        <Field label="Agreed" value={consent?.agreed ? "Yes" : "No"} />
        <Field label="At" value={consent?.at ?? "-"} mono />
        <Field label="Text" value={consent?.text ?? "-"} full />
      </Section>

      {/* Funnel stage */}
      <h2 className="text-lg font-semibold mt-10">Funnel stage</h2>
      <p className="mt-2 text-sm text-muted">
        Updating the stage fires the matching Google Ads conversion (when a gclid is present). Closed Won uploads the deal value entered below.
      </p>
      <form
        action={async (fd: FormData) => {
          "use server";
          const status = String(fd.get("status"));
          const dealValueRaw = String(fd.get("dealValue") || "").trim();
          const dealValue = dealValueRaw ? Number(dealValueRaw) : undefined;
          await updateLeadStatus(id, status, Number.isFinite(dealValue) ? dealValue : undefined);
        }}
        className="mt-3 flex flex-wrap gap-2 items-center"
      >
        <select name="status" defaultValue={lead.status} className="border border-border rounded-md px-3 py-2">
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
              {STATUS_TO_CONVERSION_ACTION[s] ? ` → fires ${STATUS_TO_CONVERSION_ACTION[s]}` : ""}
            </option>
          ))}
        </select>
        <input
          name="dealValue"
          type="number"
          min="0"
          step="1"
          placeholder="Deal $ (Closed Won only)"
          className="border border-border rounded-md px-3 py-2 font-mono text-sm w-56"
        />
        <button className="bg-electric text-white px-3 py-2 rounded-md">Update</button>
        {!lead.gclid && <span className="text-xs text-muted">No gclid on lead — status will save but no Google Ads event will fire.</span>}
      </form>

      {/* Google Ads conversion */}
      <h2 className="text-lg font-semibold mt-10">Send event to Google Ads</h2>
      {!lead.gclid ? (
        <p className="mt-2 text-sm text-muted">No gclid stored on this lead. Cannot fire a Google Ads conversion (would need the click ID that brought the user to the site).</p>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted">
            Fires a click-conversion upload via Google Ads API using the stored gclid. Leave the action ID empty to use the default (env: <code className="font-mono text-xs">GOOGLE_ADS_CONVERSION_ACTION_ID</code>), or paste a specific conversion action ID to fire a funnel-stage event (e.g. Qualified, Booked, Closed-Won).
          </p>
          <form
            action={async (fd: FormData) => { "use server"; await fireGoogleAdsConversion(id, String(fd.get("conversionActionId") || "") || undefined); }}
            className="mt-3 flex gap-2 items-center flex-wrap"
          >
            <input
              name="conversionActionId"
              placeholder="Conversion action ID (optional)"
              className="border border-border rounded-md px-3 py-2 font-mono text-sm min-w-[300px]"
            />
            <button className="bg-slate text-white px-3 py-2 rounded-md">Fire conversion</button>
          </form>

          {(() => {
            const status = (lead.integrationStatus ?? {}) as Record<string, unknown>;
            const gaHistory = Array.isArray(status.gaHistory) ? (status.gaHistory as GaHistoryEntry[]) : [];
            if (gaHistory.length === 0) return null;
            return (
              <div className="mt-4 surface-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-offwhite text-left">
                    <tr>
                      <th className="px-3 py-2">At</th>
                      <th>Action ID</th>
                      <th>Status</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...gaHistory].reverse().map((h, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-3 py-2 font-mono text-xs">{h.at}</td>
                        <td className="font-mono text-xs">{h.conversionActionId ?? "default"}</td>
                        <td>
                          {h.ok ? <span className="text-emerald-700 text-xs font-semibold">✓ sent</span> : <span className="text-red-700 text-xs font-semibold">✗ failed</span>}
                        </td>
                        <td className="text-xs text-muted">{h.error ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </>
      )}

      {/* Raw */}
      <h2 className="text-lg font-semibold mt-10">Raw integration status</h2>
      <pre className="bg-white border border-border rounded-md p-4 mt-2 text-xs overflow-auto">{JSON.stringify(lead.integrationStatus, null, 2)}</pre>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-mono uppercase tracking-wider text-muted">{title}</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </section>
  );
}

function Field({ label, value, mono, full }: { label: string; value: string; mono?: boolean; full?: boolean }) {
  return (
    <div className={`bg-white border border-border rounded-md p-3 ${full ? "md:col-span-2" : ""}`}>
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className={`mt-1 text-slate text-sm break-all ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}
