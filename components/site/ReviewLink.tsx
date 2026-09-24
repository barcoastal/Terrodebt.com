"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { placement: string };

export function ReviewLink({ placement, children, onClick, ...props }: Props) {
  return (
    <Link {...props} onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      const analytics = window as typeof window & {
        gtag?: (...args: unknown[]) => void;
      };
      // This measures interest only. Existing lead submission owns conversion tracking.
      try {
        analytics.gtag?.("event", "review_cta_click", {
          cta_placement: placement,
          link_url: String(props.href),
        });
      } catch { /* Analytics must never interrupt navigation. */ }
    }}>
      {children}
    </Link>
  );
}
