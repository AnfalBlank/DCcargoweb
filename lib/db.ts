import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// ── Initialize all tables ────────────────────────────────────────────────────
export async function initDB() {
  await db.batch([
    // Blog posts
    `CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Logistics Insight',
      image TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '[]',
      date TEXT NOT NULL,
      read_time TEXT NOT NULL DEFAULT '5 menit',
      featured INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,

    // FAQ items
    `CREATE TABLE IF NOT EXISTS faq_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL DEFAULT 'home',
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      wa_text TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,

    // Site config
    `CREATE TABLE IF NOT EXISTS site_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,

    // Admin sessions
    `CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL
    )`,
  ]);
}

// ── Blog helpers ─────────────────────────────────────────────────────────────
export async function getAllPosts() {
  const res = await db.execute("SELECT * FROM blog_posts ORDER BY created_at DESC");
  return res.rows.map(rowToPost);
}

export async function getPublishedPosts() {
  const res = await db.execute("SELECT * FROM blog_posts WHERE published=1 ORDER BY created_at DESC");
  return res.rows.map(rowToPost);
}

export async function getPostById(id: number) {
  const res = await db.execute({ sql: "SELECT * FROM blog_posts WHERE id=?", args: [id] });
  return res.rows[0] ? rowToPost(res.rows[0]) : null;
}

export async function createPost(data: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  await db.execute({
    sql: `INSERT INTO blog_posts (title,excerpt,content,category,image,tags,date,read_time,featured,published)
          VALUES (?,?,?,?,?,?,?,?,?,?)`,
    args: [data.title, data.excerpt, data.content, data.category,
           data.image, JSON.stringify(data.tags), data.date,
           data.read_time, data.featured ? 1 : 0, data.published ? 1 : 0],
  });
}

export async function updatePost(id: number, data: Partial<BlogPost>) {
  await db.execute({
    sql: `UPDATE blog_posts SET title=?,excerpt=?,content=?,category=?,image=?,tags=?,
          date=?,read_time=?,featured=?,published=?,updated_at=datetime('now') WHERE id=?`,
    args: [data.title, data.excerpt, data.content, data.category,
           data.image, JSON.stringify(data.tags), data.date,
           data.read_time, data.featured ? 1 : 0, data.published ? 1 : 0, id],
  });
}

export async function deletePost(id: number) {
  await db.execute({ sql: "DELETE FROM blog_posts WHERE id=?", args: [id] });
}

// ── FAQ helpers ──────────────────────────────────────────────────────────────
export async function getAllFAQs() {
  const res = await db.execute("SELECT * FROM faq_items ORDER BY page, sort_order");
  return res.rows.map(rowToFAQ);
}

export async function getFAQsByPage(page: string) {
  const res = await db.execute({
    sql: "SELECT * FROM faq_items WHERE page=? AND published=1 ORDER BY sort_order",
    args: [page],
  });
  return res.rows.map(rowToFAQ);
}

export async function createFAQ(data: Omit<FAQItem, "id" | "created_at" | "updated_at">) {
  await db.execute({
    sql: `INSERT INTO faq_items (page,question,answer,wa_text,sort_order,published)
          VALUES (?,?,?,?,?,?)`,
    args: [data.page, data.question, data.answer, data.wa_text,
           data.sort_order, data.published ? 1 : 0],
  });
}

export async function updateFAQ(id: number, data: Partial<FAQItem>) {
  await db.execute({
    sql: `UPDATE faq_items SET page=?,question=?,answer=?,wa_text=?,sort_order=?,
          published=?,updated_at=datetime('now') WHERE id=?`,
    args: [data.page, data.question, data.answer, data.wa_text,
           data.sort_order, data.published ? 1 : 0, id],
  });
}

export async function deleteFAQ(id: number) {
  await db.execute({ sql: "DELETE FROM faq_items WHERE id=?", args: [id] });
}

// ── Config helpers ───────────────────────────────────────────────────────────
export async function getConfig(key: string): Promise<string | null> {
  const res = await db.execute({ sql: "SELECT value FROM site_config WHERE key=?", args: [key] });
  return res.rows[0] ? String(res.rows[0].value) : null;
}

export async function setConfig(key: string, value: string) {
  await db.execute({
    sql: `INSERT INTO site_config (key,value,updated_at) VALUES (?,?,datetime('now'))
          ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now')`,
    args: [key, value],
  });
}

export async function getAllConfig() {
  const res = await db.execute("SELECT key, value FROM site_config");
  const config: Record<string, string> = {};
  res.rows.forEach((r) => { config[String(r.key)] = String(r.value); });
  return config;
}

// ── Types ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  tags: string[];
  date: string;
  read_time: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQItem {
  id: number;
  page: string;
  question: string;
  answer: string;
  wa_text: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ── Row mappers ──────────────────────────────────────────────────────────────
function rowToPost(r: Record<string, unknown>): BlogPost {
  return {
    id: Number(r.id),
    title: String(r.title),
    excerpt: String(r.excerpt),
    content: String(r.content),
    category: String(r.category),
    image: String(r.image),
    tags: JSON.parse(String(r.tags) || "[]"),
    date: String(r.date),
    read_time: String(r.read_time),
    featured: Number(r.featured) === 1,
    published: Number(r.published) === 1,
    created_at: String(r.created_at),
    updated_at: String(r.updated_at),
  };
}

function rowToFAQ(r: Record<string, unknown>): FAQItem {
  return {
    id: Number(r.id),
    page: String(r.page),
    question: String(r.question),
    answer: String(r.answer),
    wa_text: String(r.wa_text),
    sort_order: Number(r.sort_order),
    published: Number(r.published) === 1,
    created_at: String(r.created_at),
    updated_at: String(r.updated_at),
  };
}
