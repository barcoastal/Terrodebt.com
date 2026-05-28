import type { Lead, Postback } from "@/app/generated/prisma";
import { db } from "./db";
import { getSetting } from "./settings";
import { sendEmail, notificationRecipients } from "./integrations/email";

export type NotificationKind = "new-lead" | "postback" | "status-change" | "integration-failure";

async function emailNotification(subject: string, html: string) {
  const to = await notificationRecipients();
  if (to.length === 0) return;
  await sendEmail({ to, subject, html });
}

function fmtDebt(lead: Lead): string {
  if (typeof lead.debtAmount === "number" && lead.debtAmount > 0) {
    return `$${lead.debtAmount.toLocaleString()}`;
  }
  return lead.debtAmountBucket ?? "n/a";
}

async function postToSlack(text: string) {
  const url = await getSetting("slack_leads_webhook_url", process.env.SLACK_LEADS_WEBHOOK_URL);
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {}
}

export async function notifyNewLead(lead: Lead) {
  const title = `New lead · ${lead.firstName} ${lead.lastName} · ${lead.businessName}`;
  const body = `${fmtDebt(lead)} · ${lead.source} · ${lead.email} · ${lead.phone}`;
  await db.notification.create({
    data: {
      type: "new-lead",
      title,
      body,
      leadId: lead.id,
      meta: {
        debtAmount: lead.debtAmount,
        source: lead.source,
        utmSource: lead.utmSource,
        utmCampaign: lead.utmCampaign,
        gclid: lead.gclid,
      } as object,
    },
  });
  await postToSlack(
    `*New Business Debt Insider lead* :seedling:\n` +
    `*Name:* ${lead.firstName} ${lead.lastName}\n` +
    `*Business:* ${lead.businessName}\n` +
    `*Email:* ${lead.email}\n` +
    `*Phone:* ${lead.phone}\n` +
    `*Debt:* ${fmtDebt(lead)}\n` +
    `*Source:* ${lead.source}\n` +
    `*UTM:* ${lead.utmSource ?? "-"} / ${lead.utmCampaign ?? "-"}\n` +
    `*gclid:* ${lead.gclid ?? "-"}`,
  );
  await emailNotification(
    `New lead: ${lead.firstName} ${lead.lastName} — ${lead.businessName}`,
    `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#0A0A0A">
      <h2 style="margin:0 0 16px;font-size:20px">New lead</h2>
      <table cellpadding="4" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        <tr><td><b>Name</b></td><td>${lead.firstName} ${lead.lastName}</td></tr>
        <tr><td><b>Business</b></td><td>${lead.businessName}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td><b>Phone</b></td><td><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
        <tr><td><b>Debt</b></td><td>${fmtDebt(lead)}</td></tr>
        <tr><td><b>Source</b></td><td>${lead.source}</td></tr>
        <tr><td><b>UTM source</b></td><td>${lead.utmSource ?? "-"}</td></tr>
        <tr><td><b>UTM campaign</b></td><td>${lead.utmCampaign ?? "-"}</td></tr>
        <tr><td><b>gclid</b></td><td><code>${lead.gclid ?? "-"}</code></td></tr>
      </table>
      <p style="margin-top:24px"><a href="https://businessdebtinsider.com/admin/leads/${lead.id}" style="background:#0A0A0A;color:#fff;padding:10px 16px;text-decoration:none;display:inline-block">Open lead in admin</a></p>
    </div>`,
  );
}

export async function notifyPostback(postback: Postback, leadName?: string) {
  const title = `Postback received from ${postback.source}${leadName ? ` · ${leadName}` : ""}`;
  const parts: string[] = [];
  if (postback.status) parts.push(`status: ${postback.status}`);
  if (typeof postback.payout === "number") parts.push(`payout: $${postback.payout.toFixed(2)}`);
  if (postback.affiliateClickid) parts.push(`affiliate_clickid: ${postback.affiliateClickid}`);
  if (postback.forwarded) parts.push("forwarded → Google Ads");
  const body = parts.join(" · ") || "see postback for details";
  await db.notification.create({
    data: {
      type: "postback",
      title,
      body,
      leadId: postback.linkedLeadId,
      postbackId: postback.id,
      meta: { source: postback.source, payout: postback.payout, status: postback.status, forwarded: postback.forwarded } as object,
    },
  });
  await postToSlack(
    `*Postback received* from \`${postback.source}\`\n` +
    `${body}\n` +
    (postback.linkedLeadId ? `Linked lead: \`${postback.linkedLeadId}\`` : "Unlinked"),
  );
  await emailNotification(
    `Postback received: ${postback.source}${leadName ? ` — ${leadName}` : ""}`,
    `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#0A0A0A">
      <h2 style="margin:0 0 16px;font-size:20px">Postback received</h2>
      <p>${body}</p>
      ${postback.linkedLeadId ? `<p><a href="https://businessdebtinsider.com/admin/leads/${postback.linkedLeadId}">Open linked lead →</a></p>` : "<p>No matching lead.</p>"}
    </div>`,
  );
}

export async function notifyStatusChange(lead: Lead, prevStatus: string) {
  const title = `Status: ${prevStatus} → ${lead.status} · ${lead.firstName} ${lead.lastName}`;
  await db.notification.create({
    data: {
      type: "status-change",
      title,
      body: `${lead.businessName} · ${lead.email}`,
      leadId: lead.id,
      meta: { prevStatus, newStatus: lead.status } as object,
    },
  });
}

export async function notifyIntegrationFailure(opts: { leadId?: string; integration: string; error: string }) {
  await db.notification.create({
    data: {
      type: "integration-failure",
      title: `Integration failed: ${opts.integration}`,
      body: opts.error,
      leadId: opts.leadId ?? null,
      meta: { integration: opts.integration } as object,
    },
  });
}
