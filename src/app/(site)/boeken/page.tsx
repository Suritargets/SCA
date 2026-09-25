import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { BookingFlow } from "./booking-flow";

export const metadata = { title: "Afspraak maken – SCA" };

export default function BoekenPage() {
  return (
    <>
      <PageHero title="Afspraak maken" />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Laden…</p>}>
          <BookingFlow />
        </Suspense>
      </section>
    </>
  );
}
