import Link from "next/link";
import { db } from "@/lib/db";
import { visitorSource } from "@/lib/visitor-source";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let leads24h = 0, leads7d = 0, totalLeads = 0;
  let visitors24h = 0, visitors7d = 0, totalVisitors = 0;
  let recentLeads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  let topVisitors: Awaited<ReturnType<typeof db.visitor.findMany>> = [];

  try {
    [leads24h, leads7d, totalLeads, visitors24h, visitors7d, totalVisitors] = await Promise.all([
      db.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 86400e3) } } }),
      db.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 86400e3) } } }),
      db.lead.count(),
      db.visitor.count({ where: { lastSeen: { gte: new Date(Date.now() - 86400e3) } } }),
      db.visitor.count({ where: { lastSeen: { gte: new Date(Date.now() - 7 * 86400e3) } } }),
      db.visitor.count(),
    ]);
    recentLeads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
    topVisitors = await db.visitor.findMany({
      where: { lastSeen: { gte: new Date(Date.now() - 7 * 86400e3) } },
      orderBy: { lastSeen: "desc" },
      take: 200,
    });
  } catch {}

  // Aggregate source counts from recent visitors
  const sourceCounts = new Map<string, { count: number; category: string }>();
  for (const v of topVisitors) {
    const src = visitorSource({
      utmSource: v.utmSource,
      utmMedium: v.utmMedium,
      utmCampaign: v.utmCampaign,
      gclid: v.gclid,
      fbclid: v.fbclid,
      affiliateClickid: v.affiliateClickid,
      referrer: v.referrer,
    });
    const existing = sourceCounts.get(src.label);
    sourceCounts.set(src.label, { count: (existing?.count ?? 0) + 1, category: src.category });
  }
  const topSources = Array.from(sourceCounts.entries())
    .map(([label, v]) => ({ label, count: v.count, category: v.category }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        <Stat label="Leads 24h" value={leads24h} />
        <Stat label="Leads 7d" value={leads7d} />
        <Stat label="Total leads" value={totalLeads} />
        <Stat label="Visitors 24h" value={visitors24h} />
        <Stat label="Visitors 7d" value={visitors7d} />
        <Stat label="Total visitors" value={totalVisitors} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top visitor sources (last 7 days)</h2>
            <Link href="/admin/visitors" className="text-xs text-muted hover:text-slate">All visitors →</Link>
          </div>
          <div className="mt-3 surface-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-offwhite text-left">
                <tr>
                  <th className="px-3 py-2">Source</th>
                  <th>Visitors</th>
                </tr>
              </thead>
              <tbody>
                {topSources.length === 0 && (
                  <tr><td colSpan={2} className="px-3 py-4 text-muted">No visitor data yet.</td></tr>
                )}
                {topSources.map((s) => (
                  <tr key={s.label} className="border-t border-border">
                    <td className="px-3 py-2">
                      <span className={`inline-block text-xs font-medium rounded-full px-2 py-0.5 ${
                        s.category === "google-ads" ? "bg-blue-100 text-blue-800" :
                        s.category === "facebook-ads" ? "bg-indigo-100 text-indigo-800" :
                        s.category === "affiliate" ? "bg-amber-100 text-amber-800" :
                        s.category === "organic" ? "bg-emerald-100 text-emerald-800" :
                        s.category === "utm" ? "bg-violet-100 text-violet-800" :
                        s.category === "referral" ? "bg-sky-100 text-sky-800" :
                        "bg-offwhite text-muted"
                      }`}>{s.label}</span>
                    </td>
                    <td className="font-mono">{s.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent leads</h2>
            <Link href="/admin/leads" className="text-xs text-muted hover:text-slate">All leads →</Link>
          </div>
          <div className="mt-3 surface-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-offwhite text-left text-muted">
                <tr><th className="px-3 py-2">Time</th><th>Name</th><th>Business</th><th>Source</th></tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 && (
                  <tr><td colSpan={4} className="px-3 py-4 text-muted">No leads yet.</td></tr>
                )}
                {recentLeads.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="px-3 py-2">{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
                    <td>{l.firstName} {l.lastName}</td>
                    <td>{l.businessName}</td>
                    <td>{l.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-border rounded-md p-4">
      <div className="text-xs text-muted uppercase">{label}</div>
      <div className="text-2xl font-bold mt-1 text-slate">{value}</div>
    </div>
  );
}
