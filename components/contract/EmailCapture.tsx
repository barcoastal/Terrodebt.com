"use client";
import { useState } from "react";

export function EmailCapture({ reviewId }: { reviewId: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    try {
      await fetch("/api/contract-review/capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reviewId, email }),
      });
      setDone(true);
    } finally { setSubmitting(false); }
  }

  if (done) return <p className="text-sm text-muted mt-6">Sent. Check your inbox in a minute.</p>;

  return (
    <div className="mt-8 bg-offwhite p-6 rounded-md">
      <p className="font-medium">Want this analysis as a PDF?</p>
      <div className="mt-2 flex gap-2">
        <input type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 border border-border rounded-md px-3 py-2" />
        <button onClick={submit} disabled={!email || submitting} className="bg-electric text-white px-4 py-2 rounded-md disabled:opacity-50">{submitting ? "..." : "Email it"}</button>
      </div>
      <p className="mt-1 text-xs text-muted">Optional. Your analysis is already shown above.</p>
    </div>
  );
}
