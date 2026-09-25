import { asc } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, pages } from "@/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { savePage } from "../actions";
import type { Page } from "@/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pagina's – SCA Beheer" };

function bodyText(content: unknown): string {
  if (content && typeof content === "object" && "text" in content) {
    return String((content as { text: unknown }).text ?? "");
  }
  return "";
}

function PageForm({ page }: { page?: Page }) {
  return (
    <form action={savePage} className="space-y-4 px-5 py-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input name="slug" required defaultValue={page?.slug} placeholder="over-ons" readOnly={!!page} />
        </div>
        <div className="space-y-2">
          <Label>Titel</Label>
          <Input name="title" required defaultValue={page?.title} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Inhoud</Label>
        <Textarea name="body" className="min-h-40" defaultValue={bodyText(page?.content)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>SEO titel</Label>
          <Input name="seoTitle" defaultValue={page?.seoTitle ?? ""} />
        </div>
        <div className="space-y-2">
          <Label>SEO beschrijving</Label>
          <Input name="seoDescription" defaultValue={page?.seoDescription ?? ""} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isPublished" defaultChecked={page?.isPublished ?? true} className="h-4 w-4 accent-sca-orange" />
        Gepubliceerd
      </label>
      <button className="rounded-lg bg-sca-orange px-5 py-2 text-sm font-semibold text-white hover:bg-sca-orange-dark">
        Opslaan
      </button>
    </form>
  );
}

export default async function PaginasPage() {
  const rows = await db.select().from(pages).orderBy(asc(pages.slug));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Pagina&apos;s</h1>
        <p className="text-sm text-muted-foreground">Beheer teksten en SEO van je pagina&apos;s.</p>
      </div>

      <details className="overflow-hidden rounded-xl border bg-white">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-3 text-sm font-semibold text-sca-orange">
          <Plus className="h-4 w-4" /> Nieuwe pagina
        </summary>
        <div className="border-t">
          <PageForm />
        </div>
      </details>

      {rows.length === 0 ? (
        <p className="rounded-xl border bg-white px-5 py-8 text-center text-sm text-muted-foreground">
          Nog geen pagina&apos;s. Maak er een aan.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((p) => (
            <details key={p.id} className="overflow-hidden rounded-xl border bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4">
                <span>
                  <span className="font-semibold text-sca-navy">{p.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">/{p.slug}</span>
                </span>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </summary>
              <div className="border-t">
                <PageForm page={p} />
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
