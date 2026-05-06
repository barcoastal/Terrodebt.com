import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateLeadStatus } from "./actions";

const STATUSES = ["new", "contacted", "qualified", "signed", "dead"];

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let lead: Awaited<ReturnType<typeof db.lead.findUnique>> = null;
  try { lead = await db.lead.findUnique({ where: { id } }); } catch {}
  if (!lead) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">{lead.firstName} {lead.lastName}</h1>
      <p className="text-muted">{lead.businessName}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Field label="Email" value={lead.email} />
        <Field label="Phone" value={lead.phone} />
        <Field label="Has MCA debt" value={lead.hasMcaDebt ? "Yes" : "No"} />
        <Field label="Debt bucket" value={lead.debtAmountBucket ?? "-"} />
        <Field label="Source" value={lead.source} />
        <Field label="Created" value={lead.createdAt.toISOString()} />
        <Field label="UTM source" value={lead.utmSource ?? "-"} />
        <Field label="UTM campaign" value={lead.utmCampaign ?? "-"} />
        <Field label="gclid" value={lead.gclid ?? "-"} />
        <Field label="fbclid" value={lead.fbclid ?? "-"} />
        <Field label="eli_clickid" value={lead.eliClickid ?? "-"} />
        <Field label="IP" value={lead.ip ?? "-"} />
      </div>

      <form action={async (fd: FormData) => { "use server"; await updateLeadStatus(id, String(fd.get("status"))); }} className="mt-6 flex gap-2 items-center">
        <label className="text-sm">Status</label>
        <select name="status" defaultValue={lead.status} className="border border-border rounded-md px-3 py-2">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="bg-electric text-white px-3 py-2 rounded-md">Update</button>
      </form>

      <h2 className="text-lg font-semibold mt-8">Integration status</h2>
      <pre className="bg-white border border-border rounded-md p-4 mt-2 text-xs overflow-auto">{JSON.stringify(lead.integrationStatus, null, 2)}</pre>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <div className="bg-white border border-border rounded-md p-3"><div className="text-xs text-muted uppercase">{label}</div><div className="mt-1 text-slate text-sm break-all">{value}</div></div>;
}
