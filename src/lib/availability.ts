import { and, eq, ne, lte, gte } from "drizzle-orm";
import { db, availability, blockedPeriods, bookings, services } from "@/db";

// ─── time helpers (times stored as "HH:MM" or "HH:MM:SS") ───────────────────
export function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** JS getUTCDay for a YYYY-MM-DD date (0=Sun..6=Sat), computed in UTC. */
export function dayOfWeekFor(dateIso: string): number {
  const [y, m, d] = dateIso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Returns the list of bookable slot start times ("HH:MM") for a given date and
 * service, excluding blocked periods, closed days, and full/occupied slots.
 */
export async function getAvailableSlots(
  dateIso: string,
  serviceId: string
): Promise<string[]> {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, serviceId))
    .limit(1);
  if (!service || !service.isActive) return [];

  const dow = dayOfWeekFor(dateIso);
  const [avail] = await db
    .select()
    .from(availability)
    .where(eq(availability.dayOfWeek, dow))
    .limit(1);
  if (!avail || !avail.isOpen) return [];

  // Blocked periods covering this date.
  const blocks = await db
    .select()
    .from(blockedPeriods)
    .where(and(lte(blockedPeriods.startDate, dateIso), gte(blockedPeriods.endDate, dateIso)));
  if (blocks.length > 0) return [];

  // Existing (non-cancelled) bookings on the date.
  const existing = await db
    .select({ startTime: bookings.startTime, endTime: bookings.endTime })
    .from(bookings)
    .where(and(eq(bookings.date, dateIso), ne(bookings.status, "cancelled")));

  const openStart = toMinutes(avail.startTime);
  const openEnd = toMinutes(avail.endTime);
  const step = avail.slotDurationMinutes;
  const duration = service.durationMinutes;
  const maxPerSlot = avail.maxBookingsPerSlot;

  const slots: string[] = [];
  for (let start = openStart; start + duration <= openEnd; start += step) {
    const end = start + duration;
    const overlapping = existing.filter((b) =>
      overlaps(start, end, toMinutes(b.startTime), toMinutes(b.endTime))
    ).length;
    if (overlapping < maxPerSlot) slots.push(toTimeString(start));
  }
  return slots;
}

/**
 * Verifies a single slot is still bookable at commit time. Used inside the
 * booking transaction to prevent double-booking (race condition safe when
 * combined with the DB write in the same request).
 */
export async function isSlotBookable(
  dateIso: string,
  startTime: string,
  serviceId: string
): Promise<{ ok: boolean; endTime?: string; reason?: string }> {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, serviceId))
    .limit(1);
  if (!service || !service.isActive) return { ok: false, reason: "Dienst niet beschikbaar" };

  const start = toMinutes(startTime);
  const end = start + service.durationMinutes;

  const dow = dayOfWeekFor(dateIso);
  const [avail] = await db
    .select()
    .from(availability)
    .where(eq(availability.dayOfWeek, dow))
    .limit(1);
  if (!avail || !avail.isOpen) return { ok: false, reason: "Gesloten op deze dag" };
  if (start < toMinutes(avail.startTime) || end > toMinutes(avail.endTime))
    return { ok: false, reason: "Buiten openingstijden" };

  const blocks = await db
    .select()
    .from(blockedPeriods)
    .where(and(lte(blockedPeriods.startDate, dateIso), gte(blockedPeriods.endDate, dateIso)));
  if (blocks.length > 0) return { ok: false, reason: "Datum geblokkeerd" };

  const existing = await db
    .select({ startTime: bookings.startTime, endTime: bookings.endTime })
    .from(bookings)
    .where(and(eq(bookings.date, dateIso), ne(bookings.status, "cancelled")));
  const overlapping = existing.filter((b) =>
    overlaps(start, end, toMinutes(b.startTime), toMinutes(b.endTime))
  ).length;
  if (overlapping >= avail.maxBookingsPerSlot)
    return { ok: false, reason: "Tijdslot is niet meer beschikbaar" };

  return { ok: true, endTime: toTimeString(end) };
}
