import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function ContractReviewDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let r: Awaited<ReturnType<typeof db.contractReview.findUnique>> = null;
  try {
    r = await db.contractReview.findUnique({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...({ include: { lead: true } } as any),
    });
  } catch {}
  if (!r) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">{r.contractFilename}</h1>
      <p className="text-muted">{r.createdAt.toISOString()}</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Stat label="Effective APR" value={r.effectiveApr ? `${r.effectiveApr.toFixed(1)}%` : "-"} />
        <Stat label="Total payback" value={r.totalPayback ? `$${r.totalPayback.toLocaleString()}` : "-"} />
        <Stat label="Email captured" value={r.emailCaptured ?? "-"} />
        <Stat label="Lead ID" value={r.leadId ?? "-"} />
      </div>

      <h2 className="text-lg font-semibold mt-8">AI summary</h2>
      <pre className="bg-white border border-border rounded-md p-4 mt-2 text-xs overflow-auto">{JSON.stringify(r.aiSummary, null, 2)}</pre>

      <h2 className="text-lg font-semibold mt-8">Red flags</h2>
      <pre className="bg-white border border-border rounded-md p-4 mt-2 text-xs overflow-auto">{JSON.stringify(r.redFlags, null, 2)}</pre>

      <details className="mt-8">
        <summary className="cursor-pointer text-sm text-muted">Extracted contract text ({r.contractText.length.toLocaleString()} chars)</summary>
        <pre className="bg-white border border-border rounded-md p-4 mt-2 text-xs whitespace-pre-wrap">{r.contractText.slice(0, 30000)}</pre>
      </details>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-white border border-border rounded-md p-3"><div className="text-xs text-muted uppercase">{label}</div><div className="mt-1 text-slate font-medium">{value}</div></div>;
}
