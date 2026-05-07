import Image from "next/image";
import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", title: "Free assessment", body: "We review your contracts, your daily debits, and your cash flow. We tell you your effective APR and what is realistic for your situation. No commitment.", img: "/images/process-call.png" },
  { n: "02", title: "Program design", body: "We propose a program tailored to your debt size, lender mix, and timeline. Settlement, restructure, defense, or a combination. Flat fee published upfront." },
  { n: "03", title: "Execution", body: "We manage the negotiation with each lender, file legal defense where needed, and structure your payments. You get clear status weekly until resolution." },
  { n: "04", title: "Resolution", body: "Programs typically resolve in 6 to 18 months. You walk away with cash flow restored and a path back to bankable credit." },
];

export function Process() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">How it works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">From first call to resolution.</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="surface-card overflow-hidden h-full">
                {s.img && (
                  <div className="relative aspect-[16/9] bg-offwhite overflow-hidden">
                    <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                )}
                <div className="p-6">
                  <span className="font-mono text-sm text-electric">{s.n}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
