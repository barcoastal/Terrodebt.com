"use client";
import { useEffect } from "react";

/**
 * Injects an arbitrary raw HTML/JS blob (pasted by an admin in Settings) into
 * the document head or end of body, executing any <script> tags it contains.
 *
 * Scripts set via innerHTML do NOT execute, so we parse the blob and re-create
 * each <script> as a fresh node (copying attributes + inline code). This is how
 * "header/footer scripts" plugins work, and it reliably runs vendor snippets
 * (Meta Pixel, TikTok, GTM, custom tags). Runs once after hydration.
 */
export function RawScripts({ html, target = "body" }: { html?: string; target?: "head" | "body" }) {
  useEffect(() => {
    if (!html || !html.trim()) return;
    const root = target === "head" ? document.head : document.body;
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    const injected: Node[] = [];

    tpl.content.childNodes.forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const old = node as HTMLScriptElement;
        const script = document.createElement("script");
        for (const attr of Array.from(old.attributes)) script.setAttribute(attr.name, attr.value);
        script.text = old.text;
        root.appendChild(script);
        injected.push(script);
      } else {
        const clone = node.cloneNode(true);
        root.appendChild(clone);
        injected.push(clone);
      }
    });

    return () => {
      injected.forEach((n) => {
        if (n.parentNode) n.parentNode.removeChild(n);
      });
    };
  }, [html, target]);

  return null;
}
