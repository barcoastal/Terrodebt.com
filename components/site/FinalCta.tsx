import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative bg-slate text-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate via-slate to-slate-soft pointer-events-none" />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-content px-6 py-20 md:py-28 text-center">
        <span className="font-mono text-xs uppercase tracking-wider text-white/60">Ready when you are</span>
        <h2 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]">
          Stop the daily debits.
          <br />
          <span className="text-electric">Resolve the stack.</span>
        </h2>
        <p className="mt-5 text-white/80 max-w-2xl mx-auto leading-relaxed">
          Free assessment. Free calculators. No commitment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/get-started"
            className="bg-electric text-white px-6 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            Start my free assessment
          </Link>
          <a
            href="tel:18008372300"
            className="border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-semibold no-underline hover:bg-white/10 transition"
          >
            Call 1-800-TERRA-00
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/50 font-mono uppercase tracking-wider">
          <span>50-state counsel</span>
          <span className="text-white/20">·</span>
          <span>Pre and post default</span>
          <span className="text-white/20">·</span>
          <span>Mon-Fri 8 AM to 8 PM ET</span>
        </div>
      </div>
    </section>
  );
}
