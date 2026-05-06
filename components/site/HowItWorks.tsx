const STEPS = [
  {
    n: 1,
    title: "Free assessment",
    body: "Tell us what you owe and to whom. We pull every contract, calculate effective APR, and tell you which program fits before you sign anything.",
  },
  {
    n: 2,
    title: "We negotiate",
    body: "Our team contacts each MCA lender, pauses unsustainable debits, and negotiates settled balances or restructured terms while you keep operating.",
  },
  {
    n: 3,
    title: "Walk away with cash flow restored",
    body: "One affordable monthly payment replaces the daily debits. You operate, hire, and grow again without lenders draining the account every morning.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate">How it works</h2>
        <p className="mt-2 text-muted">Three steps. No surprises. No upfront fee.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white border border-border rounded-xl p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-electric text-white font-bold">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
