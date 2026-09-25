"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Clock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { formatDuration, formatPrice, formatDateNL } from "@/lib/format";

type Service = {
  id: string;
  name: string;
  description: string | null;
  durationMinutes: number;
  price: string | null;
  currency: string;
};

const STEPS = ["Dienst", "Datum & tijd", "Gegevens", "Bevestiging"];

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function BookingFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState<string>(params.get("service") ?? "");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = services.find((s) => s.id === serviceId);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: Service[]) => {
        setServices(data);
        if (!serviceId && data.length === 1) setServiceId(data[0].id);
      })
      .catch(() => setError("Kon diensten niet laden."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSlots = useCallback(
    async (d: string) => {
      if (!d || !serviceId) return;
      setSlotsLoading(true);
      setStartTime("");
      try {
        const r = await fetch(`/api/availability?date=${d}&serviceId=${serviceId}`);
        const data = await r.json();
        setSlots(data.slots ?? []);
      } catch {
        setSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    },
    [serviceId]
  );

  useEffect(() => {
    if (date) loadSlots(date);
  }, [date, loadSlots]);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, date, startTime, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Er ging iets mis. Probeer het opnieuw.");
        // If the slot was taken meanwhile, send them back to pick another.
        if (res.status === 409) {
          setStep(1);
          loadSlots(date);
        }
        return;
      }
      router.push("/boeken/bevestigd");
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  }

  const canNext =
    (step === 0 && !!serviceId) ||
    (step === 1 && !!date && !!startTime) ||
    (step === 2 && form.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email));

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                i < step && "bg-sca-orange text-white",
                i === step && "bg-sca-navy text-white",
                i > step && "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                i === step ? "text-sca-navy" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Step 0 — service */}
      {step === 0 && (
        <div className="space-y-3">
          {services.length === 0 && (
            <p className="text-sm text-muted-foreground">Diensten laden…</p>
          )}
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setServiceId(s.id)}
              className={cn(
                "flex w-full items-start justify-between gap-4 rounded-xl border p-4 text-left transition-colors",
                serviceId === s.id
                  ? "border-sca-orange bg-sca-orange/5"
                  : "border-border hover:border-sca-orange/50"
              )}
            >
              <div>
                <p className="font-semibold text-sca-navy">{s.name}</p>
                {s.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                )}
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {formatDuration(s.durationMinutes)}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-sca-orange">
                {formatPrice(s.price, s.currency)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Step 1 — date + slots */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Kies een datum</Label>
            <Input
              id="date"
              type="date"
              min={todayIso()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="max-w-xs"
            />
          </div>
          {date && (
            <div className="space-y-2">
              <Label>Beschikbare tijden</Label>
              {slotsLoading ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Beschikbaarheid laden…
                </p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Geen vrije tijden op deze dag. Kies een andere datum.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setStartTime(t)}
                      className={cn(
                        "rounded-lg border py-2 text-sm font-medium transition-colors",
                        startTime === t
                          ? "border-sca-orange bg-sca-orange text-white"
                          : "border-border hover:border-sca-orange"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 2 — details */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Naam *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefoon</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notitie (optioneel)</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="hidden"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Step 3 — review */}
      {step === 3 && service && (
        <div className="space-y-4 rounded-xl border p-6">
          <h3 className="font-semibold text-sca-navy">Controleer je afspraak</h3>
          <dl className="divide-y text-sm">
            {[
              ["Dienst", service.name],
              ["Datum", date ? formatDateNL(date) : ""],
              ["Tijd", startTime],
              ["Duur", formatDuration(service.durationMinutes)],
              ["Prijs", formatPrice(service.price, service.currency)],
              ["Naam", form.name],
              ["E-mail", form.email],
              ["Telefoon", form.phone || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium text-sca-navy">{v}</dd>
              </div>
            ))}
          </dl>
          {form.notes && (
            <p className="text-sm">
              <span className="text-muted-foreground">Notitie: </span>
              {form.notes}
            </p>
          )}
        </div>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || submitting}
          className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          Terug
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="rounded-lg bg-sca-orange px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-sca-orange-dark disabled:opacity-40"
          >
            Volgende
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-sca-orange px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-sca-orange-dark disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Afspraak bevestigen
          </button>
        )}
      </div>
    </div>
  );
}
