import { desc } from "drizzle-orm";
import { Trash2, UploadCloud } from "lucide-react";
import { db, media } from "@/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadMedia, deleteMedia } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Media – SCA Beheer" };

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function MediaPage() {
  const rows = await db.select().from(media).orderBy(desc(media.uploadedAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Media</h1>
        <p className="text-sm text-muted-foreground">Upload en beheer afbeeldingen.</p>
      </div>

      <form
        action={uploadMedia}
        className="flex flex-wrap items-end gap-4 rounded-xl border bg-white px-5 py-4"
      >
        <div className="space-y-2">
          <Label>Bestand</Label>
          <Input type="file" name="file" accept="image/*" required className="w-64" />
        </div>
        <div className="flex-1 space-y-2">
          <Label>Alt-tekst (optioneel)</Label>
          <Input type="text" name="altText" placeholder="Omschrijving voor toegankelijkheid" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-sca-orange px-5 py-2 text-sm font-semibold text-white hover:bg-sca-orange-dark">
          <UploadCloud className="h-4 w-4" /> Uploaden
        </button>
      </form>

      {rows.length === 0 ? (
        <p className="rounded-xl border bg-white px-5 py-10 text-center text-sm text-muted-foreground">
          Nog geen media geüpload.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-xl border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.altText ?? m.filename} className="aspect-video w-full object-cover" />
              <div className="flex items-start justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-sca-navy" title={m.filename}>
                    {m.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatSize(m.sizeBytes)}</p>
                </div>
                <form action={deleteMedia}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="text-muted-foreground hover:text-destructive" aria-label="Verwijderen">
                    <Trash2 className="h-4 w-4" />
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
