"use client";
import { useState } from "react";
import { UploadCard } from "@/components/contract/UploadCard";
import { ResultCard } from "@/components/contract/ResultCard";
import { EmailCapture } from "@/components/contract/EmailCapture";
import type { ContractAnalysis } from "@/lib/contract-analyze";

export default function ContractReviewPage() {
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);

  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">Free tool</span>
        <h1 className="mt-4 text-4xl font-bold">AI MCA Contract Review</h1>
        <p className="mt-4 text-muted">Upload your MCA contract. Get the effective APR, total payback, red flags, and your options in 30 seconds. No email required.</p>
        <ul className="mt-6 space-y-2 text-sm text-slate">
          <li>✓ Effective APR breakdown</li>
          <li>✓ Total payback calculation</li>
          <li>✓ Red flag detection (COJ, personal guarantee, prepayment penalty)</li>
          <li>✓ Tailored next-step options</li>
        </ul>
      </div>
      <div>
        {!analysis && <UploadCard onResult={(id, a) => { setReviewId(id); setAnalysis(a); }} />}
        {analysis && reviewId && <>
          <ResultCard a={analysis} />
          <EmailCapture reviewId={reviewId} />
        </>}
      </div>
    </section>
  );
}
