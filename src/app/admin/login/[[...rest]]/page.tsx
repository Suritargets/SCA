import Link from "next/link";

export const metadata = { title: "Admin login – SCA" };

const clerkReady =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const params = await searchParams;

  if (!clerkReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sca-navy px-4 py-12">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center space-y-4">
          <p className="text-lg font-bold text-sca-navy">SCA Beheer</p>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 text-left space-y-2">
            <p className="font-semibold">Demo modus actief</p>
            <p>Clerk-keys zijn nog niet geconfigureerd. Het dashboard is toegankelijk zonder inloggen.</p>
          </div>
          <Link
            href="/admin"
            className="block w-full rounded-lg bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark"
          >
            Naar dashboard →
          </Link>
        </div>
      </div>
    );
  }

  if (params.denied) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sca-navy px-4">
        <div className="rounded-xl bg-white p-8 text-center max-w-sm">
          <p className="font-semibold text-sca-navy">Geen toegang</p>
          <p className="mt-2 text-sm text-muted-foreground">Je account heeft geen admin-rol.</p>
        </div>
      </div>
    );
  }

  const { SignIn } = await import("@clerk/nextjs");
  return (
    <div className="flex min-h-screen items-center justify-center bg-sca-navy px-4 py-12">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-white">Suriname College of Accountancy</p>
          <p className="text-sm text-white/60">Beheerdersomgeving</p>
        </div>
        <SignIn appearance={{ elements: { formButtonPrimary: "bg-sca-orange hover:bg-sca-orange-dark" } }} />
      </div>
    </div>
  );
}
