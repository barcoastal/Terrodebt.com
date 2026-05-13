import Link from "next/link";
import { SubscribeForm } from "./SubscribeForm";

export function Closer() {
  return (
    <section className="bg-slate text-white">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Headline + sub */}
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-electric-soft">
              Next step
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-white">
              Get a free assessment.
            </h2>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-md">
              Walk through your stack with someone who has seen it before. No commitment.
            </p>
          </div>

          {/* CTA card */}
          <div className="md:col-span-4">
            <div className="bg-slate-soft border border-white/15 p-7 h-full flex flex-col justify-between min-h-[200px]">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Free assessment
                </div>
                <p className="mt-3 text-white text-base leading-relaxed">
                  Send the lender list, total daily debits, and one question. We respond within one business day.
                </p>
              </div>
              <Link
                href="/get-started"
                className="mt-6 inline-flex items-center gap-2 text-electric-soft font-mono text-[11px] uppercase tracking-wider no-underline hover:text-white transition"
              >
                Start assessment
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Subscribe */}
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/60">
              Get the brief
            </div>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">
              One weekly email. Useful math, no filler.
            </p>
            <div className="mt-4">
              <SubscribeForm source="homepage-closer" />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-white/60">
          <div>TerraDebt · GRL Recovery LLC</div>
          <div>Fort Lauderdale, FL</div>
        </div>
      </div>
    </section>
  );
}
