import { hasStateGuide } from "@/lib/state-guides";
import Link from "next/link";
import type { Metadata } from "next";
import { STATES } from "@/lib/states";

export const metadata: Metadata = {
  title: "MCA Defense by State",
  description: "Prepare for an MCA dispute with state resources, a document checklist, and an explanation of attorney engagement and financial review.",
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
            MCA defense: start with the documents and the jurisdiction.
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink leading-relaxed">
            A collection demand, a lawsuit, a judgment, and an account restraint call for different responses. Identify what you have received and contact licensed counsel about any pending deadline. BDI helps organize the financial side of the review.
          </p>
          <p className="mt-4 max-w-3xl text-base text-muted leading-relaxed">
            The Florida, New York, and California guides include state-specific statutory references. Other locations provide a general preparation checklist. Attorney availability and scope must be confirmed in a separate engagement.
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
                {s.name}<span className="block text-xs text-muted mt-1">{hasStateGuide(s.code) ? "State guide and sources" : "Preparation checklist"}</span>
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
                Ask counsel to identify the procedure appropriate to the actual court record and contract. Do not assume every dispute calls for a motion to vacate, that a UCC filing itself freezes a bank account, or that contacting a creditor pauses a response deadline.
              </p>
              <p>
                The practice does not represent clients in court directly. An attorney must confirm the jurisdiction, availability, scope, and fees through a separate engagement. A BDI inquiry alone does not establish legal representation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
