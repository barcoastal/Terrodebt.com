export function FounderSection() {
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-1">
          <div
            className="aspect-square w-full max-w-xs rounded-2xl bg-gradient-to-br from-electric/30 via-electric/10 to-slate/20 border border-border"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-semibold text-slate">Bar Elezra</p>
          <p className="text-xs text-muted">Founder, TerraDebt</p>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate">Why TerraDebt exists</h2>
          <p className="mt-4 text-base text-slate leading-relaxed">
            Most MCA relief firms hide their fee, oversell their outcomes, and disappear once the contract is signed.
            TerraDebt was built to be the opposite. We publish a flat fee, charge nothing upfront, and treat each case
            like the only one. Our job is simple: take a business that is being squeezed by stacked MCAs and give the
            owner room to operate, hire, and grow again. That is the entire mission.
          </p>
          <p className="mt-4 text-sm text-muted">- Bar Elezra, Founder</p>
        </div>
      </div>
    </section>
  );
}
