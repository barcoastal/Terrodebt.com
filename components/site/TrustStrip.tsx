const NAMES = ["Forbes", "Inc.", "Bloomberg", "WSJ", "Entrepreneur"];

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-8">
        <div className="text-center text-xs uppercase tracking-widest text-muted font-medium">As featured in</div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {NAMES.map((n) => (
            <span key={n} className="text-slate font-semibold text-lg opacity-60 hover:opacity-100 transition">{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
