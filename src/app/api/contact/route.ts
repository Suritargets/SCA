import { NextRequest, NextResponse } from "next/server";
import { db, contactSubmissions } from "@/db";
import { contactSchema } from "@/lib/validation";
import {
  sendEmail,
  ADMIN_EMAIL,
  contactConfirmationCustomer,
  contactNotificationAdmin,
} from "@/lib/email";

export const dynamic = "force-dynamic";

// POST /api/contact — public contact form submission.
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validatiefout", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true }); // honeypot
  }

  await db.insert(contactSubmissions).values({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    message: data.message,
  });

  await Promise.all([
    sendEmail({ to: data.email, ...contactConfirmationCustomer(data) }),
    sendEmail({ to: ADMIN_EMAIL, ...contactNotificationAdmin(data) }),
  ]);

  return NextResponse.json({ ok: true });
}
