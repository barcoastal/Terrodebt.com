import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let s: Awaited<ReturnType<typeof db.caseStudy.findUnique>> = null;
  try {
    s = await db.caseStudy.findUnique({ where: { slug } });
  } catch {}
  if (!s || !s.published) notFound();
  return (
    <article className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.industry}</div>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1]">${(s.debtAmount / 1000).toFixed(0)}K resolved</h1>
        <div className="mt-5 flex gap-3 flex-wrap">
          <span className="font-mono text-sm font-semibold text-electric bg-electric/5 border border-electric/20 px-3 py-1.5 rounded-lg">{s.savingsPct}% saved</span>
          <span className="font-mono text-sm text-slate bg-offwhite border border-border px-3 py-1.5 rounded-lg">{s.months} months</span>
        </div>
        <div className="prose prose-slate mt-10 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.storyMd}</ReactMarkdown>
        </div>
      </div>
      <aside className="md:sticky md:top-24 self-start">
        <LeadForm source={`case-study-${slug}`} />
      </aside>
    </article>
  );
}
