import Image from "next/image";

const STEPS = [
  {
    idx: "01",
    title: "Run the math first",
    body: "Before any negotiation, we map every lender, every contract, and every daily debit. We model effective APR per advance, total daily cash leak, and the realistic settlement vs restructure split. If the math does not work, we say so.",
  },
  {
    idx: "02",
    title: "Workouts second",
    body: "Once the numbers are clear, we run the workouts in parallel. Reconciliation requests, settlement offers, restructure terms, factor coordination. Every lender on its own track, every track sequenced against your cash flow.",
  },
  {
    idx: "03",
    title: "Real people throughout",
    body: "You get a single point of contact who knows the file. Licensed counsel inside 72 hours when legal moves. Weekly check-ins, not a portal that forgets your name. The program is run by people, on the phone, in writing.",
  },
];

export function ApproachStrip() {
  return (
    <section className="bg-slate text-white">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left: full-bleed image */}
        <div className="md:col-span-5 relative min-h-[420px] md:min-h-[640px]">
          <Image
            src="/images/process-call.png"
            alt="A team member on the phone working through a debt workout"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: text content. Inset with padding aligned to grid. */}
        <div className="md:col-span-7 px-6 md:px-12 lg:px-20 py-20 md:py-24 lg:py-28">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/60">
              Our approach
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-white">
              Math first. Workouts second. Real people throughout.
            </h2>

            <div className="mt-12 space-y-10">
              {STEPS.map((step) => (
                <div key={step.idx} className="grid grid-cols-12 gap-4 border-t border-white/15 pt-6">
                  <div className="col-span-2 md:col-span-2 font-mono text-sm text-electric-soft pt-1">
                    {step.idx}
                  </div>
                  <div className="col-span-10 md:col-span-10">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-white/75">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
