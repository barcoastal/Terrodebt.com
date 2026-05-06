import { db } from "@/lib/db";

export default async function VisitorsPage() {
  let total = 0;
  let bySource: Array<{ utmSource: string | null; _count: number }> = [];
  let byCampaign: Array<{ utmCampaign: string | null; _count: number }> = [];
  let totalLeads = 0;
  try {
    const since = new Date(Date.now() - 30 * 86400e3);
    total = await db.visitor.count({ where: { lastSeen: { gte: since } } });
    const sources = await db.visitor.groupBy({ by: ["utmSource"], _count: true, where: { lastSeen: { gte: since } }, orderBy: { _count: { utmSource: "desc" } }, take: 10 });
    bySource = sources.map((s) => ({ utmSource: s.utmSource, _count: typeof s._count === "number" ? s._count : 0 }));
    const camps = await db.visitor.groupBy({ by: ["utmCampaign"], _count: true, where: { lastSeen: { gte: since } }, orderBy: { _count: { utmCampaign: "desc" } }, take: 10 });
    byCampaign = camps.map((c) => ({ utmCampaign: c.utmCampaign, _count: typeof c._count === "number" ? c._count : 0 }));
    totalLeads = await db.lead.count({ where: { createdAt: { gte: since } } });
  } catch {}

  const conv = total > 0 ? ((totalLeads / total) * 100).toFixed(2) : "0";

  return (
    <>
      <h1 className="text-2xl font-bold">Visitors (last 30 days)</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Visitors" value={total} />
        <Stat label="Leads" value={totalLeads} />
        <Stat label="Conversion %" value={conv} />
      </div>
      <h2 className="text-lg font-semibold mt-8">Top UTM sources</h2>
      <Table rows={bySource.map((s) => ({ name: s.utmSource ?? "(none)", count: s._count }))} />
      <h2 className="text-lg font-semibold mt-8">Top campaigns</h2>
      <Table rows={byCampaign.map((c) => ({ name: c.utmCampaign ?? "(none)", count: c._count }))} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return <div className="bg-white border border-border rounded-md p-4"><div className="text-xs text-muted uppercase">{label}</div><div className="text-2xl font-bold mt-1 text-slate">{value}</div></div>;
}

function Table({ rows }: { rows: { name: string; count: number }[] }) {
  return (
    <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
      <thead className="bg-offwhite text-left"><tr><th className="px-3 py-2">Name</th><th>Count</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.name} className="border-t border-border"><td className="px-3 py-2">{r.name}</td><td>{r.count}</td></tr>)}</tbody>
    </table>
  );
}
