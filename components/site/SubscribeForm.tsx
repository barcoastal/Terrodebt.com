"use client";
import { useState } from "react";

type Variant = "light" | "dark";

export function SubscribeForm({
  source = "newsletter",
  variant = "light",
}: {
  source?: string;
  variant?: Variant;
}) {
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

  const isDark = variant === "dark";

  if (state === "done") {
    return (
      <p className={`text-sm ${isDark ? "text-electric" : "text-ink"}`}>
        Thanks, you are subscribed.
      </p>
    );
  }

  const inputCls = isDark
    ? "flex-1 bg-white text-ink border border-white px-3 py-3 text-sm focus:border-electric focus:ring-2 focus:ring-electric/30 outline-none"
    : "flex-1 bg-white border border-ink px-3 py-3 text-sm focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none";

  const buttonCls = isDark
    ? "bg-electric text-ink px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] font-bold disabled:opacity-50 hover:bg-electric-soft transition no-underline"
    : "bg-ink text-white px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] font-bold disabled:opacity-50 hover:bg-ink-soft transition no-underline";

  return (
    <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        placeholder="you@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputCls}
      />
      <button type="submit" disabled={state === "submitting"} className={buttonCls}>
        {state === "submitting" ? "..." : "Subscribe"}
      </button>
      {state === "error" && (
        <span className={`self-center text-xs ${isDark ? "text-white/70" : "text-muted"}`}>
          Try again.
        </span>
      )}
    </form>
  );
}
