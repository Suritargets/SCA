import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { db, services } from "@/db";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { formatDuration, formatPrice } from "@/lib/format";

export const metadata = { title: "Diensten & afspraken – SCA" };
export const dynamic = "force-dynamic";

export default async function DienstenPage() {
  let rows: (typeof services.$inferSelect)[] = [];
  let dbError = false;
  try {
    rows = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.sortOrder), asc(services.name));
  } catch {
    dbError = true;
  }

  return (
    <>
      <PageHero
        title="Maak een afspraak"
        subtitle="Kies een dienst en plan direct online een moment in dat jou uitkomt."
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        {dbError ? (
          <p className="text-center text-muted-foreground">
            Diensten kunnen momenteel niet geladen worden. Probeer het later opnieuw.
          </p>
        ) : rows.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Er zijn op dit moment geen diensten beschikbaar.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {rows.map((s) => (
              <Card key={s.id} className="justify-between">
                <CardContent className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-sca-navy">{s.name}</h2>
                    <span className="shrink-0 rounded-full bg-sca-orange/10 px-3 py-1 text-sm font-semibold text-sca-orange">
                      {formatPrice(s.price, s.currency)}
                    </span>
                  </div>
                  {s.description && (
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatDuration(s.durationMinutes)}
                  </div>
                </CardContent>
                <div className="px-4">
                  <Link
                    href={`/boeken?service=${s.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-sca-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sca-orange-dark"
                  >
                    Boek nu <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
