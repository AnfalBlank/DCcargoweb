import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllConfig, setConfig, initDB } from "@/lib/db";

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDB();
  const config = await getAllConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDB();
  const data = await req.json();
  for (const [key, value] of Object.entries(data)) {
    await setConfig(key, String(value));
  }
  return NextResponse.json({ success: true });
}
