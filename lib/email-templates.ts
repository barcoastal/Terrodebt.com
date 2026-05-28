// Email-safe HTML helpers for Business Debt Insider transactional emails.
// Uses inline styles and tables for maximum client compatibility (Gmail, Outlook, Apple Mail).
//
// Brand tokens:
//   ink         #0A0A0A
//   paper       #FFFFFF
//   paper-mute  #F5F4F0
//   pine        #064E3B
//   pine-bright #10B981
//   muted       #6B6B6B
//   hairline    #E5E4DD

const COLORS = {
  ink: "#0A0A0A",
  paper: "#FFFFFF",
  paperMute: "#F5F4F0",
  pine: "#064E3B",
  pineBright: "#10B981",
  muted: "#6B6B6B",
  hairline: "#E5E4DD",
};

const FONT_SANS = `"Inter Tight", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
const FONT_MONO = `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`;

const BASE_URL = "https://businessdebtinsider.com";

export function shell({ title, preheader, eyebrow, headline, bodyHtml, ctaLabel, ctaHref }: {
  title: string;
  preheader: string;
  eyebrow: string;
  headline: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaHref?: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title>
<style>
  body { margin: 0; padding: 0; background: ${COLORS.paperMute}; }
  table { border-collapse: collapse; }
  .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
  a { color: ${COLORS.pine}; }
  @media (prefers-color-scheme: dark) {
    body { background: ${COLORS.ink} !important; }
    .card { background: ${COLORS.ink} !important; border-color: #1f1f1f !important; }
    .ink, .ink * { color: #F5F4F0 !important; }
    .muted, .muted * { color: #9b9b9b !important; }
    .hairline { border-color: #1f1f1f !important; }
  }
</style>
</head>
<body>
<span class="preheader">${escape(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.paperMute};font-family:${FONT_SANS};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${COLORS.paper};border:1px solid ${COLORS.hairline};">

        <!-- Masthead -->
        <tr>
          <td style="padding:24px 32px 18px 32px;border-bottom:1px solid ${COLORS.hairline};" class="hairline">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="font-family:${FONT_MONO};font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${COLORS.muted};font-weight:500;">Business Debt</div>
                  <div style="height:1px;background:${COLORS.pine};width:120px;margin:6px 0;font-size:0;line-height:0;">&nbsp;</div>
                  <div style="font-family:${FONT_SANS};font-size:22px;font-weight:900;letter-spacing:2px;color:${COLORS.ink};" class="ink">INSIDER</div>
                </td>
                <td align="right" style="font-family:${FONT_MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.muted};font-weight:500;">
                  Internal notification
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Eyebrow + headline -->
        <tr>
          <td style="padding:36px 32px 8px 32px;">
            <div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${COLORS.pine};font-weight:600;">${escape(eyebrow)}</div>
            <h1 class="ink" style="margin:14px 0 0 0;font-family:${FONT_SANS};font-size:32px;line-height:1.15;font-weight:800;letter-spacing:-0.5px;color:${COLORS.ink};">${escape(headline)}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px 32px 8px 32px;">
            ${bodyHtml}
          </td>
        </tr>

        ${ctaLabel && ctaHref ? `
        <!-- CTA -->
        <tr>
          <td style="padding:18px 32px 36px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:${COLORS.pine};">
                  <a href="${escape(ctaHref)}" style="display:inline-block;padding:14px 22px;font-family:${FONT_MONO};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${COLORS.paper};text-decoration:none;font-weight:600;">${escape(ctaLabel)} &nbsp;→</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : ""}

        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px 28px 32px;border-top:1px solid ${COLORS.hairline};" class="hairline">
            <div class="muted" style="font-family:${FONT_MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.muted};line-height:1.6;">
              Business Debt Insider · GRL Recovery LLC · Fort Lauderdale, FL
            </div>
            <div class="muted" style="font-family:${FONT_SANS};font-size:12px;color:${COLORS.muted};line-height:1.6;margin-top:8px;">
              Sent automatically by the practice's notification system. Manage at
              <a href="${BASE_URL}/admin/settings" style="color:${COLORS.pine};text-decoration:underline;">/admin/settings</a>.
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function dataRow(label: string, value: string, opts?: { mono?: boolean }): string {
  const valueFont = opts?.mono ? FONT_MONO : FONT_SANS;
  const valueSize = opts?.mono ? "13px" : "15px";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.hairline};vertical-align:top;width:38%;" class="hairline">
        <div class="muted" style="font-family:${FONT_MONO};font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${COLORS.muted};font-weight:500;">${escape(label)}</div>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${COLORS.hairline};vertical-align:top;" class="hairline">
        <div class="ink" style="font-family:${valueFont};font-size:${valueSize};color:${COLORS.ink};line-height:1.5;word-break:break-word;">${value}</div>
      </td>
    </tr>`;
}

export function dataTable(rows: string[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.join("")}</table>`;
}

export function leadUrl(leadId: string): string {
  return `${BASE_URL}/admin/leads/${leadId}`;
}

export function postbacksUrl(): string {
  return `${BASE_URL}/admin/postbacks`;
}

function escape(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// Allow raw HTML through (e.g. inline links inside the body) when needed.
export function raw(html: string): string { return html; }
