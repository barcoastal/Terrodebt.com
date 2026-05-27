import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { visitorSource } from "@/lib/visitor-source";

function fmt(d: Date | null | undefined): string {
  if (!d) return "-";
  return d.toISOString().slice(0, 19).replace("T", " ");
}

export default async function VisitorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let visitor: Awaited<ReturnType<typeof db.visitor.findUnique>> = null;
  try { visitor = await db.visitor.findUnique({ where: { id } }); } catch {}
  if (!visitor) notFound();

  let leads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  if (visitor.eliClickid) {
    try {
      leads = await db.lead.findMany({
        where: { eliClickid: visitor.eliClickid },
        orderBy: { createdAt: "desc" },
      });
    } catch {}
  }

  let pageHits: Awaited<ReturnType<typeof db.pageHit.findMany>> = [];
  try {
    pageHits = await db.pageHit.findMany({
      where: { visitorId: visitor.id },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {}

  // Fingerprint stats
  const firstSeenMs = visitor.firstSeen.getTime();
  const lastSeenMs = visitor.lastSeen.getTime();
  const daysActive = Math.max(1, Math.ceil((lastSeenMs - firstSeenMs) / 86400e3));
  const pageviewsPerDay = (visitor.pageViews / daysActive).toFixed(2);
  const isReturning = lastSeenMs - firstSeenMs > 60 * 60 * 1000;

  return (
    <>
      <Link href="/admin/visitors" className="text-sm text-muted no-underline">&larr; Back to visitors</Link>
      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Visitor</h1>
        {leads.length > 0 ? (
          <span className="inline-block bg-electric text-white text-xs font-semibold rounded-full px-3 py-1">{leads.length} lead{leads.length === 1 ? "" : "s"}</span>
        ) : (
          <span className="inline-block bg-offwhite text-muted text-xs rounded-full px-3 py-1">Anonymous</span>
        )}
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <div className="surface-card p-5 bg-offwhite">
          <div className="text-xs text-muted uppercase tracking-wide">Click ID</div>
          <div className="mt-1 text-xl font-mono font-bold text-slate break-all">{visitor.eliClickid}</div>
          <div className="mt-1 text-xs text-muted">Pass this as a subid/click parameter when sending outbound traffic to partners so their postback links back to this visitor.</div>
        </div>
        <div className="surface-card p-5 bg-offwhite">
          {(() => {
            const src = visitorSource({
              utmSource: visitor.utmSource,
              utmMedium: visitor.utmMedium,
              utmCampaign: visitor.utmCampaign,
              gclid: visitor.gclid,
              fbclid: visitor.fbclid,
              affiliateClickid: visitor.affiliateClickid,
              referrer: visitor.referrer,
            });
            return (
              <>
                <div className="text-xs text-muted uppercase tracking-wide">Source</div>
                <div className="mt-1 text-xl font-bold text-slate">{src.label}</div>
                <div className="mt-1 text-xs text-muted">Category: {src.category}{src.detail ? ` · ${src.detail}` : ""}</div>
              </>
            );
          })()}
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-6">Identity</h2>
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <Field label="eli_clickid" value={visitor.eliClickid} mono />
        <Field label="IP address" value={visitor.ip} mono />
        <Field label="User agent" value={visitor.userAgent} />
        <Field label="First seen" value={fmt(visitor.firstSeen)} />
        <Field label="Last seen" value={fmt(visitor.lastSeen)} />
        <Field label="Total pageviews" value={String(visitor.pageViews)} mono />
      </div>

      <h2 className="text-lg font-semibold mt-8">Origin</h2>
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <Field label="Country" value={visitor.country} />
        <Field label="Region" value={visitor.region} />
        <Field label="City" value={visitor.city} />
        <Field label="Device type" value={visitor.deviceType} />
        <Field label="Landing page" value={visitor.landingPath} mono />
        <Field label="Referrer" value={visitor.referrer} />
      </div>

      <h2 className="text-lg font-semibold mt-8">UTM and click IDs</h2>
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <Field label="utm_source" value={visitor.utmSource} />
        <Field label="utm_medium" value={visitor.utmMedium} />
        <Field label="utm_campaign" value={visitor.utmCampaign} />
        <Field label="utm_content" value={visitor.utmContent} />
        <Field label="utm_term" value={visitor.utmTerm} />
        <Field label="gclid" value={visitor.gclid} mono />
        <Field label="fbclid" value={visitor.fbclid} mono />
        <Field label="affiliate_clickid" value={visitor.affiliateClickid} mono />
      </div>

      <h2 className="text-lg font-semibold mt-8">Behavior fingerprint</h2>
      <div className="mt-3 grid md:grid-cols-3 gap-3">
        <Field label="Days active" value={String(daysActive)} mono />
        <Field label="Pageviews per day" value={pageviewsPerDay} mono />
        <Field label="Visit type" value={isReturning ? "Returning" : "First-time"} />
      </div>

      <h2 className="text-lg font-semibold mt-8">Page hits ({pageHits.length})</h2>
      {pageHits.length === 0 ? (
        <div className="mt-3 surface-card p-4 text-sm text-muted">No pageviews recorded for this visitor yet. (Page-hit history starts tracking from the next deploy onward.)</div>
      ) : (
        <div className="mt-3 surface-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-offwhite text-left">
              <tr>
                <th className="px-3 py-2">When</th>
                <th>Path</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {pageHits.map((h) => (
                <tr key={h.id} className="border-t border-border">
                  <td className="px-3 py-2 font-mono text-xs">{fmt(h.createdAt)}</td>
                  <td className="font-mono text-xs">{h.path}</td>
                  <td className="text-xs">{h.referrer ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-8">Linked leads</h2>
      {leads.length === 0 ? (
        <div className="mt-3 surface-card p-4 text-sm text-muted">No leads linked to this visitor.</div>
      ) : (
        <div className="mt-3 surface-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-offwhite text-left">
              <tr>
                <th className="px-3 py-2">Submitted</th>
                <th>Business</th>
                <th>Source</th>
                <th>Debt</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-3 py-2">{fmt(l.createdAt)}</td>
                  <td>{l.businessName}</td>
                  <td>{l.source}</td>
                  <td className="font-mono">{l.debtAmount ? `$${l.debtAmount.toLocaleString()}` : (l.debtAmountBucket ?? "-")}</td>
                  <td>{l.status}</td>
                  <td><Link href={`/admin/leads/${l.id}`} className="text-electric">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Field({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) {
  return (
    <div className="surface-card p-3">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className={`mt-1 text-slate text-sm break-all ${mono ? "font-mono" : ""}`}>{value && value.length > 0 ? value : "-"}</div>
    </div>
  );
}
