import Link from "next/link";
import { db } from "@/lib/db";
import { saveConversionAction, deleteConversionAction, fireEvent, bulkFire } from "./actions";

const PAGE_SIZE = 30;

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  type LeadOpt = { id: string; firstName: string; lastName: string; businessName: string; email: string; createdAt: Date; status: string; gclid: string | null };
  let savedActions: Awaited<ReturnType<typeof db.conversionAction.findMany>> = [];
  let totalFires = 0;
  let sentCount = 0;
  let failedCount = 0;
  let fires: Awaited<ReturnType<typeof db.eventFire.findMany>> = [];
  let recentLeadsWithGclid: LeadOpt[] = [];
  let leadsWithGclidCount = 0;
  let opportunityWithGclidCount = 0;
  let closedWonWithGclidCount = 0;

  try {
    [savedActions, totalFires, sentCount, failedCount, fires, recentLeadsWithGclid, leadsWithGclidCount, opportunityWithGclidCount, closedWonWithGclidCount] = await Promise.all([
      db.conversionAction.findMany({ orderBy: { createdAt: "asc" } }),
      db.eventFire.count(),
      db.eventFire.count({ where: { status: "sent" } }),
      db.eventFire.count({ where: { status: "failed" } }),
      db.eventFire.findMany({ orderBy: { createdAt: "desc" }, take: PAGE_SIZE, skip }),
      db.lead.findMany({
        where: { gclid: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: { id: true, firstName: true, lastName: true, businessName: true, email: true, createdAt: true, status: true, gclid: true },
      }),
      db.lead.count({ where: { gclid: { not: null } } }),
      db.lead.count({ where: { gclid: { not: null }, status: "opportunity" } }),
      db.lead.count({ where: { gclid: { not: null }, status: "closed_won" } }),
    ]);
  } catch {}

  const totalPages = Math.max(1, Math.ceil(totalFires / PAGE_SIZE));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Event center</h1>
        <Link href="/admin/postbacks" className="text-sm text-muted hover:text-slate">Inbound postbacks →</Link>
      </div>
      <p className="text-sm text-muted mt-1">Send conversion events to Google Ads. Auto-fires on form submit, manually per lead, in bulk by status, or triggered from an inbound postback.</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Total fires" value={totalFires} />
        <Stat label="Sent" value={sentCount} accent="emerald" />
        <Stat label="Failed" value={failedCount} accent="red" />
      </div>

      {/* Saved conversion actions */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Event names → Google Ads action IDs</h2>
        <p className="text-sm text-muted mt-1">Each entry below maps a friendly event name (e.g. <code className="font-mono text-xs">opportunity</code>) to a Google Ads conversion action ID. Postbacks can reference either <code className="font-mono text-xs">event=opportunity</code> or <code className="font-mono text-xs">conversion_action_id=7631584923</code>.</p>

        <form action={async () => { "use server"; const { seedDefaultConversionActions } = await import("./actions"); await seedDefaultConversionActions(); }} className="mt-3">
          <button className="text-xs text-electric underline">Seed default funnel events (Lead / Opportunity / Closed Won)</button>
        </form>

        <form action={saveConversionAction} className="mt-4 flex flex-wrap gap-2 items-end">
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Name</label>
            <input name="name" required placeholder="e.g. Lead, Qualified, Signed, Won" className="border border-border rounded-md px-3 py-2 text-sm min-w-[200px]" />
          </div>
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Conversion action ID</label>
            <input name="actionId" required placeholder="e.g. 7574577358" className="border border-border rounded-md px-3 py-2 font-mono text-sm min-w-[200px]" />
          </div>
          <button className="bg-slate text-white px-4 py-2 rounded-md text-sm">Save action</button>
        </form>

        {savedActions.length > 0 && (
          <div className="mt-5 surface-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-offwhite text-left">
                <tr><th className="px-3 py-2">Name</th><th>Action ID</th><th>Platform</th><th></th></tr>
              </thead>
              <tbody>
                {savedActions.map((a) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold">{a.name}</td>
                    <td className="font-mono text-xs">{a.actionId}</td>
                    <td className="text-xs">{a.platform}</td>
                    <td className="text-right pr-3">
                      <form action={async () => { "use server"; await deleteConversionAction(a.id); }}>
                        <button className="text-xs text-red-700 hover:underline">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Fire single event */}
      <section className="mt-12 surface-card p-6">
        <h2 className="text-lg font-semibold">Fire a single event</h2>
        <p className="text-sm text-muted mt-1">Pick a recent lead with a stored gclid, choose a saved conversion action or paste an ID, and fire.</p>

        <form action={fireEvent} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Lead</label>
            <select name="leadId" required className="w-full border border-border rounded-md px-3 py-2 text-sm">
              <option value="">— Select a lead with gclid —</option>
              {recentLeadsWithGclid.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.createdAt.toISOString().slice(0, 10)} · {l.firstName} {l.lastName} · {l.businessName} · {l.status}
                </option>
              ))}
            </select>
            {leadsWithGclidCount === 0 && (
              <p className="text-xs text-red-700 mt-1">No leads with a stored gclid yet. Ads-sourced submissions populate this.</p>
            )}
          </div>
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Conversion action</label>
            <select name="conversionActionId" className="w-full border border-border rounded-md px-3 py-2 text-sm">
              <option value="">Default (Settings → Default conversion action ID)</option>
              {savedActions.map((a) => (
                <option key={a.id} value={a.actionId}>{a.name} · {a.actionId}</option>
              ))}
            </select>
            <p className="text-xs text-muted mt-1">Or override below with a raw action ID.</p>
            <input name="conversionActionId" placeholder="Or paste a raw action ID here" className="mt-2 w-full border border-border rounded-md px-3 py-2 font-mono text-sm" />
          </div>
          <button className="bg-electric text-white px-5 py-2.5 rounded-md text-sm font-medium">Fire event</button>
        </form>
      </section>

      {/* Bulk fire */}
      <section className="mt-12 surface-card p-6 bg-offwhite">
        <h2 className="text-lg font-semibold">Bulk fire</h2>
        <p className="text-sm text-muted mt-1">Fire the same conversion action across multiple leads matching a filter. Use this to backfill historical conversions after wiring a new action ID, or to send a funnel-stage event to a batch.</p>

        <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
          <div className="surface-card p-3">
            <div className="text-xs text-muted">All leads with gclid</div>
            <div className="text-xl font-bold text-slate">{leadsWithGclidCount}</div>
          </div>
          <div className="surface-card p-3">
            <div className="text-xs text-muted">Opportunity + gclid</div>
            <div className="text-xl font-bold text-slate">{opportunityWithGclidCount}</div>
          </div>
          <div className="surface-card p-3">
            <div className="text-xs text-muted">Closed Won + gclid</div>
            <div className="text-xl font-bold text-slate">{closedWonWithGclidCount}</div>
          </div>
        </div>

        <form action={bulkFire} className="mt-4 flex flex-wrap gap-2 items-end">
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Filter</label>
            <select name="filter" defaultValue="all-with-gclid" className="border border-border rounded-md px-3 py-2 text-sm">
              <option value="all-with-gclid">All with gclid</option>
              <option value="lead">Lead + gclid</option>
              <option value="opportunity">Opportunity + gclid</option>
              <option value="closed_won">Closed Won + gclid</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Limit</label>
            <input name="limit" type="number" min={1} max={100} defaultValue={10} className="border border-border rounded-md px-3 py-2 text-sm w-24" />
          </div>
          <div className="flex-1 min-w-[240px]">
            <label className="block text-xs text-muted uppercase tracking-wide mb-1">Conversion action (saved or raw)</label>
            <select name="conversionActionId" className="w-full border border-border rounded-md px-3 py-2 text-sm">
              <option value="">Default</option>
              {savedActions.map((a) => <option key={a.id} value={a.actionId}>{a.name} · {a.actionId}</option>)}
            </select>
          </div>
          <button className="bg-slate text-white px-4 py-2 rounded-md text-sm">Bulk fire</button>
        </form>
        <p className="mt-2 text-xs text-muted">Bulk fires write one EventFire row per lead, with source = bulk.</p>
      </section>

      {/* Log */}
      <h2 className="text-lg font-semibold mt-12">Recent fires</h2>
      <div className="mt-3 surface-card overflow-x-auto">
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
            {fires.length === 0 && <tr><td colSpan={7} className="px-3 py-4 text-muted">No events fired yet.</td></tr>}
            {fires.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{e.createdAt.toISOString().slice(0, 19).replace("T", " ")}</td>
                <td>{e.platform}</td>
                <td className="font-mono text-xs">{e.conversionActionId ?? "default"}</td>
                <td className="text-xs">
                  {e.leadId ? <Link href={`/admin/leads/${e.leadId}`} className="text-electric">{e.leadId.slice(0, 8)}…</Link> : "-"}
                </td>
                <td className="text-xs">{e.source}</td>
                <td>{e.status === "sent" ? <span className="text-emerald-700 text-xs font-semibold">✓ sent</span> : <span className="text-red-700 text-xs font-semibold">✗ failed</span>}</td>
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

function Stat({ label, value, accent }: { label: string; value: number; accent?: "emerald" | "red" }) {
  const valueClass = accent === "emerald" ? "text-emerald-700" : accent === "red" ? "text-red-700" : "text-slate";
  return (
    <div className="surface-card p-4">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${valueClass}`}>{value}</div>
    </div>
  );
}
