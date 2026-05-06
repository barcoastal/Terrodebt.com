"use client";
import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k);
    const payload = {
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_content: get("utm_content"),
      utm_term: get("utm_term"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
    };
    fetch("/api/visitor", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
    try {
      ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid"].forEach((k) => {
        const v = get(k);
        if (v) localStorage.setItem(`td_${k}`, v);
      });
    } catch {}
  }, []);
  return null;
}
