export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
      <div className="h-full bg-electric transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
