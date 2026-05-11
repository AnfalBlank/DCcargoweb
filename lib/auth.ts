import { cookies } from "next/headers";
import { db } from "./db";

const SECRET = process.env.ADMIN_SECRET || "dcsolution-secret-2026";

export function generateToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSession(): Promise<string> {
  const token = generateToken();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await db.execute({
    sql: "INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)",
    args: [token, expires],
  });
  return token;
}

export async function validateSession(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await db.execute({
      sql: "SELECT token FROM admin_sessions WHERE token=? AND expires_at > datetime('now')",
      args: [token],
    });
    return res.rows.length > 0;
  } catch {
    return false;
  }
}

export async function deleteSession(token: string) {
  await db.execute({ sql: "DELETE FROM admin_sessions WHERE token=?", args: [token] });
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  return validateSession(token);
}
