import Image from "next/image";

const META = [
  { k: "Founded", v: "2026" },
  { k: "Based in", v: "Fort Lauderdale, FL" },
  { k: "Entity", v: "GRL Recovery LLC dba TerraDebt" },
];

export function AboutStrip() {
  return (
    <section className="bg-offwhite border-t border-rule">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left: founder portrait */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] border border-rule overflow-hidden">
              <Image
                src="/images/founder-scene.png"
                alt="Bar Elezra, founder of TerraDebt, at his desk"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate/85 backdrop-blur-sm px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
                Bar Elezra / Founder
              </div>
            </div>
          </div>

          {/* Right: bio */}
          <div className="md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              About TerraDebt
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-slate">
              Built by operators. Run from Fort Lauderdale.
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-slate leading-relaxed max-w-2xl">
              <p>
                TerraDebt was built because business debt resolution is usually sold as one tool applied to every situation. A settlement shop sells settlements. A consolidation lender sells consolidation. The result is a workout that fits the seller, not the operator.
              </p>
              <p>
                We work across six debt categories at once. MCA, SBA, equipment finance, vendor, bank, and tax. Most of the operators who come to us are carrying more than one type, and the categories interact. The plan only works if it accounts for all of them.
              </p>
              <p>
                We run the math first. Effective APR per advance, total daily cash leak, lender stack mapped against your real receivables. The workout follows the math, not a template. Licensed counsel coordinates inside 72 hours when legal action is in play.
              </p>
              <p>
                The team is small on purpose. Every file has a named point of contact. Every program has a sequenced plan with named outcomes. We tell you what is realistic at intake and update it as the program moves.
              </p>
            </div>

            <div className="mt-8 font-mono text-sm text-slate">
              Bar Elezra, Founder, TerraDebt.
            </div>

            {/* Meta row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 border border-rule">
              {META.map((m, i) => (
                <div
                  key={m.k}
                  className={`p-4 ${i < META.length - 1 ? "border-b sm:border-b-0 sm:border-r border-rule" : ""}`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {m.k}
                  </div>
                  <div className="mt-1.5 font-mono text-sm text-slate">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
