// Returns the admin userId, or a demo ID when Clerk is not configured.
// Pages that mutate data should check dbReady separately.
export async function getAdmin(): Promise<string | null> {
  const ready =
    !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

  if (!ready) return "demo-admin"; // demo mode — no auth check

  const { auth, clerkClient } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) return null;

  // Fetch the user directly instead of relying on the session token's
  // sessionClaims — by default Clerk's JWT does not include publicMetadata
  // unless the session token has been customized in the dashboard, so a
  // role set on the user right after creation wouldn't be visible yet.
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as { role?: string } | undefined)?.role;
  return role === "admin" ? userId : null;
}
