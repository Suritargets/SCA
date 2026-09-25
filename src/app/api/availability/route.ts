import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

export const dynamic = "force-dynamic";

// GET /api/availability?date=YYYY-MM-DD&serviceId=uuid — free slots on a date.
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  const serviceId = req.nextUrl.searchParams.get("serviceId");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Ongeldige datum" }, { status: 400 });
  }
  if (!serviceId) {
    return NextResponse.json({ error: "serviceId ontbreekt" }, { status: 400 });
  }

  const slots = await getAvailableSlots(date, serviceId);
  return NextResponse.json({ date, slots });
}
