import Link from "next/link";
import type { Metadata } from "next";
import { STATES } from "@/lib/states";

export const metadata: Metadata = {
  title: "MCA Defense by State",
  description: "MCA defense in all 50 states. Coordinated licensed counsel for confession-of-judgment, account freezes, UCC liens, and settlement. Pick your state.",
  alternates: { canonical: "/mca-defense" },
};

export default function McaDefenseIndex() {
  return (
    <article className="bg-paper">
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
            MCA defense
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.04]">
            MCA defense in all 50 states.
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink leading-relaxed">
            Confession of judgment filed? Account frozen? UCC lien blocking deposits? The practice coordinates licensed counsel in your state and handles the settlement work on the same case file.
          </p>
          <p className="mt-4 max-w-3xl text-base text-muted leading-relaxed">
            Pick your state below to see the local procedure, typical timeline, and how engagement works. Or schedule a 30-minute review directly.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-pine text-paper px-6 py-4 text-sm font-mono uppercase tracking-[0.18em] no-underline hover:bg-ink transition"
            >
              Schedule an initial review →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-3 border-y border-hairline py-8">
            {STATES.map((s) => (
              <Link
                key={s.code}
                href={`/mca-defense/${s.code.toLowerCase()}`}
                className="text-base text-ink no-underline border-b border-hairline pb-1.5 hover:text-pine hover:border-pine transition leading-snug"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-mute border-t border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                What state work covers
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
                COJ, freezes, UCC, settlement.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-4 text-base md:text-lg text-ink leading-relaxed">
              <p>
                Confession-of-judgment defense begins with a motion to vacate where state procedure allows it. Account freezes are addressed through emergency-relief filings and coordination with the depository bank. UCC enforcement is handled in parallel with reconciliation and settlement negotiations.
              </p>
              <p>
                The practice does not represent clients in court directly. Counsel licensed in your state is engaged at intake and disclosed in writing. Legal work is billed by the attorney; the practice does not collect legal fees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
