"use client";

import { useEffect } from "react";
import { Database } from "lucide-react";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDbError =
    error.message?.toLowerCase().includes("fetch") ||
    error.message?.toLowerCase().includes("neon") ||
    error.message?.toLowerCase().includes("connection") ||
    error.message?.toLowerCase().includes("database") ||
    error.message?.toLowerCase().includes("placeholder");

  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
      <Database className="h-8 w-8 text-amber-500" />
      <div>
        <p className="font-semibold text-amber-900">
          {isDbError ? "Database niet verbonden" : "Er ging iets mis"}
        </p>
        <p className="mt-1 text-sm text-amber-700">
          {isDbError
            ? "Voeg een geldige DATABASE_URL toe aan .env.local en voer 'npm run db:push' uit."
            : error.message}
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Opnieuw proberen
      </button>
    </div>
  );
}
