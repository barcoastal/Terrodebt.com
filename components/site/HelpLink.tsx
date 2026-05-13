import Link from "next/link";

export function HelpLink() {
  return (
    <section className="bg-offwhite border-t border-rule">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 items-baseline">
          <div className="md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              When the reading is done
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-slate leading-tight max-w-2xl">
              If your situation needs a workout, talk to the team.
            </h2>
            <p className="mt-4 text-muted max-w-2xl leading-relaxed">
              The free assessment is one conversation. We walk through your contracts, daily debits, and lender mix, and tell you what is realistic. No commitment.
            </p>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-3 text-slate text-base font-medium no-underline border-b-2 border-slate pb-1 hover:text-electric hover:border-electric transition"
            >
              Request a free assessment
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
