import type { Metadata } from "next";
import { DarkLeadForm } from "@/components/lead/DarkLeadForm";

export const metadata: Metadata = {
  title: "Business MCA Restructuring - Free Assessment",
  description:
    "Coordinated MCA program restructuring for stacked advances, equipment leases, vendor obligations, and IRS installments. Free assessment, real counsel, no commitment.",
  robots: { index: false, follow: false },
};

const BULLETS = [
  "Pause daily MCA withdrawals through formal reconciliation",
  "Equipment lease restructuring, term extensions and acceleration defense",
  "Vendor and banking program coordination",
  "IRS installment program structuring and offer in compromise",
  "Legal coordination in all 50 states when escalation is required",
];

const WHY = [
  {
    n: "01",
    title: "Cash flow first.",
    body: "Daily MCA withdrawals pause via formal reconciliation, often within 2 to 4 weeks of starting. The cash that was leaving your account stays with the business.",
  },
  {
    n: "02",
    title: "Resolve in 6 to 18 months.",
    body: "Most restructuring programs close inside a year. Longer programs run 12 to 18 months with a single coordinated monthly obligation instead of daily withdrawals.",
  },
  {
    n: "03",
    title: "Real legal coordination.",
    body: "When COJ filings, account freezes, or active escalation are in play, we coordinate licensed counsel in your state within 72 hours.",
  },
];

const STATS = [
  {
    n: "47%",
    title: "Average reduction off combined advance balance",
    body: "Across recent restructuring programs, total payback lands roughly half of the original combined balance.",
  },
  {
    n: "11 mo",
    title: "Average program timeline",
    body: "Most restructuring and consolidation programs close inside a year, with longer cases on heavier advance stacks.",
  },
  {
    n: "50",
    title: "States with coordinated counsel",
    body: "When COJs, account freezes, or active escalation are in play, we coordinate licensed attorneys in your state.",
  },
];

export default function McaLandingPage() {
  return (
    <article>
      {/* Hero + form */}
      <section className="mx-auto grid max-w-5xl items-start gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1fr_420px] lg:gap-16 lg:pt-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00C896]/20 bg-[#00C896]/10 px-3.5 py-1.5 text-xs font-semibold text-[#00C896]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00C896]" />
            Free assessment for businesses with stacked MCA programs
          </div>
          <h1 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.12] tracking-tight text-white">
            Restructure your <em className="not-italic text-[#00C896]">MCA stack</em> and restore
            your business cash flow.
          </h1>
          <p className="mb-7 max-w-md leading-relaxed text-[#8FA89F]">
            Stacked merchant cash advances, equipment leases, vendor obligations, and IRS
            installments. Most programs resolve in 6 to 18 months across five product categories.
          </p>
          <ul className="flex flex-col gap-2.5">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00C896]">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <DarkLeadForm source="mca-lp" />
      </section>

      {/* Why */}
      <section className="bg-[#111817] px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[1.2px] text-[#00C896]">
            Why merchants choose us
          </div>
          <h2 className="mb-10 max-w-xl text-[clamp(24px,3.5vw,36px)] font-extrabold leading-tight tracking-tight text-white">
            Keep your business operating while you restructure your MCA program.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {WHY.map((c) => (
              <div key={c.n} className="rounded-xl border border-white/10 bg-[#161E1D] p-6">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#00C896]">{c.n}</div>
                <h3 className="mb-2 text-[17px] font-bold leading-snug text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed text-[#8FA89F]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[1.2px] text-[#00C896]">By the numbers</div>
        <h2 className="mb-10 text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-tight text-white">
          Specific outcomes, not theatrics.
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.n} className="border-t-2 border-[#00C896] pt-5">
              <div className="mb-2 text-[clamp(36px,5vw,56px)] font-extrabold leading-none tracking-tight text-[#00C896]">
                {s.n}
              </div>
              <div className="mb-1.5 font-semibold text-white">{s.title}</div>
              <div className="text-[13.5px] leading-relaxed text-[#8FA89F]">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <div className="px-6">
        <div className="mx-auto mb-20 max-w-5xl rounded-3xl border border-[#00C896]/20 bg-gradient-to-br from-[#00C896]/15 to-[#00C896]/5 px-6 py-14 text-center">
          <h2 className="mb-2 text-[clamp(24px,3.5vw,38px)] font-extrabold leading-tight tracking-tight text-white">
            Get out from under stacked MCA advances.
          </h2>
          <p className="mb-7 text-[#8FA89F]">Free assessment. No commitment.</p>
          <a
            href="#assessment"
            className="inline-flex items-center gap-2 rounded-lg bg-[#00C896] px-8 py-3 text-[15px] font-bold text-black no-underline transition hover:bg-[#00E6AC]"
          >
            Start my free assessment →
          </a>
          <div className="mt-4 text-[12.5px] text-[#5A706A]">
            Pre-default and post-default <span className="mx-1.5">·</span> 50-state counsel
            <span className="mx-1.5">·</span> Five product categories
          </div>
        </div>
      </div>
    </article>
  );
}
