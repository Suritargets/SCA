import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, bookings, services } from "@/db";
import { isSlotBookable } from "@/lib/availability";
import { bookingSchema } from "@/lib/validation";
import {
  sendEmail,
  ADMIN_EMAIL,
  bookingConfirmationCustomer,
  bookingNotificationAdmin,
} from "@/lib/email";

export const dynamic = "force-dynamic";

// POST /api/bookings — create a booking (public).
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validatiefout", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot: silently accept but drop bot submissions.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Re-check availability at commit time (double-booking guard).
  const check = await isSlotBookable(data.date, data.startTime, data.serviceId);
  if (!check.ok) {
    return NextResponse.json({ error: check.reason ?? "Slot niet beschikbaar" }, { status: 409 });
  }

  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, data.serviceId))
    .limit(1);

  const [booking] = await db
    .insert(bookings)
    .values({
      serviceId: data.serviceId,
      date: data.date,
      startTime: data.startTime,
      endTime: check.endTime!,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone || null,
      notes: data.notes || null,
      status: "confirmed",
    })
    .returning();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const cancelUrl = `${appUrl}/boeken/annuleren?token=${booking.cancelToken}`;
  const emailData = {
    serviceName: service.name,
    date: booking.date,
    startTime: booking.startTime,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhone: booking.customerPhone,
    notes: booking.notes,
    price: service.price,
    currency: service.currency,
    cancelUrl,
  };

  // Fire emails (best-effort; failures are logged, not fatal).
  await Promise.all([
    sendEmail({ to: booking.customerEmail, ...bookingConfirmationCustomer(emailData) }),
    sendEmail({ to: ADMIN_EMAIL, ...bookingNotificationAdmin(emailData) }),
  ]);

  return NextResponse.json({ ok: true, id: booking.id });
}
