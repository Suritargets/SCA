import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Afspraak bevestigd – SCA" };

export default function BevestigdPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <CheckCircle2 className="h-16 w-16 text-sca-green" />
      <h1 className="mt-6 text-2xl font-bold text-sca-navy">Je afspraak is bevestigd!</h1>
      <p className="mt-3 text-muted-foreground">
        Je ontvangt binnen enkele ogenblikken een bevestiging per e-mail met alle details.
        Kun je onverhoopt niet komen? Gebruik dan de annuleerlink in die e-mail.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-sca-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sca-orange-dark"
      >
        Terug naar home
      </Link>
    </section>
  );
}
