import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateFAQ, deleteFAQ } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  await updateFAQ(Number(params.id), data);
  return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteFAQ(Number(params.id));
  return NextResponse.json({ success: true });
}
