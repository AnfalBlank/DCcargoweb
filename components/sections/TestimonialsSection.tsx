"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Owner UMKM Batik Nusantara",
    type: "UMKM",
    avatar: "BS",
    rating: 5,
    text: "Ditama Cargo benar-benar mengubah cara saya mengelola pengiriman produk batik. Paket selalu tiba tepat waktu dan kondisi sempurna. Pelanggan saya pun semakin puas!",
    color: "from-orange-500 to-orange-700",
  },
  {
    name: "Siti Rahayu",
    role: "CEO Toko Online Fashion",
    type: "Online Shop",
    avatar: "SR",
    rating: 5,
    text: "Sebagai pemilik toko online dengan ratusan order per hari, saya butuh mitra logistik yang handal. Ditama Cargo selalu konsisten dan tracking real-time-nya sangat membantu.",
    color: "from-red-500 to-red-700",
  },
  {
    name: "Ahmad Fauzi",
    role: "Logistics Manager PT. Maju Bersama",
    type: "Corporate",
    avatar: "AF",
    rating: 5,
    text: "Kami telah bermitra dengan Ditama Cargo selama 2 tahun untuk distribusi produk ke seluruh Indonesia. Profesionalisme dan ketepatan waktu mereka tidak perlu diragukan lagi.",
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Dewi Kusuma",
    role: "Pemilik Toko Elektronik",
    type: "UMKM",
    avatar: "DK",
    rating: 5,
    text: "Pengiriman barang elektronik butuh penanganan ekstra hati-hati. Ditama Cargo selalu memastikan packaging aman dan barang tiba dalam kondisi sempurna. Highly recommended!",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Reza Pratama",
    role: "Supply Chain Director",
    type: "Corporate",
    avatar: "RP",
    rating: 5,
    text: "Integrasi sistem tracking Ditama Cargo dengan ERP kami sangat memudahkan monitoring pengiriman. Tim mereka responsif dan selalu siap membantu 24/7.",
    color: "from-green-500 to-green-700",
  },
  {
    name: "Linda Wijaya",
    role: "Reseller Produk Kecantikan",
    type: "Online Shop",
    avatar: "LW",
    rating: 5,
    text: "Harga terjangkau tapi kualitas premium! Saya sudah coba banyak jasa pengiriman, tapi Ditama Cargo yang paling konsisten dan terpercaya untuk bisnis saya.",
    color: "from-pink-500 to-pink-700",
  },
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Testimoni Pelanggan</span>
          </div>
          <h2 className="font-sora font-black text-4xl sm:text-5xl text-white mb-4">
            Apa Kata{" "}
            <span className="gradient-text">Pelanggan Kami</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ribuan pelanggan telah mempercayakan kebutuhan logistik mereka kepada kami.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="testimonial-card rounded-2xl p-6 relative group hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-orange-500/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-500 text-xs">{testimonial.role}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {testimonial.type}
                  </span>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 glass neon-border rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="font-sora font-black text-6xl gradient-text">4.9</div>
            <div className="flex gap-1 justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
              ))}
            </div>
            <div className="text-gray-400 text-sm mt-1">Rating Keseluruhan</div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div className="font-sora font-black text-4xl text-white">2,500+</div>
            <div className="text-gray-400 text-sm mt-1">Total Ulasan</div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div className="font-sora font-black text-4xl text-white">98%</div>
            <div className="text-gray-400 text-sm mt-1">Pelanggan Puas</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
