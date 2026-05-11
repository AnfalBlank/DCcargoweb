"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, X, Save, Loader2, Search } from "lucide-react";
import type { BlogPost } from "@/lib/db";

const CATEGORIES = ["Cargo Tips", "Logistics Insight", "Shipping Education", "Company News", "Supply Chain"];

const empty: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
  title: "", excerpt: "", content: "", category: "Logistics Insight",
  image: "", tags: [], date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  read_time: "5 menit", featured: false, published: true,
};

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({ ...empty }); setTagInput(""); setModal("create"); };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content, category: p.category,
      image: p.image, tags: [...p.tags], date: p.date, read_time: p.read_time,
      featured: p.featured, published: p.published });
    setTagInput("");
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    if (modal === "create") {
      await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else if (editing) {
      await fetch(`/api/admin/blog/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus artikel ini?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    load();
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm({ ...form, tags: [...form.tags, t] });
    setTagInput("");
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-sora font-bold text-xl text-slate-900">Blog & Artikel</h2>
          <p className="text-slate-500 text-sm">{posts.length} artikel tersimpan</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-800 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-white" />
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Belum ada artikel</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <motion.div key={post.id} layout
              className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 items-start">
              {post.image && (
                <img src={post.image} alt={post.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 hidden sm:block" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">{post.category}</span>
                      {post.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1"><Star className="w-3 h-3" />Featured</span>}
                      {!post.published && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Draft</span>}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">{post.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                    <p className="text-slate-400 text-xs mt-1">{post.date} · {post.read_time}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(post)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(post.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl my-4 shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="font-sora font-bold text-lg text-slate-900">
                  {modal === "create" ? "Tambah Artikel Baru" : "Edit Artikel"}
                </h3>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Judul *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="Judul artikel..." />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Kategori</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Waktu Baca</label>
                    <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="5 menit" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">URL Gambar</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="https://images.unsplash.com/..." />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Ringkasan *</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={3} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none" placeholder="Ringkasan singkat artikel..." />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Konten</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={6} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none font-mono" placeholder="Konten artikel lengkap..." />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Tags</label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {form.tags.map((t) => (
                      <span key={t} className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs border border-red-100">
                        {t}
                        <button onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400" placeholder="Tambah tag..." />
                    <button onClick={addTag} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors">+</button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                    <span className="text-sm text-slate-600">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
                    <span className="text-sm text-slate-600">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
                <button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">Batal</button>
                <button onClick={handleSave} disabled={saving || !form.title}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-800 text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Fix missing import
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}
