"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { formatDateNL } from "@/lib/format";

type Info = {
  id: string;
  date: string;
  startTime: string;
  status: string;
  serviceName: string | null;
};

export function CancelClient() {
  const token = useSearchParams().get("token");
  const [info, setInfo] = useState<Info | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "cancelling" | "done" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setState("error");
      return;
    }
    fetch(`/api/bookings/cancel?token=${token}`)
      .then(async (r) => {
        if (!r.ok) throw new Error();
        const data: Info = await r.json();
        setInfo(data);
        setState(data.status === "cancelled" ? "done" : "ready");
      })
      .catch(() => setState("error"));
  }, [token]);

  async function cancel() {
    setState("cancelling");
    const r = await fetch("/api/bookings/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setState(r.ok ? "done" : "error");
  }

  if (state === "loading")
    return (
      <p className="flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" /> Laden…
      </p>
    );

  if (state === "error")
    return (
      <div className="text-center">
        <XCircle className="mx-auto h-14 w-14 text-destructive" />
        <p className="mt-4 text-muted-foreground">
          Deze annuleerlink is ongeldig of verlopen.
        </p>
      </div>
    );

  if (state === "done")
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-sca-green" />
        <h1 className="mt-4 text-xl font-bold text-sca-navy">Afspraak geannuleerd</h1>
        <p className="mt-2 text-muted-foreground">
          Je afspraak is geannuleerd. Je ontvangt hiervan een bevestiging per e-mail.
        </p>
      </div>
    );

  return (
    <div className="rounded-xl border p-6 text-center">
      <h1 className="text-xl font-bold text-sca-navy">Afspraak annuleren?</h1>
      {info && (
        <p className="mt-3 text-sm text-muted-foreground">
          {info.serviceName} op <strong>{formatDateNL(info.date)}</strong> om{" "}
          <strong>{info.startTime.slice(0, 5)}</strong>
        </p>
      )}
      <button
        onClick={cancel}
        disabled={state === "cancelling"}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-destructive/10 px-6 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-60"
      >
        {state === "cancelling" && <Loader2 className="h-4 w-4 animate-spin" />}
        Ja, annuleer mijn afspraak
      </button>
    </div>
  );
}
