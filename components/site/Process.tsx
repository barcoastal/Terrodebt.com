import Image from "next/image";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Free assessment",
    body: "We review your contracts, your daily debits, and your cash flow. We tell you your effective APR and what is realistic for your situation. No commitment.",
    img: "/images/process-call.png",
  },
  {
    n: "02",
    title: "Program design",
    body: "We propose a program tailored to your debt size, lender mix, and timeline. Settlement, restructure, defense, or a combination. Engagement terms and fees are reviewed and confirmed during your consultation.",
  },
  {
    n: "03",
    title: "Execution",
    body: "We manage the negotiation with each lender, file legal defense where needed, and structure your payments. You get clear status weekly until resolution.",
  },
  {
    n: "04",
    title: "Resolution",
    body: "Programs typically resolve in 6 to 18 months. You walk away with cash flow restored and a path back to bankable credit.",
  },
];

export function Process() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">How it works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">From first call to resolution.</h2>
            <p className="mt-4 text-muted leading-relaxed">A clear four-step path. No surprises, no theatrics, no upfront fees to talk.</p>
          </div>
        </Reveal>

        <div className="relative mt-14">
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full border-l border-dashed border-border/80 pointer-events-none" aria-hidden />
          <div className="grid md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 relative">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="surface-card overflow-hidden h-full">
                  {s.img && (
                    <div className="relative aspect-[16/9] bg-offwhite overflow-hidden">
                      <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  )}
                  <div className="p-6 md:p-7">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-base font-semibold text-electric tracking-tight">{s.n}</span>
                      <span className="h-px flex-1 bg-border" aria-hidden />
                    </div>
                    <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
