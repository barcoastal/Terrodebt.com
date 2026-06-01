import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma } from "@/app/generated/prisma";
import { STATUS_LABELS, type LeadStatus } from "@/lib/lead-funnel";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-slate-100 text-slate-700 border-slate-200",
  lead: "bg-blue-50 text-blue-700 border-blue-200",
  opportunity: "bg-amber-50 text-amber-800 border-amber-200",
  closed_won: "bg-emerald-50 text-emerald-800 border-emerald-200",
  lost: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status as LeadStatus] ?? status;
  const color = STATUS_COLORS[status] ?? "bg-zinc-100 text-zinc-700 border-zinc-200";
  return <span className={`inline-block border rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>{label}</span>;
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ source?: string; status?: string; q?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string }> }) {
  const sp = await searchParams;
  const where: Prisma.LeadWhereInput = {};
  if (sp.source) where.source = sp.source;
  if (sp.status) where.status = sp.status;
  if (sp.utm_source) where.utmSource = sp.utm_source;
  if (sp.utm_medium) where.utmMedium = sp.utm_medium;
  if (sp.utm_campaign) where.utmCampaign = sp.utm_campaign;
  if (sp.q) where.OR = [
    { email: { contains: sp.q, mode: "insensitive" } },
    { firstName: { contains: sp.q, mode: "insensitive" } },
    { lastName: { contains: sp.q, mode: "insensitive" } },
    { businessName: { contains: sp.q, mode: "insensitive" } },
  ];

  let leads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  let sourceDistinct: { utmSource: string | null }[] = [];
  let mediumDistinct: { utmMedium: string | null }[] = [];
  let campaignDistinct: { utmCampaign: string | null }[] = [];
  try {
    [leads, sourceDistinct, mediumDistinct, campaignDistinct] = await Promise.all([
      db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
      db.lead.findMany({ where: { utmSource: { not: null } }, select: { utmSource: true }, distinct: ["utmSource"], take: 50 }),
      db.lead.findMany({ where: { utmMedium: { not: null } }, select: { utmMedium: true }, distinct: ["utmMedium"], take: 50 }),
      db.lead.findMany({ where: { utmCampaign: { not: null } }, select: { utmCampaign: true }, distinct: ["utmCampaign"], take: 50 }),
    ]);
  } catch {}

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Leads</h1>
        <a href="/api/admin/leads/export" className="bg-electric text-white px-3 py-2 rounded-md text-sm no-underline">Export CSV</a>
      </div>

      <form className="mt-4 grid md:grid-cols-6 gap-2 text-sm">
        <input name="q" defaultValue={sp.q ?? ""} placeholder="search name, email, business..." className="md:col-span-2 border border-border rounded-md px-3 py-2" />
        <select name="utm_source" defaultValue={sp.utm_source ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All utm_source</option>
          {sourceDistinct.map((d) => d.utmSource && <option key={d.utmSource}>{d.utmSource}</option>)}
        </select>
        <select name="utm_medium" defaultValue={sp.utm_medium ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All utm_medium</option>
          {mediumDistinct.map((d) => d.utmMedium && <option key={d.utmMedium}>{d.utmMedium}</option>)}
        </select>
        <select name="utm_campaign" defaultValue={sp.utm_campaign ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All utm_campaign</option>
          {campaignDistinct.map((d) => d.utmCampaign && <option key={d.utmCampaign}>{d.utmCampaign}</option>)}
        </select>
        <select name="status" defaultValue={sp.status ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="lead">Lead</option>
          <option value="opportunity">Opportunity</option>
          <option value="closed_won">Closed Won</option>
          <option value="lost">Lost</option>
        </select>
        <button className="bg-slate text-white px-3 py-2 rounded-md md:col-span-6">Filter</button>
      </form>

      <div className="mt-4 overflow-x-auto bg-white border border-border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left">
            <tr>
              <th className="px-3 py-2">Time</th>
              <th>Name</th>
              <th>Business</th>
              <th>Email</th>
              <th>Source</th>
              <th>utm_source</th>
              <th>utm_medium</th>
              <th>utm_campaign</th>
              <th>Debt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr><td className="px-3 py-4 text-muted" colSpan={10}>No leads match these filters.</td></tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-3 py-2"><Link href={`/admin/leads/${l.id}`}>{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</Link></td>
                <td>{l.firstName} {l.lastName}</td>
                <td>{l.businessName}</td>
                <td>{l.email}</td>
                <td className="font-mono text-xs">{l.source}</td>
                <td className="font-mono text-xs">{l.utmSource ?? "-"}</td>
                <td className="font-mono text-xs">{l.utmMedium ?? "-"}</td>
                <td className="font-mono text-xs">{l.utmCampaign ?? "-"}</td>
                <td>{l.debtAmountBucket ?? "-"}</td>
                <td><StatusBadge status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
