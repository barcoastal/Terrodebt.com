export function TrustStrip() {
  const outlets = ["Forbes", "Inc.", "Bloomberg", "WSJ"];
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
        <div className="text-xs font-semibold tracking-widest text-muted uppercase">As featured in</div>
        <div className="flex flex-wrap gap-6 md:gap-10 items-center">
          {outlets.map((o) => (
            <span key={o} className="text-base md:text-lg font-semibold text-slate/70">
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
