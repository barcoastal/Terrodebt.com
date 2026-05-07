"use client";
import { useState } from "react";
import type { ContractAnalysis } from "@/lib/contract-analyze";

export function UploadCard({ onResult }: { onResult: (id: string, a: ContractAnalysis) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!file) return;
    setLoading(true); setError(null);
    try {
      const fd = new FormData(); fd.set("file", file);
      const res = await fetch("/api/contract-review", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      onResult(json.reviewId, json.analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="surface-card-elevated p-8">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Upload your MCA contract</h2>
      <p className="mt-3 text-muted">PDF only, up to 10MB. We extract the financial terms and flag what to watch for. Free, no email required.</p>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-5 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-offwhite file:text-slate file:font-medium hover:file:bg-border/50 transition" />
      <button disabled={!file || loading} onClick={submit} className="mt-5 bg-electric text-white px-5 py-2.5 rounded-lg font-medium disabled:opacity-40 hover:bg-electric-soft transition">
        {loading ? "Analyzing..." : "Analyze contract"}
      </button>
      {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
    </div>
  );
}
