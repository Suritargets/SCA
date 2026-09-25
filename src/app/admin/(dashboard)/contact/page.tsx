import { desc } from "drizzle-orm";
import { Mail, Phone, Trash2, Check } from "lucide-react";
import { db, contactSubmissions } from "@/db";
import { formatDateShortNL } from "@/lib/format";
import { markContactRead, deleteContact } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact – SCA Beheer" };

export default async function ContactInboxPage() {
  const rows = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Contactberichten</h1>
        <p className="text-sm text-muted-foreground">Inzendingen via het contactformulier.</p>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border bg-white px-5 py-10 text-center text-sm text-muted-foreground">
          Nog geen berichten.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((c) => (
            <div
              key={c.id}
              className={
                "rounded-xl border bg-white p-5 " + (c.isRead ? "" : "border-sca-orange/40 bg-sca-orange/5")
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sca-navy">
                    {c.name}
                    {!c.isRead && (
                      <span className="ml-2 rounded-full bg-sca-orange px-2 py-0.5 text-xs font-medium text-white">
                        Nieuw
                      </span>
                    )}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
                    </span>
                    {c.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {c.phone}
                      </span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDateShortNL(c.createdAt.toISOString().slice(0, 10))}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-line rounded-lg bg-muted/40 p-3 text-sm">{c.message}</p>
              <div className="mt-3 flex items-center gap-3">
                <form action={markContactRead}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="read" value={(!c.isRead).toString()} />
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-sca-navy">
                    <Check className="h-3.5 w-3.5" />
                    {c.isRead ? "Markeer als ongelezen" : "Markeer als gelezen"}
                  </button>
                </form>
                <form action={deleteContact}>
                  <input type="hidden" name="id" value={c.id} />
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" /> Verwijderen
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
