"use client";

import { useEffect } from "react";

export default function SiteError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-lg font-semibold text-sca-navy">Er ging iets mis</p>
      <p className="text-sm text-muted-foreground">
        Deze pagina kon niet worden geladen. Probeer het opnieuw.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-sca-orange px-4 py-2 text-sm font-semibold text-white hover:bg-sca-orange-dark"
      >
        Opnieuw proberen
      </button>
    </div>
  );
}
