"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Budi Santoso",  role: "Owner UMKM Batik Nusantara",          type: "UMKM",       avatar: "BS", rating: 5, text: "Ditama Cargo benar-benar mengubah cara saya mengelola pengiriman produk batik. Paket selalu tiba tepat waktu dan kondisi sempurna. Pelanggan saya pun semakin puas!", avatarBg: "bg-red-600" },
  { name: "Siti Rahayu",   role: "CEO Toko Online Fashion",              type: "Online Shop", avatar: "SR", rating: 5, text: "Sebagai pemilik toko online dengan ratusan order per hari, saya butuh mitra logistik yang handal. Ditama Cargo selalu konsisten dan tracking real-time-nya sangat membantu.", avatarBg: "bg-blue-700" },
  { name: "Ahmad Fauzi",   role: "Logistics Manager PT. Maju Bersama",   type: "Corporate",  avatar: "AF", rating: 5, text: "Kami telah bermitra dengan Ditama Cargo selama 2 tahun untuk distribusi produk ke seluruh Indonesia. Profesionalisme dan ketepatan waktu mereka tidak perlu diragukan lagi.", avatarBg: "bg-red-700" },
  { name: "Dewi Kusuma",   role: "Pemilik Toko Elektronik",              type: "UMKM",       avatar: "DK", rating: 5, text: "Pengiriman barang elektronik butuh penanganan ekstra hati-hati. Ditama Cargo selalu memastikan packaging aman dan barang tiba dalam kondisi sempurna. Highly recommended!", avatarBg: "bg-blue-800" },
  { name: "Reza Pratama",  role: "Supply Chain Director",                type: "Corporate",  avatar: "RP", rating: 5, text: "Integrasi sistem tracking Ditama Cargo dengan ERP kami sangat memudahkan monitoring pengiriman. Tim mereka responsif dan selalu siap membantu 24/7.", avatarBg: "bg-red-600" },
  { name: "Linda Wijaya",  role: "Reseller Produk Kecantikan",           type: "Online Shop", avatar: "LW", rating: 5, text: "Harga terjangkau tapi kualitas premium! Saya sudah coba banyak jasa pengiriman, tapi Ditama Cargo yang paling konsisten dan terpercaya untuk bisnis saya.", avatarBg: "bg-blue-700" },
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-semibold tracking-wide uppercase mb-4 border border-red-100">
            Testimoni Pelanggan
          </span>
          <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-brand-navy mb-4">
            Apa Kata <span className="gradient-text">Pelanggan Kami</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Ribuan pelanggan telah mempercayakan kebutuhan logistik mereka kepada kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="bg-white rounded-2xl p-6 border border-surface-border hover:border-red-200 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <Quote className="w-7 h-7 text-red-100 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-brand-navy font-semibold text-sm truncate">{t.name}</div>
                  <div className="text-slate-400 text-xs truncate">{t.role}</div>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-red-50 text-brand-red border border-red-100 flex-shrink-0">
                  {t.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 bg-surface-gray rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-8 border border-surface-border"
        >
          <div className="text-center">
            <div className="font-sora font-black text-6xl gradient-text">4.9</div>
            <div className="flex gap-1 justify-center mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
            <div className="text-slate-400 text-sm mt-1">Rating Keseluruhan</div>
          </div>
          <div className="w-px h-16 bg-surface-border hidden sm:block" />
          <div className="text-center">
            <div className="font-sora font-black text-4xl text-brand-navy">2,500+</div>
            <div className="text-slate-400 text-sm mt-1">Total Ulasan</div>
          </div>
          <div className="w-px h-16 bg-surface-border hidden sm:block" />
          <div className="text-center">
            <div className="font-sora font-black text-4xl text-brand-navy">98%</div>
            <div className="text-slate-400 text-sm mt-1">Pelanggan Puas</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
