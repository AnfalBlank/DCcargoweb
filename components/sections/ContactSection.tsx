"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
} from "lucide-react";

const WA_NUMBER = "6282177981028";
const WA_CONTACT_MSG = encodeURIComponent(
  "Halo DC Cargo, saya ingin berkonsultasi mengenai kebutuhan pengiriman saya. Bisa dibantu?"
);

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Build WA message from form
    const msg = encodeURIComponent(
      `Halo DC Cargo, saya ${formData.name}.\n` +
      `No. WA: ${formData.phone}\n` +
      (formData.email ? `Email: ${formData.email}\n` : "") +
      (formData.service ? `Layanan: ${formData.service}\n` : "") +
      `\nPesan: ${formData.message}`
    );
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSubmitted(true);
    // Open WA after short delay
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    }, 600);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp / Telepon",
      value: "+62 821-7798-1028",
      sub: "Senin - Sabtu, 08:00 - 20:00",
      iconColor: "text-brand-red",
      iconBg: "bg-red-50",
      borderColor: "border-red-100",
      href: `https://wa.me/${WA_NUMBER}?text=${WA_CONTACT_MSG}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@ditamacargo.id",
      sub: "Respon dalam 1x24 jam",
      iconColor: "text-brand-red",
      iconBg: "bg-red-50",
      borderColor: "border-red-100",
      href: "mailto:info@ditamacargo.id",
    },
    {
      icon: MapPin,
      label: "Lokasi Kantor",
      value: "Terminal Kargo Bandara Soekarno-Hatta",
      sub: "Jl. Cengkareng Golf Club RT.001/RW.010, Pajang, Kec. Benda, Kota Tangerang, Banten 15126",
      iconColor: "text-brand-blue",
      iconBg: "bg-blue-50",
      borderColor: "border-blue-100",
      href: "https://maps.google.com/?q=Terminal+Kargo+Bandara+Soekarno+Hatta+Tangerang",
    },
    {
      icon: Clock,
      label: "Jam Operasional",
      value: "Senin - Sabtu: 08:00 - 20:00",
      sub: "Minggu: 09:00 - 17:00",
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      borderColor: "border-green-100",
      href: null,
    },
  ];

  return (
    <section className="py-12 relative overflow-hidden bg-[#F8FAFC]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left — Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, i) => {
              const inner = (
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${info.iconBg} border ${info.borderColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <info.icon className={`w-5 h-5 ${info.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-500 text-xs mb-0.5">{info.label}</div>
                    <div className="text-slate-900 font-semibold text-sm">{info.value}</div>
                    <div className="text-slate-500 text-xs leading-relaxed mt-0.5">{info.sub}</div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-[0_12px_48px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300"
                >
                  {info.href ? (
                    <a href={info.href} target="_blank" rel="noopener noreferrer" className="block">
                      {inner}
                    </a>
                  ) : inner}
                </motion.div>
              );
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_CONTACT_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-slate-900 font-semibold text-sm">Chat via WhatsApp</div>
                <div className="text-green-600 text-xs">Respon cepat dalam hitungan menit</div>
              </div>
              <div className="ml-auto">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              </div>
            </motion.a>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 p-4"
            >
              <div className="text-slate-600 text-sm mb-3">Ikuti Kami di Media Sosial</div>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram", color: "hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500" },
                  { icon: Facebook, label: "Facebook", color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500" },
                  { icon: Twitter, label: "Twitter", color: "hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500" },
                ].map((social) => (
                  <motion.button
                    key={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center transition-all duration-300 text-slate-500 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-sora font-bold text-2xl text-slate-900 mb-2">Pesan Terkirim!</h3>
                <p className="text-slate-600 text-sm">Anda akan diarahkan ke WhatsApp kami. Tim kami siap membantu!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-brand-red text-sm hover:underline"
                >
                  Kirim pesan lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-sora font-bold text-xl text-slate-900 mb-5">Kirim Pesan via WhatsApp</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-600 text-xs mb-1.5 block font-medium">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 text-xs mb-1.5 block font-medium">No. WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08123456789"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 text-xs mb-1.5 block font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-slate-600 text-xs mb-1.5 block font-medium">Layanan yang Dibutuhkan</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                  >
                    <option value="">Pilih layanan...</option>
                    <option value="Cargo Darat">Cargo Darat</option>
                    <option value="Cargo Laut">Cargo Laut</option>
                    <option value="Cargo Udara">Cargo Udara</option>
                    <option value="Same Day Delivery">Same Day Delivery</option>
                    <option value="Express Delivery">Express Delivery</option>
                    <option value="Warehouse Service">Warehouse Service</option>
                    <option value="Door to Door">Door to Door</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 text-xs mb-1.5 block font-medium">Pesan *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ceritakan kebutuhan pengiriman Anda (asal, tujuan, jenis barang, berat, dll)..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim via WhatsApp
                    </>
                  )}
                </motion.button>
                <p className="text-slate-500 text-xs text-center">
                  Pesan akan dikirim langsung ke WhatsApp CS kami
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 bg-white rounded-2xl border border-slate-200 overflow-hidden h-64 relative shadow-sm"
        >
          <div className="absolute inset-0 bg-[#F8FAFC] flex items-center justify-center px-4">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-brand-red mx-auto mb-3 animate-bounce" />
              <div className="text-slate-900 font-semibold text-sm sm:text-base">Terminal Kargo Bandara Soekarno-Hatta</div>
              <div className="text-slate-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed">
                Jl. Cengkareng Golf Club, RT.001/RW.010, Pajang,<br className="hidden sm:block" />
                Kec. Benda, Kota Tangerang, Banten 15126
              </div>
              <motion.a
                href="https://maps.google.com/?q=Terminal+Kargo+Bandara+Soekarno+Hatta+Tangerang+Banten"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-xl bg-red-50 border border-red-200 text-brand-red text-sm font-medium hover:bg-red-100 transition-all duration-300"
              >
                Buka di Google Maps
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
