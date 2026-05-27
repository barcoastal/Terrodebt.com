import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma } from "@/app/generated/prisma";
import { visitorSource } from "@/lib/visitor-source";

const PAGE_SIZE = 50;

type WindowKey = "24h" | "7d" | "30d" | "all";
const WINDOW_LABELS: Record<WindowKey, string> = {
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "all": "All time",
};

function windowSince(w: WindowKey): Date | null {
  if (w === "all") return null;
  const days = w === "24h" ? 1 : w === "7d" ? 7 : 30;
  return new Date(Date.now() - days * 86400e3);
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 16).replace("T", " ");
}

export default async function VisitorsPage({ searchParams }: { searchParams: Promise<{ q?: string; source?: string; window?: WindowKey; page?: string }> }) {
  const sp = await searchParams;
  const win: WindowKey = (sp.window as WindowKey) ?? "30d";
  const since = windowSince(win);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where: Prisma.VisitorWhereInput = {};
  if (since) where.lastSeen = { gte: since };
  if (sp.source) where.utmSource = sp.source;
  if (sp.q) {
    where.OR = [
      { ip: { contains: sp.q, mode: "insensitive" } },
      { utmSource: { contains: sp.q, mode: "insensitive" } },
      { utmCampaign: { contains: sp.q, mode: "insensitive" } },
    ];
  }

  let total = 0;
  let pageviewSum = 0;
  let visitors: Awaited<ReturnType<typeof db.visitor.findMany>> = [];
  let bySource: Array<{ name: string; count: number; conv: number }> = [];
  let byCampaign: Array<{ name: string; count: number; conv: number }> = [];
  let convertedClickIds = new Set<string>();
  let topSourceLabel = "(none)";
  let allSources: string[] = [];

  try {
    total = await db.visitor.count({ where });

    const agg = await db.visitor.aggregate({ where, _sum: { pageViews: true } });
    pageviewSum = agg._sum.pageViews ?? 0;

    visitors = await db.visitor.findMany({ where, orderBy: { lastSeen: "desc" }, take: PAGE_SIZE, skip });

    const sources = await db.visitor.groupBy({ by: ["utmSource"], _count: { _all: true }, where, orderBy: { _count: { utmSource: "desc" } }, take: 10 });
    const camps = await db.visitor.groupBy({ by: ["utmCampaign"], _count: { _all: true }, where, orderBy: { _count: { utmCampaign: "desc" } }, take: 10 });

    // Get list of eliClickids that converted to leads (within filtered visitors).
    const visitorClickIds = await db.visitor.findMany({ where, select: { eliClickid: true } });
    const ids = visitorClickIds.map((v) => v.eliClickid).filter(Boolean) as string[];
    if (ids.length > 0) {
      const convertedLeads = await db.lead.findMany({ where: { eliClickid: { in: ids } }, select: { eliClickid: true } });
      convertedClickIds = new Set(convertedLeads.map((l) => l.eliClickid).filter(Boolean) as string[]);
    }

    // Per-source conversion: count converted visitors with that utmSource.
    const sourceConvCounts = new Map<string | null, number>();
    const campConvCounts = new Map<string | null, number>();
    if (convertedClickIds.size > 0) {
      const convertedVisitors = await db.visitor.findMany({
        where: { ...where, eliClickid: { in: Array.from(convertedClickIds) } },
        select: { utmSource: true, utmCampaign: true },
      });
      for (const v of convertedVisitors) {
        sourceConvCounts.set(v.utmSource, (sourceConvCounts.get(v.utmSource) ?? 0) + 1);
        campConvCounts.set(v.utmCampaign, (campConvCounts.get(v.utmCampaign) ?? 0) + 1);
      }
    }

    bySource = sources.map((s) => {
      const count = s._count._all ?? 0;
      const conv = sourceConvCounts.get(s.utmSource) ?? 0;
      return { name: s.utmSource ?? "(none)", count, conv: count > 0 ? (conv / count) * 100 : 0 };
    });
    byCampaign = camps.map((c) => {
      const count = c._count._all ?? 0;
      const conv = campConvCounts.get(c.utmCampaign) ?? 0;
      return { name: c.utmCampaign ?? "(none)", count, conv: count > 0 ? (conv / count) * 100 : 0 };
    });

    if (bySource.length > 0) topSourceLabel = bySource[0].name;

    const distinctSources = await db.visitor.groupBy({ by: ["utmSource"], _count: { _all: true } });
    allSources = distinctSources.map((s) => s.utmSource).filter((s): s is string => Boolean(s)).sort();
  } catch {}

  const convCount = visitors.filter((v) => v.eliClickid && convertedClickIds.has(v.eliClickid)).length;
  const overallConv = total > 0 ? ((convertedClickIds.size / total) * 100).toFixed(2) : "0.00";

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Visitors</h1>
        <div className="text-xs text-muted">{WINDOW_LABELS[win]}</div>
      </div>

      <form className="mt-4 flex flex-wrap gap-2 text-sm">
        <input name="q" defaultValue={sp.q ?? ""} placeholder="search by IP, UTM source, or campaign" className="border border-border rounded-md px-3 py-2 flex-1 min-w-[240px]" />
        <select name="source" defaultValue={sp.source ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All sources</option>
          {allSources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="window" defaultValue={win} className="border border-border rounded-md px-3 py-2">
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="all">All time</option>
        </select>
        <button className="bg-slate text-white px-3 py-2 rounded-md">Filter</button>
      </form>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Stat label="Total visitors" value={total.toLocaleString()} />
        <Stat label="Total pageviews" value={pageviewSum.toLocaleString()} />
        <Stat label="Conversion rate" value={`${overallConv}%`} />
        <Stat label="Top source" value={topSourceLabel} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div>
          <h2 className="text-lg font-semibold">Top sources</h2>
          <Table rows={bySource} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Top campaigns</h2>
          <Table rows={byCampaign} />
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-10">Recent visitors</h2>
      <div className="mt-3 surface-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left">
            <tr>
              <th className="px-3 py-2">First seen</th>
              <th>Click ID</th>
              <th>Source</th>
              <th>Country</th>
              <th>Device</th>
              <th>Landing</th>
              <th>Referrer</th>
              <th>UTM</th>
              <th>Campaign</th>
              <th>PV</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length === 0 && (
              <tr><td className="px-3 py-4 text-muted" colSpan={11}>No visitors match these filters.</td></tr>
            )}
            {visitors.map((v) => {
              const converted = v.eliClickid ? convertedClickIds.has(v.eliClickid) : false;
              const refHost = v.referrer ? (() => { try { return new URL(v.referrer).hostname; } catch { return v.referrer; } })() : null;
              const src = visitorSource({
                utmSource: v.utmSource,
                utmMedium: v.utmMedium,
                utmCampaign: v.utmCampaign,
                gclid: v.gclid,
                fbclid: v.fbclid,
                affiliateClickid: v.affiliateClickid,
                referrer: v.referrer,
              });
              return (
                <tr key={v.id} className="border-t border-border hover:bg-offwhite/40">
                  <td className="px-3 py-2">
                    <Link href={`/admin/visitors/${v.id}`}>{fmt(v.firstSeen)}</Link>
                  </td>
                  <td className="font-mono text-xs">
                    <Link href={`/admin/visitors/${v.id}`} className="text-electric no-underline hover:underline">{v.eliClickid}</Link>
                  </td>
                  <td>
                    <span className={`inline-block text-xs font-medium rounded-full px-2 py-0.5 ${
                      src.category === "google-ads" ? "bg-blue-100 text-blue-800" :
                      src.category === "facebook-ads" ? "bg-indigo-100 text-indigo-800" :
                      src.category === "affiliate" ? "bg-amber-100 text-amber-800" :
                      src.category === "organic" ? "bg-emerald-100 text-emerald-800" :
                      src.category === "utm" ? "bg-violet-100 text-violet-800" :
                      src.category === "referral" ? "bg-sky-100 text-sky-800" :
                      "bg-offwhite text-muted"
                    }`}>{src.label}</span>
                  </td>
                  <td>{v.country ?? "-"}</td>
                  <td>{v.deviceType ?? "-"}</td>
                  <td className="font-mono text-xs">{v.landingPath ?? "-"}</td>
                  <td className="text-xs">{refHost ?? "-"}</td>
                  <td>{v.utmSource ?? "-"}</td>
                  <td>{v.utmCampaign ?? "-"}</td>
                  <td className="font-mono">{v.pageViews}</td>
                  <td>
                    {converted ? (
                      <span className="inline-block bg-electric text-white text-xs font-semibold rounded-full px-2 py-0.5">Lead</span>
                    ) : (
                      <span className="inline-block bg-offwhite text-muted text-xs rounded-full px-2 py-0.5">Anonymous</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} sp={sp} convCount={convCount} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="surface-card p-4">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold mt-1 text-slate">{value}</div>
    </div>
  );
}

function Table({ rows }: { rows: { name: string; count: number; conv: number }[] }) {
  return (
    <div className="mt-3 surface-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-offwhite text-left">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th>Count</th>
            <th>Conv %</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td className="px-3 py-4 text-muted" colSpan={3}>No data.</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-border">
              <td className="px-3 py-2">{r.name}</td>
              <td className="font-mono">{r.count}</td>
              <td className="font-mono">{r.conv.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ page, totalPages, sp, convCount }: { page: number; totalPages: number; sp: { q?: string; source?: string; window?: string }; convCount: number }) {
  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (sp.q) params.set("q", sp.q);
    if (sp.source) params.set("source", sp.source);
    if (sp.window) params.set("window", sp.window);
    params.set("page", String(p));
    return `/admin/visitors?${params.toString()}`;
  };
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <div className="text-muted">{convCount} converted on this page · page {page} of {totalPages}</div>
      <div className="flex gap-2">
        {page > 1 && <Link href={buildHref(page - 1)} className="px-3 py-1 border border-border rounded-md no-underline">Previous</Link>}
        {page < totalPages && <Link href={buildHref(page + 1)} className="px-3 py-1 border border-border rounded-md no-underline">Next</Link>}
      </div>
    </div>
  );
}
