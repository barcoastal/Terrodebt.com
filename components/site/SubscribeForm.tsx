"use client";
import { useState } from "react";

export function SubscribeForm({ source = "newsletter" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="text-sm text-slate">Thanks, you are subscribed.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        placeholder="you@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white border border-border rounded-lg px-3 py-2.5 text-sm focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="bg-slate text-white px-4 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-slate-soft transition no-underline"
      >
        {state === "submitting" ? "..." : "Subscribe"}
      </button>
      {state === "error" && (
        <span className="self-center text-xs text-muted">Try again.</span>
      )}
    </form>
  );
}
