import { LeadForm } from "@/components/lead/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule an Initial Review",
  description: "Thirty minutes, no fee, confidential. A working call with the practice to determine whether your debt position is a fit for a forensic restructure engagement.",
};

const DELIVERABLES = [
  {
    n: "01",
    title: "Effective APR on every active obligation",
    body: "The number on the contract is rarely the number on the books. You leave the call with the real annualized cost of each advance, term loan, and credit line, computed from the actual debit and amortization mechanics.",
  },
  {
    n: "02",
    title: "A documented stack burden",
    body: "Daily and weekly debit total across all MCAs and short-term advances, mapped against the operating cash cycle. The math protects everyone in the room.",
  },
  {
    n: "03",
    title: "A go or no-go on engagement",
    body: "An honest read on whether the practice is the appropriate engagement for the matter, what the realistic outcome range looks like, and what the next thirty days would involve if retained.",
  },
];

const AGENDA = [
  { minute: "0–5", item: "Operator context, current obligations, immediate pressure points" },
  { minute: "5–15", item: "Walk-through of the active stack: contracts, debit cadence, cross-default exposure" },
  { minute: "15–25", item: "Forensic read of the math: effective APR, weighted daily burden, runway under current cadence" },
  { minute: "25–30", item: "Engagement fit, realistic outcome range, scope and timeline of a forensic audit if retained" },
];

const FOR_OPERATORS = [
  "Stacked two or more merchant cash advances or short-term advances",
  "Combined daily debit load that is now interfering with operating cash flow",
  "Active SBA loan modification, default notice, COJ filing, or UCC enforcement",
  "Mixed obligations across MCA, equipment finance, vendor credit, and bank lines",
  "Operating as a corporate entity (LLC, S-corp, C-corp) with commercial debt",
];

const NOT_FOR = [
  "Consumer debt: credit cards, medical bills, personal loans, student debt",
  "Sole proprietors with no operating entity and no commercial obligations",
  "Looking for a loan, a refinance, or a reverse consolidation",
  "Looking for legal representation directly (the practice coordinates counsel, it does not litigate)",
];

export default function InitialReviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 pt-16 pb-12 md:pt-20 md:pb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
            Initial review
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
            Thirty minutes <br className="hidden md:block" />of plain math.
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink leading-relaxed">
            The initial review is a working call, not a sales pitch. We pull the contracts, run the real math, and tell you whether a forensic restructure engagement is the right move for the matter.
          </p>

          {/* Spec strip */}
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 border-t border-hairline pt-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            <div>
              <dt className="text-muted">Format</dt>
              <dd className="mt-1 text-ink">Phone or video</dd>
            </div>
            <div>
              <dt className="text-muted">Duration</dt>
              <dd className="mt-1 text-ink">30 minutes</dd>
            </div>
            <div>
              <dt className="text-muted">Fee</dt>
              <dd className="mt-1 text-ink">None</dd>
            </div>
            <div>
              <dt className="text-muted">Response</dt>
              <dd className="mt-1 text-ink">Within 1 business hour</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Two-column: deliverables + form */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: deliverables */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              What you leave with
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
              Three documented outputs.
            </h2>
            <p className="mt-4 text-base md:text-lg text-ink leading-relaxed max-w-2xl">
              The review is structured to produce a written summary, regardless of whether the practice is retained. The math goes with you.
            </p>

            <div className="mt-10 divide-y divide-hairline border-y border-hairline">
              {DELIVERABLES.map((d) => (
                <div key={d.n} className="py-8 grid grid-cols-12 gap-6">
                  <div className="col-span-12 sm:col-span-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      {d.n}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-10">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-ink leading-snug">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-base text-ink leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: sticky form */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="border border-hairline bg-paper">
                <div className="border-b border-hairline px-6 py-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
                    Request review
                  </span>
                  <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-ink leading-tight">
                    Three questions to start.
                  </h2>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Confidential. No commitment. The math is on your side of the table from the first call.
                  </p>
                </div>
                <div className="p-6">
                  <LeadForm source="initial-review" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-10">
            <div className="md:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Agenda
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                The thirty minutes, by the minute.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base md:text-lg text-ink leading-relaxed">
                The call follows the same structure every time. The point is to compress the work that the practice would otherwise spend a full forensic audit producing, into the segments that matter for an engagement decision.
              </p>
            </div>
          </div>

          <div className="divide-y divide-hairline border-y border-hairline">
            {AGENDA.map((a) => (
              <div key={a.minute} className="py-5 grid grid-cols-12 gap-4 items-baseline">
                <div className="col-span-3 md:col-span-2 font-mono text-sm text-pine tracking-tight">
                  {a.minute}
                </div>
                <div className="col-span-9 md:col-span-10 text-base md:text-lg text-ink leading-snug">
                  {a.item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                Who this is for
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
                The practice fits operators with commercial debt.
              </h3>
              <ul className="mt-6 space-y-3">
                {FOR_OPERATORS.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink leading-relaxed">
                    <span className="mt-2 inline-block w-2 h-px bg-pine shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Who this is not for
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
                Some matters fall outside scope.
              </h3>
              <ul className="mt-6 space-y-3">
                {NOT_FOR.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-muted leading-relaxed">
                    <span className="mt-2 inline-block w-2 h-px bg-hairline shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics strip */}
      <section className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Direct
              </span>
              <p className="mt-2 text-lg font-bold tracking-tight text-ink">
                hello@businessdebtinsider.com
              </p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                Operators can email contracts and statements in advance. Encrypted attachments welcome.
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Hours
              </span>
              <p className="mt-2 text-base text-ink leading-relaxed">
                Mon–Fri, 8 AM – 8 PM ET<br />
                Sat, 10 AM – 4 PM ET
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Active COJ filings, frozen accounts, or accelerated SBA notes: flag urgency in the form.
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Office
              </span>
              <p className="mt-2 text-base text-ink leading-relaxed">
                6301 NW 5th Way 5100<br />
                Fort Lauderdale, FL 33309
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                The practice serves operating entities in all 50 states.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
