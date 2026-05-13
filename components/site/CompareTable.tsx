export type CompareRow = {
  feature: string;
  optionA: string;
  optionB: string;
};

export function CompareTable({
  optionALabel,
  optionBLabel,
  rows,
  heading,
  eyebrow = "Compare",
}: {
  optionALabel: string;
  optionBLabel: string;
  rows: CompareRow[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <div className="border border-rule bg-white">
      {(eyebrow || heading) && (
        <div className="px-4 py-3 border-b border-rule bg-offwhite">
          {eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{eyebrow}</span>
          )}
          {heading && (
            <h3 className="mt-1 font-semibold tracking-tight text-slate text-lg leading-snug">
              {heading}
            </h3>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate text-white">
              <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 border-r border-slate-soft">
                Feature
              </th>
              <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 border-r border-slate-soft">
                {optionALabel}
              </th>
              <th className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3">
                {optionBLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-rule">
                <td className="px-4 py-3 text-slate font-medium border-r border-rule align-top w-1/4">
                  {r.feature}
                </td>
                <td className="px-4 py-3 text-slate border-r border-rule align-top">
                  {r.optionA}
                </td>
                <td className="px-4 py-3 text-slate align-top">{r.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
