import { Reveal } from "./Reveal";

const FAQ = [
  {
    q: "How long does the program take?",
    a: "Most programs run 8 to 16 months. Settlement programs typically resolve faster, restructure programs trail longer because terms are renegotiated rather than discounted. We give you a target timeline before you sign.",
  },
  {
    q: "Do you charge upfront?",
    a: "No. There is no upfront fee. Our flat fee is published on every program page and earned only as we resolve balances. If we do not perform, you do not pay.",
  },
  {
    q: "Will this hurt my credit?",
    a: "MCAs are commercial contracts and most do not report to consumer credit. Business credit can take a temporary hit during settlement, then rebuilds quickly once balances are resolved and cash flow is restored.",
  },
  {
    q: "What if I am already in default?",
    a: "Default is common in our intake. We have programs designed specifically for post-default situations, including emergency legal defense for COJ filings, frozen accounts, and active litigation.",
  },
  {
    q: "Can I add new MCAs during the program?",
    a: "We strongly discourage taking new MCAs while in a program. Stacking new advances on top of an active resolution undoes the work and signals bad faith to the lenders we are negotiating with.",
  },
  {
    q: "How is TerraDebt different from settlement firms?",
    a: "Most settlement firms collect monthly retainers regardless of outcome and lean on a single tactic. We charge a flat fee tied to performance, run four distinct programs, and coordinate legal defense in all 50 states when needed.",
  },
];

export function Faq() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-slate tracking-tighter">Common questions</h2>
        </Reveal>
        <div className="mt-12 grid gap-3">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group surface-card transition-all hover:border-electric/30 open:shadow-[var(--shadow-elevated)]">
                <summary className="cursor-pointer list-none flex justify-between items-center p-6 text-base md:text-lg font-semibold text-slate tracking-tight">
                  <span>{item.q}</span>
                  <span className="text-electric text-2xl group-open:rotate-45 transition-transform duration-300 leading-none flex-shrink-0 ml-4">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm md:text-base text-muted leading-relaxed">{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
