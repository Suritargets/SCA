import { asc } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import { db, availability, blockedPeriods } from "@/db";
import { Input } from "@/components/ui/input";
import { formatDateShortNL } from "@/lib/format";
import { saveAvailability, addBlockedPeriod, deleteBlockedPeriod } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Beschikbaarheid – SCA Beheer" };

const DAYS = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

export default async function BeschikbaarheidPage() {
  const rows = await db.select().from(availability);
  const blocks = await db.select().from(blockedPeriods).orderBy(asc(blockedPeriods.startDate));

  const byDay = new Map(rows.map((r) => [r.dayOfWeek, r]));

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Beschikbaarheid</h1>
        <p className="text-sm text-muted-foreground">
          Stel openingstijden per dag in en blokkeer vrije dagen.
        </p>
      </div>

      {/* Weekly hours */}
      <form action={saveAvailability} className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold text-sca-navy">Openingstijden</h2>
        </div>
        <div className="divide-y">
          {DAYS.map((label, dow) => {
            const d = byDay.get(dow);
            return (
              <div key={dow} className="grid grid-cols-2 items-center gap-3 px-5 py-3 sm:grid-cols-[140px_auto_auto_1fr_1fr]">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    name={`open-${dow}`}
                    defaultChecked={d?.isOpen ?? false}
                    className="h-4 w-4 accent-sca-orange"
                  />
                  {label}
                </label>
                <Input type="time" name={`start-${dow}`} defaultValue={d?.startTime?.slice(0, 5) ?? "09:00"} className="w-28" />
                <Input type="time" name={`end-${dow}`} defaultValue={d?.endTime?.slice(0, 5) ?? "17:00"} className="w-28" />
                <label className="text-xs text-muted-foreground">
                  Slot (min)
                  <Input type="number" name={`slot-${dow}`} defaultValue={d?.slotDurationMinutes ?? 30} min={5} className="mt-1 w-24" />
                </label>
                <label className="text-xs text-muted-foreground">
                  Max/slot
                  <Input type="number" name={`max-${dow}`} defaultValue={d?.maxBookingsPerSlot ?? 1} min={1} className="mt-1 w-24" />
                </label>
              </div>
            );
          })}
        </div>
        <div className="border-t px-5 py-4">
          <button className="rounded-lg bg-sca-orange px-5 py-2 text-sm font-semibold text-white hover:bg-sca-orange-dark">
            Opslaan
          </button>
        </div>
      </form>

      {/* Blocked periods */}
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold text-sca-navy">Vrije dagen / geblokkeerde periodes</h2>
        </div>
        <form action={addBlockedPeriod} className="flex flex-wrap items-end gap-3 border-b px-5 py-4">
          <label className="text-xs text-muted-foreground">
            Van
            <Input type="date" name="startDate" required className="mt-1 w-40" />
          </label>
          <label className="text-xs text-muted-foreground">
            Tot en met
            <Input type="date" name="endDate" required className="mt-1 w-40" />
          </label>
          <label className="flex-1 text-xs text-muted-foreground">
            Reden
            <Input type="text" name="reason" placeholder="Vakantie, feestdag…" className="mt-1" />
          </label>
          <button className="rounded-lg bg-sca-navy px-4 py-2 text-sm font-semibold text-white hover:bg-sca-navy/90">
            Toevoegen
          </button>
        </form>
        {blocks.length === 0 ? (
          <p className="px-5 py-6 text-center text-sm text-muted-foreground">
            Geen geblokkeerde periodes.
          </p>
        ) : (
          <ul className="divide-y">
            {blocks.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-sca-navy">
                    {formatDateShortNL(b.startDate)} – {formatDateShortNL(b.endDate)}
                  </span>
                  {b.reason && <span className="text-muted-foreground"> · {b.reason}</span>}
                </div>
                <form action={deleteBlockedPeriod}>
                  <input type="hidden" name="id" value={b.id} />
                  <button className="text-muted-foreground hover:text-destructive" aria-label="Verwijderen">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
