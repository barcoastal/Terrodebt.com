import Link from "next/link";
import { db } from "@/lib/db";

const PAGE_SIZE = 50;

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ status?: string; platform?: string; source?: string; page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where: Record<string, string> = {};
  if (sp.status) where.status = sp.status;
  if (sp.platform) where.platform = sp.platform;
  if (sp.source) where.source = sp.source;

  let total = 0;
  let events: Awaited<ReturnType<typeof db.eventFire.findMany>> = [];
  let sentCount = 0;
  let failedCount = 0;
  try {
    [total, events, sentCount, failedCount] = await Promise.all([
      db.eventFire.count({ where }),
      db.eventFire.findMany({ where, orderBy: { createdAt: "desc" }, take: PAGE_SIZE, skip }),
      db.eventFire.count({ where: { ...where, status: "sent" } }),
      db.eventFire.count({ where: { ...where, status: "failed" } }),
    ]);
  } catch {}

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Event center — outbound</h1>
        <Link href="/admin/postbacks" className="text-sm text-muted hover:text-slate">Inbound postbacks →</Link>
      </div>
      <p className="text-sm text-muted mt-1">Every conversion event sent to Google Ads (or other platforms), with status and error details. Auto-fired at form submit, manually from a lead, triggered by a postback, or bulk.</p>

      <form className="mt-4 flex flex-wrap gap-2 text-sm">
        <select name="status" defaultValue={sp.status ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All statuses</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
        </select>
        <select name="platform" defaultValue={sp.platform ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All platforms</option>
          <option value="google_ads">Google Ads</option>
        </select>
        <select name="source" defaultValue={sp.source ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All sources</option>
          <option value="auto-on-submit">Auto on submit</option>
          <option value="manual-admin">Manual (admin)</option>
          <option value="postback">From postback</option>
          <option value="bulk">Bulk</option>
        </select>
        <button className="bg-slate text-white px-3 py-2 rounded-md">Filter</button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Total fires" value={total} />
        <Stat label="Sent" value={sentCount} />
        <Stat label="Failed" value={failedCount} />
      </div>

      <div className="mt-6 surface-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left">
            <tr>
              <th className="px-3 py-2">When</th>
              <th>Platform</th>
              <th>Action ID</th>
              <th>Lead</th>
              <th>Source</th>
              <th>Status</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-4 text-muted">No events yet.</td></tr>
            )}
            {events.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{e.createdAt.toISOString().slice(0, 19).replace("T", " ")}</td>
                <td>{e.platform}</td>
                <td className="font-mono text-xs">{e.conversionActionId ?? "default"}</td>
                <td className="text-xs">
                  {e.leadId ? <Link href={`/admin/leads/${e.leadId}`} className="text-electric">{e.leadId.slice(0, 8)}…</Link> : "-"}
                </td>
                <td className="text-xs">{e.source}</td>
                <td>
                  {e.status === "sent" ? (
                    <span className="text-emerald-700 text-xs font-semibold">✓ sent</span>
                  ) : (
                    <span className="text-red-700 text-xs font-semibold">✗ failed</span>
                  )}
                </td>
                <td className="text-xs text-muted max-w-md truncate">{e.errorMessage ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-muted">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 && <Link href={`/admin/events?page=${page - 1}`} className="px-3 py-1 border border-border rounded-md no-underline">Previous</Link>}
          {page < totalPages && <Link href={`/admin/events?page=${page + 1}`} className="px-3 py-1 border border-border rounded-md no-underline">Next</Link>}
        </div>
      </div>
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
