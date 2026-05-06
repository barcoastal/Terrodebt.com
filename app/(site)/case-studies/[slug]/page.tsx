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
    <article className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <div className="text-sm text-muted">{s.industry}</div>
        <h1 className="mt-2 text-4xl font-bold">${(s.debtAmount / 1000).toFixed(0)}K resolved · {s.savingsPct}% saved · {s.months} months</h1>
        <div className="prose mt-8 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.storyMd}</ReactMarkdown>
        </div>
      </div>
      <aside className="sticky top-8 self-start">
        <LeadForm source={`case-study-${slug}`} />
      </aside>
    </article>
  );
}
