import { db } from "@/lib/db";

export async function AggregateCounter() {
  let dollars = 0;
  try {
    const setting = await db.setting.findUnique({ where: { key: "aggregate_resolved_dollars" } });
    const v = setting?.value as unknown;
    if (typeof v === "number") dollars = v;
    else if (typeof v === "string") dollars = Number(v) || 0;
  } catch {
    dollars = 0;
  }

  if (!dollars) {
    return (
      <div className="mt-6 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Founding cohort</span>
        <span className="text-sm text-muted">We resolve real cases quietly while we build the brand.</span>
      </div>
    );
  }
  const formatted = `$${(dollars / 1_000_000).toFixed(1)}M+`;
  return (
    <div className="mt-6 inline-flex items-baseline gap-2">
      <span className="font-mono text-3xl font-semibold text-slate tracking-tight">{formatted}</span>
      <span className="text-sm text-muted">in MCA debt resolved.</span>
    </div>
  );
}
