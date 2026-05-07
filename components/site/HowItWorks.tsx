import { Reveal } from "./Reveal";

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
      <div className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-slate tracking-tighter">How it works</h2>
          <p className="mt-3 text-muted text-lg">Three steps. No surprises. No upfront fee.</p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="surface-card p-7 h-full transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
                <div className="font-mono text-4xl font-semibold text-electric tracking-tight">
                  {String(s.n).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
