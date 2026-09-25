import { asc } from "drizzle-orm";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { db, services } from "@/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDuration, formatPrice } from "@/lib/format";
import { saveService, deleteService } from "../actions";
import type { Service } from "@/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Diensten – SCA Beheer" };

function ServiceForm({ service }: { service?: Service }) {
  return (
    <form action={saveService} className="grid gap-4 px-5 py-4 sm:grid-cols-2">
      {service && <input type="hidden" name="id" value={service.id} />}
      <div className="space-y-2 sm:col-span-2">
        <Label>Naam</Label>
        <Input name="name" required defaultValue={service?.name} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Beschrijving</Label>
        <Textarea name="description" defaultValue={service?.description ?? ""} />
      </div>
      <div className="space-y-2">
        <Label>Duur (minuten)</Label>
        <Input type="number" name="durationMinutes" min={5} step={5} required defaultValue={service?.durationMinutes ?? 30} />
      </div>
      <div className="space-y-2">
        <Label>Prijs (leeg = gratis)</Label>
        <Input name="price" placeholder="0.00" defaultValue={service?.price ?? ""} />
      </div>
      <div className="space-y-2">
        <Label>Valuta</Label>
        <Input name="currency" maxLength={3} defaultValue={service?.currency ?? "USD"} />
      </div>
      <div className="space-y-2">
        <Label>Volgorde</Label>
        <Input type="number" name="sortOrder" defaultValue={service?.sortOrder ?? 0} />
      </div>
      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input type="checkbox" name="isActive" defaultChecked={service?.isActive ?? true} className="h-4 w-4 accent-sca-orange" />
        Actief (zichtbaar in boekingsflow)
      </label>
      <div className="sm:col-span-2">
        <button className="rounded-lg bg-sca-orange px-5 py-2 text-sm font-semibold text-white hover:bg-sca-orange-dark">
          Opslaan
        </button>
      </div>
    </form>
  );
}

export default async function DienstenAdminPage() {
  const rows = await db.select().from(services).orderBy(asc(services.sortOrder), asc(services.name));

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-sca-navy">Diensten</h1>

      <details className="overflow-hidden rounded-xl border bg-white">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-3 text-sm font-semibold text-sca-orange">
          <Plus className="h-4 w-4" /> Nieuwe dienst
        </summary>
        <div className="border-t">
          <ServiceForm />
        </div>
      </details>

      <div className="space-y-3">
        {rows.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-xl border bg-white">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-semibold text-sca-navy">
                  {s.name}
                  {!s.isActive && (
                    <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Inactief
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDuration(s.durationMinutes)} · {formatPrice(s.price, s.currency)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <form action={deleteService}>
                  <input type="hidden" name="id" value={s.id} />
                  <button className="text-muted-foreground hover:text-destructive" aria-label="Verwijderen">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
            <details className="border-t">
              <summary className="flex cursor-pointer items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground">
                <Pencil className="h-3.5 w-3.5" /> Bewerken
              </summary>
              <div className="border-t">
                <ServiceForm service={s} />
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
