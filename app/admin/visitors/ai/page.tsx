import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { AI_REFERRAL_DOMAINS, AI_SOURCE_TAGS, summarizeAiReferrals, type AiRow, type AiLead } from "@/lib/ai-referrals";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI referrals", robots: { index: false, follow: false } };

export default async function AiReferralsPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  if (!(await getSession()).userId) redirect("/admin/login");
  const requested = Number((await searchParams).days);
  const days = [7, 30, 90].includes(requested) ? requested : 30;
  const end = new Date();
  const since = new Date(end.getTime() - days * 86400_000);
  let report: ReturnType<typeof summarizeAiReferrals> | null = null;
  let truncated = false;
  try {
    const candidates = await db.visitor.findMany({
      where: { firstSeen: { gte: since, lte: end }, OR: [
        ...AI_REFERRAL_DOMAINS.map(domain => ({ referrer: { contains: domain, mode: "insensitive" as const } })),
        ...AI_SOURCE_TAGS.map(tag => ({ utmSource: { contains: tag, mode: "insensitive" as const } })),
      ] },
      select: { eliClickid: true, firstSeen: true, landingPath: true, referrer: true, utmSource: true, utmMedium: true, gclid: true, fbclid: true, affiliateClickid: true, deviceType: true, userAgent: true },
      orderBy: [{ firstSeen: "desc" }, { id: "desc" }], take: 50001,
    });
    truncated = candidates.length > 50000;
    const visitors = candidates.slice(0, 50000);
    const leads: AiLead[] = [];
    for (let offset = 0; offset < visitors.length; offset += 1000) {
      leads.push(...await db.lead.findMany({ where: { eliClickid: { in: visitors.slice(offset,offset+1000).map(v=>v.eliClickid) }, createdAt: { gte: since, lte: end } }, select: { eliClickid: true, createdAt: true } }));
    }
    report = summarizeAiReferrals(visitors, leads, end);
  } catch {
    // A database outage must not look like zero traffic.
  }
  return <>
    <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">AI referrals</h1><Link href="/admin/visitors">All visitors →</Link></div>
    <p className="mt-2 max-w-3xl text-sm text-muted">Identifiable referrals from ChatGPT, Perplexity, Microsoft Copilot, Gemini, Claude, and Grok. This report counts visitor records and linked lead submissions, not AI citations or browsing sessions.</p>
    <form className="mt-5 flex flex-wrap items-center gap-3"><label htmlFor="ai-days" className="text-sm">First seen</label><select id="ai-days" name="days" defaultValue={String(days)} className="rounded-md border border-border px-3 py-2">{[7,30,90].map(d=><option key={d} value={d}>Last {d} days</option>)}</select><button className="rounded-md bg-slate px-4 py-2 text-white">Apply</button></form>
    <p className="mt-2 text-xs text-muted">{since.toISOString().slice(0,10)}–{end.toISOString().slice(0,10)} UTC · Leads counted through this report’s refresh.</p>
    {!report ? <div role="alert" className="mt-6 surface-card p-5">The report could not load. Refresh to try again; no traffic totals are available.</div> : <>
      {truncated && <p role="alert" className="mt-4 text-amber-800">Partial report: the latest 50,000 matching candidate records are included. Select a shorter date range.</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
        ["Identified AI visitors", report.visitors.toLocaleString()], ["Visitors with a lead", report.convertedVisitors.toLocaleString()], ["Lead submissions",report.leads.toLocaleString()], ["Visitor conversion rate",report.visitors ? `${(100*report.convertedVisitors/report.visitors).toFixed(2)}%` : "—"],
      ].map(([label,value])=><div key={label} className="surface-card p-4"><div className="text-xs uppercase tracking-wide text-muted">{label}</div><div className="mt-2 text-2xl font-bold">{value}</div></div>)}</div>
      {report.visitors === 0 && <p className="mt-5 text-sm">No identifiable AI referrals in this period. This does not establish that AI sent no visitors; some apps omit referral information.</p>}
      <ReportTable title="By AI provider" rows={report.sources}/><ReportTable title="Landing pages" rows={report.pages}/>
    </>}
    <section className="mt-8 max-w-3xl surface-card p-5 text-sm"><h2 className="font-semibold">How to read this report</h2><ul className="mt-3 list-disc space-y-2 pl-5">
      <li>Recognition uses a known AI source tag or the referring website’s hostname. Explicit paid and affiliate attribution takes precedence. Ordinary Google and Bing visits are not assumed to be AI traffic.</li>
      <li>Known bots and admin/API landing pages are excluded. Visitor records depend on cookies and may not equal unique people. Missing referrers cannot be reconstructed.</li>
      <li>Leads are matched by the existing visitor click ID. Multiple submissions from one visitor count as multiple leads but only one converted visitor. A submission does not imply a qualified lead or sale.</li>
      <li>The period selects visitors first seen during those dates. The report uses their stored attribution, which can change on later tagged visits; it is not a historical first-touch or multi-touch model.</li>
      <li>Use Ahrefs or Bing’s AI Performance report for citations. Compare those separately with these referral and conversion counts.</li>
    </ul></section>
  </>;
}
function ReportTable({ title, rows }: { title: string; rows: AiRow[] }) {
  return <section className="mt-8"><h2 className="text-lg font-semibold">{title}</h2><div className="mt-3 surface-card overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-offwhite"><tr>{[title === "Landing pages" ? "Page" : "Provider","Visitors","Visitors with a lead","Lead submissions","Conversion"].map(h=><th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody>{rows.length === 0 && <tr><td colSpan={5} className="p-4 text-muted">No identifiable referrals.</td></tr>}{rows.map(row=><tr key={row.name} className="border-t border-border"><td className="break-all px-4 py-3">{row.name}</td><td className="px-4">{row.visitors}</td><td className="px-4">{row.convertedVisitors}</td><td className="px-4">{row.leads}</td><td className="px-4">{(100*row.convertedVisitors/row.visitors).toFixed(2)}%</td></tr>)}</tbody></table></div></section>;
}
