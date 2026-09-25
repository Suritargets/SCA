import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export const dynamic = "force-dynamic";

const demoMode =
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const UserButton = demoMode ? null : (await import("@clerk/nextjs")).UserButton;

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col bg-sca-navy p-4 md:flex">
        <div className="mb-6 px-2">
          <p className="text-sm font-bold text-white">SCA Beheer</p>
          <p className="text-xs text-white/50">Dashboard</p>
        </div>
        <AdminNav />
        <div className="mt-auto flex items-center gap-3 border-t border-white/10 px-2 pt-4">
          {UserButton ? (
            <UserButton />
          ) : (
            <div className="h-7 w-7 rounded-full bg-sca-orange/80 flex items-center justify-center text-xs text-white font-bold">
              A
            </div>
          )}
          <span className="text-xs text-white/60">
            {demoMode ? "Demo modus" : "Ingelogd"}
          </span>
        </div>
      </aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Demo banner */}
        {demoMode && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 text-center">
            Demo modus — voeg je Clerk- en Neon-keys toe aan <code className="font-mono">.env.local</code> voor volledige functionaliteit
          </div>
        )}

        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
          <span className="text-sm font-bold text-sca-navy">SCA Beheer</span>
          <span className="text-xs text-muted-foreground">{demoMode ? "Demo" : "Admin"}</span>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
