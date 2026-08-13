import type { Lead, Postback } from "@/app/generated/prisma";
import { db } from "./db";
import { getSetting } from "./settings";
import { sendEmail, notificationRecipients } from "./integrations/email";
import { shell, dataRow, dataTable, leadUrl, postbacksUrl } from "./email-templates";

export type NotificationKind = "new-lead" | "postback" | "status-change" | "integration-failure";

async function emailNotification(subject: string, html: string) {
  const to = await notificationRecipients();
  if (to.length === 0) return;
  // Send per recipient: with a sandbox/restricted sender, one blocked address
  // must not sink delivery to the others. Surface failures in the admin feed.
  const failures: string[] = [];
  for (const recipient of to) {
    const result = await sendEmail({ to: recipient, subject, html });
    if (!result.ok) failures.push(`${recipient}: ${result.error}`);
  }
  if (failures.length > 0) {
    try {
      await db.notification.create({
        data: {
          type: "integration-failure",
          title: `Email notification failed (${failures.length}/${to.length} recipients)`,
          body: failures.join(" | ").slice(0, 1000),
        },
      });
    } catch {}
  }
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
  const headline = `${lead.firstName} ${lead.lastName}`;
  const preheader = `${lead.businessName} · ${fmtDebt(lead)} · ${lead.source}`;
  const html = shell({
    title: `New lead — ${lead.businessName}`,
    preheader,
    eyebrow: "New lead",
    headline,
    bodyHtml: dataTable([
      dataRow("Business", lead.businessName),
      dataRow("Email", `<a href="mailto:${lead.email}" style="color:#064E3B;text-decoration:underline;">${lead.email}</a>`),
      dataRow("Phone", `<a href="tel:${lead.phone}" style="color:#064E3B;text-decoration:underline;">${lead.phone}</a>`),
      dataRow("Debt", fmtDebt(lead)),
      dataRow("Source page", lead.source, { mono: true }),
      dataRow("UTM source", lead.utmSource ?? "—", { mono: true }),
      dataRow("UTM campaign", lead.utmCampaign ?? "—", { mono: true }),
      dataRow("gclid", lead.gclid ?? "—", { mono: true }),
    ]),
    ctaLabel: "Open lead",
    ctaHref: leadUrl(lead.id),
  });
  await emailNotification(`New lead · ${headline} — ${lead.businessName}`, html);
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
  const rows = [
    dataRow("Source", postback.source, { mono: true }),
    dataRow("Status", postback.status ?? "—"),
    dataRow("Payout", typeof postback.payout === "number" ? `$${postback.payout.toFixed(2)}` : "—", { mono: true }),
    dataRow("Affiliate click ID", postback.affiliateClickid ?? "—", { mono: true }),
    dataRow("gclid", postback.gclid ?? "—", { mono: true }),
    dataRow("Linked lead", postback.linkedLeadId ? `<a href="${leadUrl(postback.linkedLeadId)}" style="color:#064E3B;text-decoration:underline;">${leadName ?? postback.linkedLeadId}</a>` : "—"),
    dataRow("Forwarded to Google Ads", postback.forwarded ? "Yes" : "No"),
  ];
  const html = shell({
    title: `Postback — ${postback.source}`,
    preheader: body,
    eyebrow: "Postback received",
    headline: leadName ? `${postback.source} · ${leadName}` : postback.source,
    bodyHtml: dataTable(rows),
    ctaLabel: postback.linkedLeadId ? "Open lead" : "View postbacks",
    ctaHref: postback.linkedLeadId ? leadUrl(postback.linkedLeadId) : postbacksUrl(),
  });
  await emailNotification(`Postback · ${postback.source}${leadName ? ` — ${leadName}` : ""}`, html);
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
