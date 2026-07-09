import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Request received",
  description: "Your free MCA debt assessment request is in. Here is what happens next.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    step: "1",
    title: "An advisor reviews your file",
    body: "Debt size, number of positions, and industry. We match you with the advisor who has handled the most cases like yours.",
  },
  {
    step: "2",
    title: "You get a call within one business hour",
    body: "A real conversation, not a pitch. We walk your numbers and tell you plainly whether a program makes sense.",
  },
  {
    step: "3",
    title: "You see the math before any decision",
    body: "Effective APR on each position, projected program cost, and timeline. You decide with the full picture in front of you.",
  },
];

const PREP_ITEMS = [
  "Last 3 months of business bank statements",
  "Your MCA agreements (whatever you can find)",
  "Any recent balance or payoff letters",
  "Notes on which debits hurt the most",
];

const READING = [
  { href: "/insights/what-happens-if-you-stop-paying-an-mca", label: "What happens if you stop paying an MCA" },
  { href: "/insights/mca-settlement-vs-restructure", label: "Settlement vs restructure: which fits your situation" },
  { href: "/insights/stop-mca-daily-ach-debits", label: "How daily ACH debits can be paused legally" },
];

export default function ThankYouPage() {
  return (
    <article>
      <section className="relative bg-offwhite overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-pattern pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-6 pt-16 md:pt-24 pb-24">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-electric"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate tracking-tighter leading-[1.05]">
                Your request is in.
              </h1>
              <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                An advisor is reviewing your file now. Expect a call within one
                business hour, from a person who has seen your situation before.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 grid gap-4">
              {NEXT_STEPS.map((s) => (
                <div key={s.step} className="surface-card-elevated p-6 flex gap-5 items-start">
                  <span className="font-mono text-sm font-bold text-electric border border-electric/30 rounded-full w-9 h-9 flex items-center justify-center shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h2 className="font-semibold text-slate text-lg tracking-tight">{s.title}</h2>
                    <p className="mt-1 text-muted text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 surface-card p-6 md:p-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted">
                Worth having ready for the call
              </h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {PREP_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate">
                    <svg
                      className="w-4 h-4 text-electric mt-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                None of it is required. The first call works fine with just your best estimates.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted">
                While you wait
              </h2>
              <div className="mt-4 grid gap-3">
                {READING.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="surface-card p-4 flex items-center justify-between text-sm font-medium text-slate hover:text-electric transition"
                  >
                    {r.label}
                    <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-12 text-center text-sm text-muted">
              Need to reach us first?{" "}
              <a href="mailto:info@businessdebtinsider.com" className="text-electric font-medium">
                info@businessdebtinsider.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
