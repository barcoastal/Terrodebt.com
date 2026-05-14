import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, getGlossaryByLetter, getLetters } from "@/lib/glossary";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";

export const metadata: Metadata = {
  title: "Business Debt Glossary | MCA, SBA, COJ Terms | Freshline Advisory",
  description: "Plain-English definitions of business debt restructure terms: factor rate, reconciliation, COJ, Trust Fund Recovery Penalty, UCC filing, and more.",
};

export default function GlossaryPage() {
  const grouped = getGlossaryByLetter();
  const letters = getLetters();

  return (
    <article>
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb items={[{ label: "Resources", href: "/insights" }, { label: "Glossary" }]} />
        </div>
      </section>

      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 pt-10 pb-8">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">Glossary</span>
          <h1 className="mt-3 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Business debt terms, defined
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-3xl leading-relaxed">
            {GLOSSARY.length} terms across MCA, SBA, equipment, vendor, bank, and tax debt. Each entry links to the related coverage area or guide.
          </p>
        </div>
      </section>

      {/* A-Z anchor row */}
      <section className="bg-offwhite border-b border-rule sticky top-[60px] md:top-[88px] z-30">
        <div className="mx-auto max-w-content px-6 py-3 overflow-x-auto">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono uppercase tracking-wider">
            {letters.map((l) => (
              <li key={l}>
                <a
                  href={`#letter-${l}`}
                  className="text-slate hover:text-electric border-b border-rule pb-0.5 no-underline transition"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16 space-y-12">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-40">
              <div className="border-b-2 border-slate pb-2">
                <h2 className="font-bold tracking-tighter text-slate text-4xl md:text-5xl leading-none">
                  {letter}
                </h2>
              </div>
              <ul className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-8">
                {(grouped[letter] ?? []).map((entry) => (
                  <li key={entry.slug} id={entry.slug} className="scroll-mt-40">
                    <h3 className="font-semibold tracking-tight text-slate text-lg leading-snug">
                      {entry.term}
                    </h3>
                    <p className="mt-2 text-sm text-slate leading-relaxed">{entry.definition}</p>
                    {entry.related && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider">
                        See related:{" "}
                        <Link
                          href={entry.related.href}
                          className="text-electric no-underline hover:underline"
                        >
                          {entry.related.label} →
                        </Link>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <NewsletterStrip source="glossary" />
    </article>
  );
}
