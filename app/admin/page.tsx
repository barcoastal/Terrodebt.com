import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let leads24h = 0, leads7d = 0, totalLeads = 0;
  let recentLeads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  try {
    [leads24h, leads7d, totalLeads] = await Promise.all([
      db.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 86400e3) } } }),
      db.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 86400e3) } } }),
      db.lead.count(),
    ]);
    recentLeads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
  } catch {}

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Leads 24h" value={leads24h} />
        <Stat label="Leads 7d" value={leads7d} />
        <Stat label="Total leads" value={totalLeads} />
      </div>
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Recent leads</h2>
        <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
          <thead className="bg-offwhite text-left text-muted">
            <tr><th className="px-3 py-2">Time</th><th>Name</th><th>Business</th><th>Source</th><th>Debt</th></tr>
          </thead>
          <tbody>
            {recentLeads.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-3 py-2">{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
                <td>{l.firstName} {l.lastName}</td>
                <td>{l.businessName}</td>
                <td>{l.source}</td>
                <td>{l.debtAmountBucket ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="bg-white border border-border rounded-md p-4"><div className="text-xs text-muted uppercase">{label}</div><div className="text-2xl font-bold mt-1 text-slate">{value}</div></div>;
}
