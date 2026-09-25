import { NextRequest, NextResponse } from "next/server";

// Admin routes need real Clerk keys. Without them the public site works fully;
// /admin returns a friendly message instead of a crash.
const clerkReady =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  !!process.env.CLERK_SECRET_KEY &&
  !process.env.CLERK_SECRET_KEY.includes("placeholder");

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public site — always pass through
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  if (!clerkReady) {
    // Demo mode: no Clerk keys configured, so there is no real session to
    // gate on. Let every /admin/* and /api/admin/* request through —
    // src/lib/auth.ts's getAdmin() returns a demo user for these routes.
    return NextResponse.next();
  }

  // Clerk is configured — protect admin routes
  const { clerkMiddleware, createRouteMatcher, clerkClient } = await import("@clerk/nextjs/server");

  const isProtected = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);
  const isLogin = createRouteMatcher(["/admin/login(.*)"]);

  return clerkMiddleware(async (auth, request) => {
    if (isLogin(request)) return NextResponse.next();
    if (isProtected(request)) {
      const { userId, redirectToSignIn } = await auth();
      if (!userId) {
        if (request.nextUrl.pathname.startsWith("/api/")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return redirectToSignIn({ returnBackUrl: request.url });
      }
      // Fetch the user directly rather than trusting sessionClaims — the
      // session JWT only includes publicMetadata if the session token has
      // been customized in the Clerk dashboard, so a freshly-set role can
      // otherwise be invisible until the token template is configured.
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const role = (user.publicMetadata as { role?: string } | undefined)?.role;
      if (role !== "admin") {
        if (request.nextUrl.pathname.startsWith("/api/")) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/admin/login?denied=1", request.url));
      }
    }
    return NextResponse.next();
  })(req, {} as never);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
