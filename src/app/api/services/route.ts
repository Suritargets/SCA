import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db, services } from "@/db";

export const dynamic = "force-dynamic";

// GET /api/services — active services for the public booking flow.
export async function GET() {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.sortOrder), asc(services.name));
  return NextResponse.json(rows);
}
