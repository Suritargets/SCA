import Link from "next/link";
import { and, gte, lte, ne, eq, count } from "drizzle-orm";
import { db, bookings, contactSubmissions, services } from "@/db";
import { CalendarDays, ClipboardList, Inbox, Briefcase, ArrowRight, Database } from "lucide-react";
import { formatDateShortNL } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard – SCA Beheer" };

function isoOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function AdminDashboard() {
  const today = isoOffset(0);
  const weekEnd = isoOffset(7);

  let stats = [
    { label: "Afspraken vandaag", value: "—", icon: CalendarDays, href: "/admin/kalender" },
    { label: "Deze week", value: "—", icon: ClipboardList, href: "/admin/afspraken" },
    { label: "Ongelezen berichten", value: "—", icon: Inbox, href: "/admin/contact" },
    { label: "Actieve diensten", value: "—", icon: Briefcase, href: "/admin/diensten" },
  ];
  let upcoming: { id: string; date: string; startTime: string; customerName: string; status: string; serviceName: string | null }[] = [];
  let dbError = false;

  try {
    const [[todayCount], [weekCount], [unread], [activeServices], rows] = await Promise.all([
      db.select({ v: count() }).from(bookings).where(and(eq(bookings.date, today), ne(bookings.status, "cancelled"))),
      db.select({ v: count() }).from(bookings).where(and(gte(bookings.date, today), lte(bookings.date, weekEnd), ne(bookings.status, "cancelled"))),
      db.select({ v: count() }).from(contactSubmissions).where(eq(contactSubmissions.isRead, false)),
      db.select({ v: count() }).from(services).where(eq(services.isActive, true)),
      db.select({ id: bookings.id, date: bookings.date, startTime: bookings.startTime, customerName: bookings.customerName, status: bookings.status, serviceName: services.name })
        .from(bookings).leftJoin(services, eq(services.id, bookings.serviceId))
        .where(and(gte(bookings.date, today), ne(bookings.status, "cancelled")))
        .orderBy(bookings.date, bookings.startTime).limit(8),
    ]);
    stats = [
      { label: "Afspraken vandaag", value: String(todayCount.v), icon: CalendarDays, href: "/admin/kalender" },
      { label: "Deze week", value: String(weekCount.v), icon: ClipboardList, href: "/admin/afspraken" },
      { label: "Ongelezen berichten", value: String(unread.v), icon: Inbox, href: "/admin/contact" },
      { label: "Actieve diensten", value: String(activeServices.v), icon: Briefcase, href: "/admin/diensten" },
    ];
    upcoming = rows;
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overzicht van je afspraken en berichten.</p>
      </div>

      {dbError && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <Database className="h-4 w-4 shrink-0" />
          Database niet verbonden. Voeg een geldige <code className="font-mono">DATABASE_URL</code> toe aan <code className="font-mono">.env.local</code> en voer <code className="font-mono">npm run db:push &amp;&amp; npm run db:seed</code> uit.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-xl border bg-white p-5 transition-shadow hover:shadow-sm">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-sca-orange" />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-3xl font-bold text-sca-navy">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-semibold text-sca-navy">Aankomende afspraken</h2>
          <Link href="/admin/afspraken" className="text-sm font-medium text-sca-orange hover:underline">
            Alle afspraken
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            {dbError ? "Database niet verbonden." : "Geen aankomende afspraken."}
          </p>
        ) : (
          <ul className="divide-y">
            {upcoming.map((b) => (
              <li key={b.id}>
                <Link href={`/admin/afspraken/${b.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/40">
                  <div>
                    <p className="text-sm font-medium text-sca-navy">{b.customerName}</p>
                    <p className="text-xs text-muted-foreground">{b.serviceName}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium text-sca-navy">{formatDateShortNL(b.date)}</p>
                    <p className="text-xs text-muted-foreground">{b.startTime.slice(0, 5)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
