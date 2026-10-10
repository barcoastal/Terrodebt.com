import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
export const SITE = "https://businessdebtinsider.com";
export const GRAPH = "https://graph.facebook.com/v25.0";
export function readEnv() {
  return Object.fromEntries(fs.readFileSync(path.join(ROOT, ".env"), "utf8").split("\n")
    .filter(l => /^[A-Z_][A-Z_0-9]*=/.test(l)).map(l => {
      const i = l.indexOf("="); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^(["'])(.*)\1$/, "$2")];
    }));
}
export function writeState(file, state) {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  fs.writeFileSync(file + ".tmp", JSON.stringify(state, null, 2), { mode: 0o600 });
  fs.renameSync(file + ".tmp", file);
}
export function graphClient(token, fetchImpl = fetch) {
  return async (route, params = {}, method = "GET") => {
    const url = new URL(GRAPH + route);
    if (method === "GET") url.search = new URLSearchParams(params).toString();
    const response = await fetchImpl(url, {
      method, redirect: "error", signal: AbortSignal.timeout(60000),
      headers: { Authorization: `Bearer ${token}`, ...(method === "POST" ? { "content-type": "application/x-www-form-urlencoded" } : {}) },
      ...(method === "POST" ? { body: new URLSearchParams(params) } : {}),
    });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(`Meta ${method} ${route}: ${String(data.error?.message || response.status).replaceAll(token, "[redacted]").slice(0, 400)}`);
    return data;
  };
}
