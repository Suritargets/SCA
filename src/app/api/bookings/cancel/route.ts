import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, bookings, services } from "@/db";
import {
  sendEmail,
  ADMIN_EMAIL,
  bookingCancelledCustomer,
  bookingCancelledAdmin,
} from "@/lib/email";

export const dynamic = "force-dynamic";

// GET /api/bookings/cancel?token=xxx — validate a cancel link.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Token ontbreekt" }, { status: 400 });

  const [row] = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      startTime: bookings.startTime,
      status: bookings.status,
      serviceName: services.name,
    })
    .from(bookings)
    .leftJoin(services, eq(services.id, bookings.serviceId))
    .where(eq(bookings.cancelToken, token))
    .limit(1);

  if (!row) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(row);
}

// POST /api/bookings/cancel { token } — cancel via emailed link.
export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({ token: null }));
  if (!token) return NextResponse.json({ error: "Token ontbreekt" }, { status: 400 });

  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.cancelToken, token))
    .limit(1);
  if (!booking) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  if (booking.status === "cancelled") return NextResponse.json({ ok: true });

  await db
    .update(bookings)
    .set({ status: "cancelled", cancelledAt: new Date(), cancelledBy: "customer", updatedAt: new Date() })
    .where(eq(bookings.id, booking.id));

  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, booking.serviceId))
    .limit(1);

  const emailData = {
    serviceName: service?.name ?? "Afspraak",
    date: booking.date,
    startTime: booking.startTime,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    price: service?.price,
    currency: service?.currency,
  };
  await Promise.all([
    sendEmail({ to: booking.customerEmail, ...bookingCancelledCustomer(emailData) }),
    sendEmail({ to: ADMIN_EMAIL, ...bookingCancelledAdmin(emailData) }),
  ]);

  return NextResponse.json({ ok: true });
}
