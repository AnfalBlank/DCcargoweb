import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllPosts, createPost, initDB } from "@/lib/db";

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDB();
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await initDB();
  const data = await req.json();
  await createPost(data);
  return NextResponse.json({ success: true });
}
