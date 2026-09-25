import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db, bookings, services } from "@/db";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDateNL, formatDuration, formatPrice } from "@/lib/format";
import { cancelBooking, setBookingStatus } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AfspraakDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [b] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);
  if (!b) notFound();

  const [service] = await db.select().from(services).where(eq(services.id, b.serviceId)).limit(1);

  const rows: [string, string][] = [
    ["Dienst", service?.name ?? "—"],
    ["Datum", formatDateNL(b.date)],
    ["Tijd", `${b.startTime.slice(0, 5)} – ${b.endTime.slice(0, 5)}`],
    ["Duur", service ? formatDuration(service.durationMinutes) : "—"],
    ["Prijs", formatPrice(service?.price, service?.currency)],
    ["Naam", b.customerName],
    ["E-mail", b.customerEmail],
    ["Telefoon", b.customerPhone ?? "—"],
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/afspraken"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Terug naar afspraken
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sca-navy">Afspraak</h1>
        <StatusBadge status={b.status} />
      </div>

      <div className="rounded-xl border bg-white p-6">
        <dl className="divide-y text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium text-sca-navy">{v}</dd>
            </div>
          ))}
        </dl>
        {b.notes && (
          <div className="mt-4 rounded-lg bg-muted/40 p-3 text-sm">
            <p className="text-xs font-medium text-muted-foreground">Notitie</p>
            <p className="mt-1">{b.notes}</p>
          </div>
        )}
      </div>

      {b.status !== "cancelled" && (
        <div className="flex flex-wrap items-center gap-3">
          {b.status !== "completed" && (
            <form action={setBookingStatus}>
              <input type="hidden" name="id" value={b.id} />
              <input type="hidden" name="status" value="completed" />
              <button className="rounded-lg bg-sca-blue/10 px-4 py-2 text-sm font-semibold text-sca-blue hover:bg-sca-blue/20">
                Markeer als afgerond
              </button>
            </form>
          )}
          {b.status === "pending" && (
            <form action={setBookingStatus}>
              <input type="hidden" name="id" value={b.id} />
              <input type="hidden" name="status" value="confirmed" />
              <button className="rounded-lg bg-sca-green/10 px-4 py-2 text-sm font-semibold text-sca-green hover:bg-sca-green/20">
                Bevestigen
              </button>
            </form>
          )}
          <form action={cancelBooking}>
            <input type="hidden" name="id" value={b.id} />
            <button className="rounded-lg bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20">
              Annuleren (mail klant)
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
