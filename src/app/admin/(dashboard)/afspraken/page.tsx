import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db, bookings, services } from "@/db";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDateShortNL } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Afspraken – SCA Beheer" };

const FILTERS = [
  { key: "all", label: "Alle" },
  { key: "confirmed", label: "Bevestigd" },
  { key: "pending", label: "In afwachting" },
  { key: "completed", label: "Afgerond" },
  { key: "cancelled", label: "Geannuleerd" },
];

export default async function AfsprakenPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = status ?? "all";

  const base = db
    .select({
      id: bookings.id,
      date: bookings.date,
      startTime: bookings.startTime,
      customerName: bookings.customerName,
      customerEmail: bookings.customerEmail,
      status: bookings.status,
      serviceName: services.name,
    })
    .from(bookings)
    .leftJoin(services, eq(services.id, bookings.serviceId))
    .orderBy(desc(bookings.date), desc(bookings.startTime));

  const rows =
    active === "all"
      ? await base
      : await base.where(eq(bookings.status, active as "confirmed"));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-sca-navy">Afspraken</h1>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/admin/afspraken" : `/admin/afspraken?status=${f.key}`}
            className={
              "rounded-full px-3 py-1 text-sm font-medium transition-colors " +
              (active === f.key
                ? "bg-sca-navy text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70")
            }
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        {rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">Geen afspraken.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Klant</th>
                <th className="px-4 py-3 font-medium">Dienst</th>
                <th className="px-4 py-3 font-medium">Datum</th>
                <th className="px-4 py-3 font-medium">Tijd</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link href={`/admin/afspraken/${b.id}`} className="font-medium text-sca-navy hover:text-sca-orange">
                      {b.customerName}
                    </Link>
                    <p className="text-xs text-muted-foreground">{b.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{b.serviceName}</td>
                  <td className="px-4 py-3">{formatDateShortNL(b.date)}</td>
                  <td className="px-4 py-3">{b.startTime.slice(0, 5)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
