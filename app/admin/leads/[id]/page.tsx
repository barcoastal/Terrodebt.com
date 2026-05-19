import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateLeadStatus } from "./actions";

const STATUSES = ["new", "contacted", "qualified", "signed", "dead"];

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

      {/* Status update */}
      <h2 className="text-lg font-semibold mt-10">Update status</h2>
      <form action={async (fd: FormData) => { "use server"; await updateLeadStatus(id, String(fd.get("status"))); }} className="mt-3 flex gap-2 items-center">
        <select name="status" defaultValue={lead.status} className="border border-border rounded-md px-3 py-2">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="bg-electric text-white px-3 py-2 rounded-md">Update</button>
      </form>

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
