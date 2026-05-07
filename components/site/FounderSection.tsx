import { Reveal } from "./Reveal";

export function FounderSection() {
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-10 items-start">
        <Reveal>
          <div className="md:col-span-1">
            <div className="relative aspect-square w-full max-w-xs rounded-2xl border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-electric/30 via-electric/10 to-slate/20" />
              <div className="absolute inset-0 bg-mesh" />
              <div className="absolute inset-0 grid-pattern opacity-50" />
            </div>
            <p className="mt-5 font-semibold text-slate">Bar Elezra</p>
            <p className="font-mono text-xs uppercase tracking-wider text-muted mt-1">Founder, TerraDebt</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-bold text-slate tracking-tighter">Why TerraDebt exists</h2>
            <p className="mt-6 text-base md:text-lg text-slate leading-relaxed">
              Most MCA relief firms hide their fee, oversell their outcomes, and disappear once the contract is signed.
              TerraDebt was built to be the opposite. We publish a flat fee, charge nothing upfront, and treat each case
              like the only one. Our job is simple: take a business that is being squeezed by stacked MCAs and give the
              owner room to operate, hire, and grow again. That is the entire mission.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">Bar Elezra, Founder</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
