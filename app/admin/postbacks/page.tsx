import Link from "next/link";
import { db } from "@/lib/db";

const PAGE_SIZE = 50;

export default async function PostbacksPage({ searchParams }: { searchParams: Promise<{ source?: string; status?: string; page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where: Record<string, string> = {};
  if (sp.source) where.source = sp.source;
  if (sp.status) where.status = sp.status;

  let total = 0;
  let postbacks: Awaited<ReturnType<typeof db.postback.findMany>> = [];
  let forwardedCount = 0;
  let linkedCount = 0;
  let allSources: string[] = [];
  try {
    [total, postbacks, forwardedCount, linkedCount] = await Promise.all([
      db.postback.count({ where }),
      db.postback.findMany({ where, orderBy: { createdAt: "desc" }, take: PAGE_SIZE, skip }),
      db.postback.count({ where: { ...where, forwarded: true } }),
      db.postback.count({ where: { ...where, NOT: { linkedLeadId: null } } }),
    ]);
    const grouped = await db.postback.groupBy({ by: ["source"], _count: { _all: true } });
    allSources = grouped.map((g) => g.source).sort();
  } catch {}

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Postbacks — inbound</h1>
        <Link href="/admin/events" className="text-sm text-muted hover:text-slate">Outbound events →</Link>
      </div>
      <p className="text-sm text-muted mt-1">External networks POST/GET <code className="font-mono text-xs">/api/postback</code> to report conversions. The endpoint links by affiliate_clickid, gclid, or eli_clickid; when linked to a lead with a gclid it auto-forwards a Google Ads click conversion.</p>

      <form className="mt-4 flex flex-wrap gap-2 text-sm">
        <select name="source" defaultValue={sp.source ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All sources</option>
          {allSources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="bg-slate text-white px-3 py-2 rounded-md">Filter</button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Total postbacks" value={total} />
        <Stat label="Linked to a lead" value={linkedCount} />
        <Stat label="Forwarded to Google Ads" value={forwardedCount} />
      </div>

      <div className="mt-6 surface-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left">
            <tr>
              <th className="px-3 py-2">When</th>
              <th>Source</th>
              <th>Status</th>
              <th>Payout</th>
              <th>Click ID</th>
              <th>Linked lead</th>
              <th>Forwarded</th>
            </tr>
          </thead>
          <tbody>
            {postbacks.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-4 text-muted">No postbacks received yet.</td></tr>
            )}
            {postbacks.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{p.createdAt.toISOString().slice(0, 19).replace("T", " ")}</td>
                <td>{p.source}</td>
                <td>{p.status ?? "-"}</td>
                <td className="font-mono">{typeof p.payout === "number" ? `$${p.payout.toFixed(2)}` : "-"}</td>
                <td className="font-mono text-xs">{(p.affiliateClickid ?? p.gclid ?? p.eliClickid ?? "-").slice(0, 24)}</td>
                <td className="text-xs">
                  {p.linkedLeadId ? <Link href={`/admin/leads/${p.linkedLeadId}`} className="text-electric">{p.linkedLeadId.slice(0, 8)}…</Link> : <span className="text-muted">unlinked</span>}
                </td>
                <td>
                  {p.forwarded ? (
                    <span className="text-emerald-700 text-xs font-semibold">✓</span>
                  ) : (
                    <span className="text-muted text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-muted">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 && <Link href={`/admin/postbacks?page=${page - 1}`} className="px-3 py-1 border border-border rounded-md no-underline">Previous</Link>}
          {page < totalPages && <Link href={`/admin/postbacks?page=${page + 1}`} className="px-3 py-1 border border-border rounded-md no-underline">Next</Link>}
        </div>
      </div>

      <section className="mt-12 surface-card p-5">
        <h2 className="text-lg font-semibold">How to send a postback</h2>
        <p className="mt-2 text-sm text-muted">Point external networks at the endpoint below. The shared secret is set in <Link href="/admin/settings" className="text-electric">Settings → postback_secret</Link>; without it requests are accepted (open mode) unless one is configured.</p>
        <pre className="mt-4 bg-offwhite border border-border rounded-md p-4 text-xs overflow-auto font-mono">
{`GET  https://businessdebtinsider.com/api/postback?source=NETWORK&affiliate_clickid={CLICK_ID}&payout={AMOUNT}&status={STATUS}&secret=YOUR_SECRET

POST https://businessdebtinsider.com/api/postback
content-type: application/json
authorization: Bearer YOUR_SECRET

{
  "source": "network-name",
  "affiliate_clickid": "{CLICK_ID}",
  "payout": 12.50,
  "status": "sale",
  "conversion_action_id": "12345"  // optional override; otherwise default is used
}`}
        </pre>
        <p className="mt-3 text-xs text-muted">Recognized click-ID parameter names: <code className="font-mono">affiliate_clickid</code>, <code className="font-mono">click_id</code>, <code className="font-mono">clickid</code>, <code className="font-mono">subid</code>, <code className="font-mono">transaction_id</code>, <code className="font-mono">gclid</code>, <code className="font-mono">fbclid</code>, <code className="font-mono">eli_clickid</code>.</p>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface-card p-4">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold mt-1 text-slate">{value}</div>
    </div>
  );
}
