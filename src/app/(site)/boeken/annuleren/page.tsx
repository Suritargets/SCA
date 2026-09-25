import { Suspense } from "react";
import { CancelClient } from "./cancel-client";

export const metadata = { title: "Afspraak annuleren – SCA" };

export default function AnnulerenPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <Suspense fallback={null}>
        <CancelClient />
      </Suspense>
    </section>
  );
}
