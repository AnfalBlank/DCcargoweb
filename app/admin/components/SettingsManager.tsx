"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, CheckCircle, Phone, Mail, MapPin, Globe, Instagram, Facebook, Youtube, Settings } from "lucide-react";

interface Config {
  site_name?: string;
  site_tagline?: string;
  wa_cs?: string;
  wa_admin?: string;
  email?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  maps_url?: string;
}

const fields = [
  { key: "site_name",    label: "Nama Perusahaan",    icon: Settings,   type: "text",  placeholder: "PT. Ditama Cargo Solution" },
  { key: "site_tagline", label: "Tagline",             icon: Settings,   type: "text",  placeholder: "WE DELIVER YOUR HAPPINESS" },
  { key: "wa_cs",        label: "WhatsApp CS",         icon: Phone,      type: "text",  placeholder: "+62 852-1117-2494" },
  { key: "wa_admin",     label: "WhatsApp Admin",      icon: Phone,      type: "text",  placeholder: "+62 821-7798-1028" },
  { key: "email",        label: "Email",               icon: Mail,       type: "email", placeholder: "adminDCS16@gmail.com" },
  { key: "address",      label: "Alamat",              icon: MapPin,     type: "textarea", placeholder: "Gedung Gatrans, Bandara Soekarno–Hatta..." },
  { key: "maps_url",     label: "Link Google Maps",    icon: Globe,      type: "url",   placeholder: "https://maps.google.com/..." },
  { key: "instagram",    label: "Instagram URL",       icon: Instagram,  type: "url",   placeholder: "https://www.instagram.com/ditamacargo/" },
  { key: "facebook",     label: "Facebook URL",        icon: Facebook,   type: "url",   placeholder: "https://web.facebook.com/..." },
  { key: "youtube",      label: "YouTube URL",         icon: Youtube,    type: "url",   placeholder: "https://www.youtube.com/..." },
];

export default function SettingsManager() {
  const [config, setConfig] = useState<Config>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => { setConfig(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sora font-bold text-xl text-slate-900">Pengaturan Website</h2>
          <p className="text-slate-500 text-sm">Konfigurasi informasi dan kontak perusahaan</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-800 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Perubahan"}
        </button>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
          <CheckCircle className="w-4 h-4" />
          Pengaturan berhasil disimpan!
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
        {fields.map((field, i) => (
          <motion.div key={field.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-5 flex gap-4 items-start">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <field.icon className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block uppercase tracking-wide">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={(config as Record<string, string>)[field.key] || ""}
                  onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                  rows={3}
                  placeholder={field.placeholder}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none transition-colors"
                />
              ) : (
                <input
                  type={field.type}
                  value={(config as Record<string, string>)[field.key] || ""}
                  onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 transition-colors"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Password change section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-1">Keamanan</h3>
        <p className="text-slate-500 text-sm mb-4">Untuk mengubah password admin, edit file <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.env.local</code> dan ubah nilai <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">ADMIN_PASSWORD</code>.</p>
        <div className="bg-slate-50 rounded-xl p-3 text-xs font-mono text-slate-600 border border-slate-200">
          ADMIN_USERNAME=admin<br />
          ADMIN_PASSWORD=DCSolution2026!
        </div>
      </div>
    </div>
  );
}
