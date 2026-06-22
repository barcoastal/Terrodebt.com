import Script from "next/script";
import { getSetting } from "@/lib/settings";
import { RawScripts } from "./RawScripts";

/**
 * Site-wide tracking. All values are managed from /admin/settings (DB-backed),
 * so new pixels can be added without a deploy. Rendered in the (site) and
 * (landing) layouts only — never on /admin.
 *
 * Named pixels (GA4, Google Ads, Meta, TikTok) emit proper next/script
 * snippets from just an ID. The custom head/body boxes accept any raw vendor
 * snippet (GTM, Hotjar, custom tags) via the RawScripts injector.
 */
export async function TrackingScripts() {
  const [ga4, adsId, metaPixel, tiktokPixel, customHead, customBody] = await Promise.all([
    getSetting("ga4_measurement_id", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
    getSetting("google_ads_conversion_id"),
    getSetting("meta_pixel_id"),
    getSetting("tiktok_pixel_id"),
    getSetting("custom_head_scripts"),
    getSetting("custom_body_scripts"),
  ]);

  // GA4 and Google Ads both ride on gtag.js. Load the library once, then config each.
  const gtagId = ga4 || adsId;
  const gtagConfig =
    (ga4 ? `gtag('config', '${ga4}');` : "") + (adsId ? `gtag('config', '${adsId}');` : "");

  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); ${gtagConfig}`}
          </Script>
        </>
      )}

      {metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}
        </Script>
      )}

      {tiktokPixel && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${tiktokPixel}');ttq.page()}(window,document,'ttq');`}
        </Script>
      )}

      {customHead && <RawScripts html={customHead} target="head" />}
      {customBody && <RawScripts html={customBody} target="body" />}
    </>
  );
}
