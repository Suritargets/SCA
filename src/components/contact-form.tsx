"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Er ging iets mis. Probeer het opnieuw.");
        setState("error");
        return;
      }
      setState("sent");
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-muted/30 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-sca-green" />
        <p className="font-semibold text-sca-navy">Bedankt voor je bericht!</p>
        <p className="text-sm text-muted-foreground">
          We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border p-6">
      <h2 className="font-semibold text-sca-navy">Stuur ons een bericht</h2>
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="c-name">Naam *</Label>
        <Input
          id="c-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-email">E-mail *</Label>
          <Input
            id="c-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">Telefoon</Label>
          <Input
            id="c-phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-msg">Bericht *</Label>
        <Textarea
          id="c-msg"
          required
          className="min-h-32"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
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
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-sca-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sca-orange-dark disabled:opacity-60"
      >
        {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        Versturen
      </button>
    </form>
  );
}
