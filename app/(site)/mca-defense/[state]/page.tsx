import { notFound } from "next/navigation";
import Link from "next/link";
import { LeadForm } from "@/components/lead/LeadForm";
import { STATES } from "@/lib/states";
import { STATE_GUIDES, hasStateGuide } from "@/lib/state-guides";
import { REFERENCES } from "@/lib/editorial";
import { References } from "@/components/content/References";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const meta = STATES.find((s) => s.code === state.toUpperCase());
  if (!meta) notFound();
  return {
    title: `MCA Defense in ${meta.name}: Documents and Legal Resources`,
    description: `Prepare for an MCA dispute involving ${meta.name}. Understand what to gather, how legal and financial reviews differ, and when to contact licensed counsel.`,
    alternates: { canonical: `/mca-defense/${meta.code.toLowerCase()}` },
    robots: { index: hasStateGuide(meta.code), follow: true },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const meta = STATES.find((s) => s.code === state.toUpperCase());
  if (!meta) notFound();
  const guide = STATE_GUIDES[meta.code];
  return (
    <article>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "MCA Defense", url: "/mca-defense" }, { name: meta.name, url: `/mca-defense/${state.toLowerCase()}` }]} />
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">MCA Defense in {meta.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{guide?.summary ?? `If your business in ${meta.name} faces MCA collection or a lawsuit, start with the actual contracts, notices, and court dates. This page is a general preparation checklist, not a guide to ${meta.name} law.`}</p>
            <p className="mt-4 text-sm leading-relaxed">BDI is not a law firm. A website inquiry does not create legal representation or extend a deadline. Contact licensed counsel promptly about active proceedings.</p>
          </div>
          <LeadForm source={`state-${meta.code.toLowerCase()}`} />
        </div>
      </section>
      <div className="mx-auto max-w-content px-6 py-12 md:py-16">
        <div className="max-w-3xl space-y-10">
          {guide && <section>
            <h2 className="text-2xl font-semibold">{guide.ruleHeading}</h2>
            <p className="mt-4 text-lg leading-relaxed">{guide.rule}</p>
            <a href={guide.source.url} className="mt-3 inline-block text-pine underline">Read the official statute</a>
            <p className="mt-3 text-sm text-muted">Source checked October 2, 2026. This summary is general information, not an attorney opinion on your contract.</p>
          </section>}
          {guide?.sections.map((section) => <section key={section.heading}>
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((p) => <p key={p} className="mt-4 text-lg leading-relaxed">{p}</p>)}
          </section>)}
          <section>
            <h2 className="text-2xl font-semibold">Documents to gather before a review</h2>
            <ul className="mt-4 list-disc pl-5 space-y-3">
              <li>Signed MCA agreements, amendments, guarantees, and reconciliation provisions.</li>
              <li>Payment history, bank statements, and the creditor&apos;s claimed balance.</li>
              <li>All court papers, service records, case numbers, and response dates.</li>
              <li>Bank restraint notices and correspondence about settlement or modification.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Questions to put to the people handling your file</h2>
            <p className="mt-4 text-lg leading-relaxed">Confirm who is responsible for each deadline, whether counsel represents the entity or an owner as well, and how legal fees are billed. Ask for the consulting scope and creditor proposal separately. No projected discount or payment reduction is an accepted agreement until the relevant parties document it.</p>
            <p className="mt-4 text-lg leading-relaxed">BDI can help organize the financial information for an initial review. Availability, legal scope, and representation must be confirmed with the attorney. We do not promise a particular court result, account release date, or savings percentage.</p>
          </section>
          <nav aria-label="Related guidance" className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold">Explore the next step</h2>
            <ul className="mt-4 space-y-3">
              <li><Link href="/programs/legal-defense" className="text-pine underline">How legal defense coordination works</Link></li>
              <li><Link href="/programs/restructure" className="text-pine underline">Compare a business debt restructuring</Link></li>
              <li><Link href="/programs/settlement" className="text-pine underline">Understand settlement costs and risks</Link></li>
              <li><Link href="/mca-defense" className="text-pine underline">Browse the MCA defense resource hub</Link></li>
            </ul>
          </nav>
        </div>
        {guide && <References items={[guide.source, ...(meta.code === "CA" ? [REFERENCES.disclosure] : [])]} />}
      </div>
    </article>
  );
}
