import Link from "next/link";
import { and, gte, asc, eq, ne } from "drizzle-orm";
import { db, bookings, services } from "@/db";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDateNL } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Kalender – SCA Beheer" };

export default async function KalenderPage() {
  const today = new Date().toISOString().slice(0, 10);

  const rows = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      customerName: bookings.customerName,
      status: bookings.status,
      serviceName: services.name,
    })
    .from(bookings)
    .leftJoin(services, eq(services.id, bookings.serviceId))
    .where(and(gte(bookings.date, today), ne(bookings.status, "cancelled")))
    .orderBy(asc(bookings.date), asc(bookings.startTime));

  // Group by date
  const byDate = new Map<string, typeof rows>();
  for (const r of rows) {
    if (!byDate.has(r.date)) byDate.set(r.date, []);
    byDate.get(r.date)!.push(r);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Kalender</h1>
        <p className="text-sm text-muted-foreground">Aankomende afspraken per dag.</p>
      </div>

      {byDate.size === 0 ? (
        <p className="rounded-xl border bg-white px-5 py-10 text-center text-sm text-muted-foreground">
          Geen aankomende afspraken.
        </p>
      ) : (
        <div className="space-y-6">
          {[...byDate.entries()].map(([date, items]) => (
            <div key={date} className="overflow-hidden rounded-xl border bg-white">
              <div className="border-b bg-muted/40 px-5 py-2.5">
                <p className="text-sm font-semibold text-sca-navy">{formatDateNL(date)}</p>
              </div>
              <ul className="divide-y">
                {items.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/admin/afspraken/${b.id}`}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-muted/30"
                    >
                      <span className="w-24 shrink-0 text-sm font-medium text-sca-navy">
                        {b.startTime.slice(0, 5)}–{b.endTime.slice(0, 5)}
                      </span>
                      <span className="flex-1 truncate text-sm">
                        <span className="font-medium text-sca-navy">{b.customerName}</span>
                        <span className="text-muted-foreground"> · {b.serviceName}</span>
                      </span>
                      <StatusBadge status={b.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
