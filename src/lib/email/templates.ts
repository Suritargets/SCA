import { formatDateNL, formatPrice } from "@/lib/format";

const BRAND = "#FC5E1F";
const NAVY = "#000027";

type BookingEmailData = {
  serviceName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM(:SS)
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  notes?: string | null;
  price?: string | null;
  currency?: string;
  cancelUrl?: string;
};

function shell(title: string, body: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">
        <tr><td style="background:${NAVY};padding:20px 28px;">
          <span style="color:#fff;font-size:16px;font-weight:bold;">Suriname College of Accountancy</span>
        </td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 16px;font-size:20px;color:${NAVY};">${title}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:20px 28px;background:#fafafa;border-top:1px solid #eee;color:#666;font-size:12px;">
          Henck Arronstraat 134, Paramaribo, Suriname<br/>
          info@surinamecollegeofaccountancy.com &middot; +597 425766
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function detailRows(d: BookingEmailData) {
  const rows: [string, string][] = [
    ["Dienst", d.serviceName],
    ["Datum", formatDateNL(d.date)],
    ["Tijd", d.startTime.slice(0, 5)],
  ];
  if (d.price != null) rows.push(["Prijs", formatPrice(d.price, d.currency)]);
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:8px 0 20px;">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 0;color:#666;font-size:14px;width:120px;">${k}</td><td style="padding:8px 0;color:${NAVY};font-size:14px;font-weight:600;">${v}</td></tr>`
      )
      .join("")}
  </table>`;
}

function button(url: string, label: string) {
  return `<a href="${url}" style="display:inline-block;background:${BRAND};color:#fff;text-decoration:none;padding:11px 20px;border-radius:8px;font-size:14px;font-weight:600;">${label}</a>`;
}

export function bookingConfirmationCustomer(d: BookingEmailData) {
  return {
    subject: `Bevestiging afspraak – ${d.serviceName}`,
    html: shell(
      "Je afspraak is bevestigd",
      `<p style="font-size:14px;line-height:1.6;">Beste ${d.customerName},</p>
       <p style="font-size:14px;line-height:1.6;">Bedankt voor je boeking. Hieronder vind je de details van je afspraak.</p>
       ${detailRows(d)}
       ${d.notes ? `<p style="font-size:14px;"><strong>Notitie:</strong> ${d.notes}</p>` : ""}
       ${d.cancelUrl ? `<p style="font-size:14px;line-height:1.6;">Kun je niet komen? Annuleer je afspraak hieronder.</p>${button(d.cancelUrl, "Afspraak annuleren")}` : ""}
      `
    ),
  };
}

export function bookingNotificationAdmin(d: BookingEmailData) {
  return {
    subject: `Nieuwe boeking – ${d.serviceName} (${formatDateNL(d.date)})`,
    html: shell(
      "Nieuwe boeking ontvangen",
      `${detailRows(d)}
       <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
         <tr><td style="padding:6px 0;color:#666;font-size:14px;width:120px;">Naam</td><td style="padding:6px 0;font-size:14px;">${d.customerName}</td></tr>
         <tr><td style="padding:6px 0;color:#666;font-size:14px;">Email</td><td style="padding:6px 0;font-size:14px;">${d.customerEmail}</td></tr>
         <tr><td style="padding:6px 0;color:#666;font-size:14px;">Telefoon</td><td style="padding:6px 0;font-size:14px;">${d.customerPhone ?? "—"}</td></tr>
       </table>
       ${d.notes ? `<p style="font-size:14px;"><strong>Notitie:</strong> ${d.notes}</p>` : ""}`
    ),
  };
}

export function bookingCancelledCustomer(d: BookingEmailData) {
  return {
    subject: `Afspraak geannuleerd – ${d.serviceName}`,
    html: shell(
      "Je afspraak is geannuleerd",
      `<p style="font-size:14px;line-height:1.6;">Beste ${d.customerName},</p>
       <p style="font-size:14px;line-height:1.6;">Je afspraak is geannuleerd. Neem gerust contact op om een nieuwe afspraak te maken.</p>
       ${detailRows(d)}`
    ),
  };
}

export function bookingCancelledAdmin(d: BookingEmailData) {
  return {
    subject: `Boeking geannuleerd – ${d.serviceName} (${formatDateNL(d.date)})`,
    html: shell(
      "Een boeking is geannuleerd",
      `<p style="font-size:14px;">Klant: ${d.customerName} (${d.customerEmail})</p>
       ${detailRows(d)}`
    ),
  };
}

type ContactData = { name: string; email: string; phone?: string | null; message: string };

export function contactConfirmationCustomer(d: ContactData) {
  return {
    subject: "We hebben je bericht ontvangen",
    html: shell(
      "Bedankt voor je bericht",
      `<p style="font-size:14px;line-height:1.6;">Beste ${d.name},</p>
       <p style="font-size:14px;line-height:1.6;">We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.</p>
       <blockquote style="margin:16px 0;padding:12px 16px;background:#fafafa;border-left:3px solid ${BRAND};font-size:14px;color:#444;">${d.message}</blockquote>`
    ),
  };
}

export function contactNotificationAdmin(d: ContactData) {
  return {
    subject: `Nieuw contactformulier – ${d.name}`,
    html: shell(
      "Nieuw bericht via contactformulier",
      `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
         <tr><td style="padding:6px 0;color:#666;font-size:14px;width:100px;">Naam</td><td style="padding:6px 0;font-size:14px;">${d.name}</td></tr>
         <tr><td style="padding:6px 0;color:#666;font-size:14px;">Email</td><td style="padding:6px 0;font-size:14px;">${d.email}</td></tr>
         <tr><td style="padding:6px 0;color:#666;font-size:14px;">Telefoon</td><td style="padding:6px 0;font-size:14px;">${d.phone ?? "—"}</td></tr>
       </table>
       <blockquote style="margin:0;padding:12px 16px;background:#fafafa;border-left:3px solid ${BRAND};font-size:14px;color:#444;">${d.message}</blockquote>`
    ),
  };
}
