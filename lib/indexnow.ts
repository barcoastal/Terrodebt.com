import config from "./indexnow-config.json";

export function indexNowPayload(paths: string[]) {
  const origin = `https://${config.host}`;
  const urlList = [...new Set(paths)].map(path => {
    if (!/^\/(?:insights(?:\/[a-z0-9-]+)?|lenders(?:\/[a-z0-9-]+)?|tools(?:\/[a-z0-9-]+)?)$/.test(path)) {
      throw new Error("IndexNow only accepts supported public content paths");
    }
    return origin + path;
  });
  if (urlList.length > 10000) throw new Error("Too many IndexNow URLs");
  return { host: config.host, key: config.key, keyLocation: `${origin}/${config.key}.txt`, urlList };
}

/** Best effort: submission errors must not undo an already-saved article. */
export async function notifyIndexNow(paths: string[]) {
  if (!paths.length) return;
  try {
    const body = indexNowPayload(paths);
    const response = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(3000) });
    if (response.status !== 200 && response.status !== 202) console.warn("IndexNow notification failed", response.status);
  } catch {
    console.warn("IndexNow notification could not be delivered");
  }
}
