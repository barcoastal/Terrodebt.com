// Read each source independently: browsers may allow cookies while blocking storage.
function stored(key: string): string | undefined {
  try { return localStorage.getItem(`td_${key}`) || undefined; } catch { return undefined; }
}

function cookie(name: string): string | undefined {
  try {
    const value = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
    return value ? decodeURIComponent(value.slice(name.length + 1)) || undefined : undefined;
  } catch { return undefined; }
}

export function readTrakkitClickId(): string | undefined {
  try {
    const current = new URLSearchParams(window.location.search).get("tkclid");
    if (current) return current;
  } catch {}
  try {
    const tracker = (window as Window & { trakkit?: { getClickId?: () => string | null } }).trakkit;
    const current = tracker?.getClickId?.();
    if (current) return current;
  } catch {}
  return cookie("tkclid") || cookie("td_tkclid") || stored("tkclid");
}

export function readClientMeta() {
  return {
    utmSource: stored("utm_source"),
    utmMedium: stored("utm_medium"),
    utmCampaign: stored("utm_campaign"),
    utmContent: stored("utm_content"),
    utmTerm: stored("utm_term"),
    gclid: stored("gclid"),
    fbclid: stored("fbclid"),
    affiliateClickid: stored("affiliate_clickid"),
    tkclid: readTrakkitClickId(),
  };
}
