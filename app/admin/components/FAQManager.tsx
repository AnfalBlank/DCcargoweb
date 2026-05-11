"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2, Search, HelpCircle } from "lucide-react";
import type { FAQItem } from "@/lib/db";

const PAGES = [
  { value: "home",     label: "Home" },
  { value: "services", label: "Layanan" },
  { value: "tracking", label: "Tracking" },
  { value: "about",    label: "Tentang Kami" },
  { value: "blog",     label: "Blog" },
  { value: "contact",  label: "Kontak" },
];

const empty: Omit<FAQItem, "id" | "created_at" | "updated_at"> = {
  page: "home", question: "", answer: "", wa_text: "", sort_order: 0, published: true,
};

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPage, setFilterPage] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/faq");
    const data = await res.json();
    setFaqs(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({ ...empty }); setModal("create"); };
  const openEdit = (f: FAQItem) => {
    setEditing(f);
    setForm({ page: f.page, question: f.question, answer: f.answer, wa_text: f.wa_text, sort_order: f.sort_order, published: f.published });
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    if (modal === "create") {
      await fetch("/api/admin/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else if (editing) {
      await fetch(`/api/admin/faq/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus FAQ ini?")) return;
    await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
    load();
  };

  const filtered = faqs.filter((f) => {
    const matchPage = filterPage === "all" || f.page === filterPage;
    const matchSearch = f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchPage && matchSearch;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-sora font-bold text-xl text-slate-900">Kelola FAQ</h2>
          <p className="text-slate-500 text-sm">{faqs.length} pertanyaan tersimpan</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-800 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Tambah FAQ
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari FAQ..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-white" />
        </div>
        <select value={filterPage} onChange={(e) => setFilterPage(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 bg-white">
          <option value="all">Semua Halaman</option>
          {PAGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Belum ada FAQ</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq) => (
            <motion.div key={faq.id} layout
              className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      {PAGES.find((p) => p.value === faq.page)?.label || faq.page}
                    </span>
                    {!faq.published && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Draft</span>}
                    <span className="text-xs text-slate-400">#{faq.sort_order}</span>
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">{faq.question}</p>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{faq.answer}</p>
                  {faq.wa_text && (
                    <p className="text-green-600 text-xs mt-1 line-clamp-1">WA: {faq.wa_text}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(faq)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(faq.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="font-sora font-bold text-lg text-slate-900">
                  {modal === "create" ? "Tambah FAQ Baru" : "Edit FAQ"}
                </h3>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Halaman</label>
                    <select value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400">
                      {PAGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Urutan</label>
                    <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Pertanyaan *</label>
                  <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="Pertanyaan..." />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Jawaban *</label>
                  <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    rows={4} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none" placeholder="Jawaban lengkap..." />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Pesan WhatsApp (opsional)</label>
                  <input value={form.wa_text} onChange={(e) => setForm({ ...form, wa_text: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="Halo DC Solution, saya ingin bertanya..." />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
                  <span className="text-sm text-slate-600">Published</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
                <button onClick={() => setModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">Batal</button>
                <button onClick={handleSave} disabled={saving || !form.question || !form.answer}
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
