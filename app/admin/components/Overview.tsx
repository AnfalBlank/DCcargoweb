"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, HelpCircle, Settings, Database, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function Overview() {
  const [stats, setStats] = useState({ blogs: 0, faqs: 0, config: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/blog").then((r) => r.json()),
      fetch("/api/admin/faq").then((r) => r.json()),
      fetch("/api/admin/settings").then((r) => r.json()),
    ]).then(([blogs, faqs, config]) => {
      setStats({
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        faqs: Array.isArray(faqs) ? faqs.length : 0,
        config: typeof config === "object" ? Object.keys(config).length : 0,
      });
    });
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg("");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json();
    setSeedMsg(data.message || data.error || "Done");
    setSeeding(false);
    // Refresh stats
    const [blogs, faqs] = await Promise.all([
      fetch("/api/admin/blog").then((r) => r.json()),
      fetch("/api/admin/faq").then((r) => r.json()),
    ]);
    setStats((s) => ({
      ...s,
      blogs: Array.isArray(blogs) ? blogs.length : s.blogs,
      faqs: Array.isArray(faqs) ? faqs.length : s.faqs,
    }));
  };

  const cards = [
    { label: "Total Artikel Blog", value: stats.blogs, icon: FileText, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
    { label: "Total FAQ", value: stats.faqs, icon: HelpCircle, color: "bg-red-50 text-red-600", border: "border-red-100" },
    { label: "Konfigurasi", value: stats.config, icon: Settings, color: "bg-green-50 text-green-600", border: "border-green-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-sora font-bold text-xl text-slate-900 mb-1">Selamat datang, Admin!</h2>
        <p className="text-slate-500 text-sm">Kelola konten website PT. Ditama Cargo Solution dari sini.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-2xl border ${card.border} p-5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-sora font-black text-3xl text-slate-900">{card.value}</div>
              <div className="text-slate-500 text-xs">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Seed section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Database className="w-5 h-5 text-slate-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">Inisialisasi Database</h3>
            <p className="text-slate-500 text-sm mb-4">
              Masukkan data blog dan FAQ yang sudah ada ke database Turso. Hanya perlu dilakukan sekali.
            </p>
            {seedMsg && (
              <div className={`flex items-center gap-2 text-sm mb-3 ${seedMsg.includes("error") || seedMsg.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {seedMsg.includes("error") ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                {seedMsg}
              </div>
            )}
            <button onClick={handleSeed} disabled={seeding}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50">
              {seeding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              {seeding ? "Memproses..." : "Seed Data ke Database"}
            </button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Akses Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Halaman Utama", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Layanan", href: "/services" },
            { label: "Kontak", href: "/contact" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:border-red-200 hover:text-red-600 transition-all">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
