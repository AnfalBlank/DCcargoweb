import { NextRequest, NextResponse } from "next/server";
import { initDB, db } from "@/lib/db";
import { createSession, deleteSession, getSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { username, password } = await req.json();

    const validUser = username === process.env.ADMIN_USERNAME;
    const validPass = password === process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    const token = await createSession();

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const token = await getSessionToken();
  if (token) await deleteSession(token);
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_token");
  return res;
}
