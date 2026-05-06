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

  if (dollars > 0) {
    const millions = dollars / 1_000_000;
    return (
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm text-slate">
        <span className="h-2 w-2 rounded-full bg-electric" />
        <span className="font-semibold">${millions.toFixed(1)}M+</span>
        <span className="text-muted">in MCA debt resolved</span>
      </div>
    );
  }

  return (
    <p className="mt-6 text-sm text-muted">
      Founding cohort. We resolve real cases - quietly, while we build the brand.
    </p>
  );
}
