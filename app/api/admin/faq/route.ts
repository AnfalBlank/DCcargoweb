import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllFAQs, createFAQ, initDB } from "@/lib/db";

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDB();
  const faqs = await getAllFAQs();
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDB();
  const data = await req.json();
  await createFAQ(data);
  return NextResponse.json({ success: true });
}
