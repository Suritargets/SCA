import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "SCA <onboarding@resend.dev>";
export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "info@surinamecollegeofaccountancy.com";

type SendArgs = { to: string | string[]; subject: string; html: string };

/**
 * Sends an email via Resend. If no API key is configured (local dev),
 * the message is logged to the console instead of throwing, so the rest
 * of the flow (booking, contact) still works end-to-end.
 */
export async function sendEmail({ to, subject, html }: SendArgs): Promise<void> {
  if (!resend) {
    console.log(`\n📧 [email disabled] To: ${to}\n   Subject: ${subject}\n`);
    return;
  }
  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html });
    if (error) console.error("Resend error:", error);
  } catch (err) {
    // Never let email failures break a booking/contact submission.
    console.error("Failed to send email:", err);
  }
}

export * from "./templates";
