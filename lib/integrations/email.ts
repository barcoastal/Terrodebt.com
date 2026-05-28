import { getSetting } from "@/lib/settings";

export type EmailResult = { ok: true; id: string } | { ok: false; error: string };

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const apiKey = await getSetting("resend_api_key", process.env.RESEND_API_KEY);
  const from = await getSetting("resend_from", process.env.RESEND_FROM) || "Business Debt Insider <onboarding@resend.dev>";
  if (!apiKey) return { ok: false, error: "resend_api_key not set" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    });
    const json = (await res.json()) as { id?: string; message?: string; name?: string };
    if (!res.ok) return { ok: false, error: json.message || json.name || `HTTP ${res.status}` };
    return { ok: true, id: json.id ?? "" };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

export async function notificationRecipients(): Promise<string[]> {
  const raw = await getSetting("notification_email_to", process.env.NOTIFICATION_EMAIL_TO);
  if (!raw) return [];
  return raw.split(/[,\s]+/).map((s) => s.trim()).filter((s) => /\S+@\S+\.\S+/.test(s));
}
