import { desc } from "drizzle-orm";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { db, posts } from "@/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDateShortNL } from "@/lib/format";
import { savePost, deletePost } from "../actions";
import type { Post } from "@/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog & nieuws – SCA Beheer" };

function bodyText(content: unknown): string {
  if (content && typeof content === "object" && "text" in content) {
    return String((content as { text: unknown }).text ?? "");
  }
  return "";
}

function StatusPill({ status }: { status: string }) {
  const isPublished = status === "published";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isPublished ? "bg-sca-green/10 text-sca-green" : "bg-amber-100 text-amber-700"
      }`}
    >
      {isPublished ? "Gepubliceerd" : "Concept"}
    </span>
  );
}

function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePost} className="space-y-4 px-5 py-4">
      {post && <input type="hidden" name="id" value={post.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Titel</Label>
          <Input name="title" required defaultValue={post?.title} placeholder="Titel van het bericht" />
        </div>
        <div className="space-y-2">
          <Label>Slug (optioneel, wordt afgeleid van titel)</Label>
          <Input name="slug" defaultValue={post?.slug} placeholder="mijn-nieuwsbericht" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Samenvatting</Label>
        <Textarea
          name="excerpt"
          className="min-h-16"
          defaultValue={post?.excerpt ?? ""}
          placeholder="Korte introductie voor overzichtspagina's"
        />
      </div>

      <div className="space-y-2">
        <Label>Inhoud</Label>
        <Textarea
          name="content"
          className="min-h-40"
          defaultValue={bodyText(post?.content)}
          placeholder="Volledige tekst van het bericht"
        />
      </div>

      <div className="space-y-2">
        <Label>Afbeeldingen</Label>
        {post?.images && post.images.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-1">
            {post.images.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-16 w-16 rounded-md border object-cover" />
                <input type="hidden" name="existingImages" value={url} />
                <label className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <input type="checkbox" name="removeImage" value={url} className="h-3 w-3 accent-destructive" />
                  verwijderen
                </label>
              </div>
            ))}
          </div>
        )}
        <Input type="file" name="images" accept="image/*" multiple />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" /> Je kunt meerdere afbeeldingen tegelijk selecteren; nieuwe worden toegevoegd aan bestaande.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <select
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="h-9 w-48 rounded-lg border border-input bg-background px-3 text-sm"
        >
          <option value="draft">Concept</option>
          <option value="published">Gepubliceerd</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>SEO titel</Label>
          <Input name="seoTitle" defaultValue={post?.seoTitle ?? ""} />
        </div>
        <div className="space-y-2">
          <Label>SEO beschrijving</Label>
          <Input name="seoDescription" defaultValue={post?.seoDescription ?? ""} />
        </div>
      </div>

      <button className="rounded-lg bg-sca-orange px-5 py-2 text-sm font-semibold text-white hover:bg-sca-orange-dark">
        Opslaan
      </button>
    </form>
  );
}

export default async function BlogPage() {
  const rows = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sca-navy">Blog &amp; nieuws</h1>
        <p className="text-sm text-muted-foreground">
          Plaats berichten met tekst en een afbeelding. Iedereen met toegang tot het dashboard kan hier posten.
        </p>
      </div>

      <details className="overflow-hidden rounded-xl border bg-white">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-3 text-sm font-semibold text-sca-orange">
          <Plus className="h-4 w-4" /> Nieuw bericht
        </summary>
        <div className="border-t">
          <PostForm />
        </div>
      </details>

      {rows.length === 0 ? (
        <p className="rounded-xl border bg-white px-5 py-8 text-center text-sm text-muted-foreground">
          Nog geen berichten. Maak er een aan.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((p) => (
            <details key={p.id} className="overflow-hidden rounded-xl border bg-white">
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  {p.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.featuredImage}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-sca-navy">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateShortNL(p.createdAt.toISOString().slice(0, 10))}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusPill status={p.status} />
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </div>
              </summary>
              <div className="border-t">
                <PostForm post={p} />
                <form action={deletePost} className="border-t px-5 py-3">
                  <input type="hidden" name="id" value={p.id} />
                  <button className="inline-flex items-center gap-2 text-sm text-destructive hover:underline">
                    <Trash2 className="h-3.5 w-3.5" /> Bericht verwijderen
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
