"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Shield, MapPin, Star, DollarSign, Globe } from "lucide-react";
import Link from "next/link";

const advantages = [
  { icon: Zap,        title: "Fast Delivery",         desc: "Pengiriman express dengan kecepatan maksimal. Same day delivery tersedia untuk area tertentu.",                                  bg: "bg-red-50",    color: "text-brand-red",  border: "border-red-100" },
  { icon: Shield,     title: "Secure Packaging",      desc: "Setiap paket dikemas dengan standar keamanan tinggi. Asuransi pengiriman tersedia untuk semua layanan.",                         bg: "bg-blue-50",   color: "text-brand-blue", border: "border-blue-100" },
  { icon: MapPin,     title: "Real-time Tracking",    desc: "Pantau perjalanan paket Anda secara real-time. Update status otomatis via WhatsApp dan email.",                                  bg: "bg-red-50",    color: "text-brand-red",  border: "border-red-100" },
  { icon: Star,       title: "Professional Handling", desc: "Tim profesional berpengalaman menangani setiap paket dengan penuh tanggung jawab dan kehati-hatian.",                            bg: "bg-blue-50",   color: "text-brand-blue", border: "border-blue-100" },
  { icon: DollarSign, title: "Affordable Price",      desc: "Harga kompetitif dengan kualitas premium. Dapatkan penawaran terbaik untuk pengiriman volume besar.",                           bg: "bg-red-50",    color: "text-brand-red",  border: "border-red-100" },
  { icon: Globe,      title: "Nationwide Coverage",   desc: "Jangkauan ke seluruh Indonesia dari Sabang sampai Merauke. Tidak ada daerah yang terlalu jauh.",                                bg: "bg-blue-50",   color: "text-brand-blue", border: "border-blue-100" },
];

export default function AdvantagesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-surface-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-semibold tracking-wide uppercase mb-5 border border-red-100">
                Keunggulan Kami
              </span>
              <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-brand-navy mb-5">
                Mengapa Memilih{" "}
                <span className="gradient-text">Ditama Cargo?</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Kami bukan sekadar jasa pengiriman biasa. Kami adalah mitra logistik terpercaya yang berkomitmen memberikan pengalaman pengiriman terbaik untuk bisnis dan personal Anda.
              </p>

              <div className="space-y-3 mb-10">
                {["Teknologi tracking terdepan", "Armada kendaraan modern & terawat", "Tim profesional bersertifikat", "Garansi keamanan paket"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link href="/about">
                  <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                  >
                    Pelajari Lebih Lanjut
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`bg-white rounded-2xl p-5 border ${adv.border} hover:shadow-card hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className={`w-11 h-11 rounded-xl ${adv.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <adv.icon className={`w-5 h-5 ${adv.color}`} />
                </div>
                <h3 className={`font-sora font-bold text-sm ${adv.color} mb-1.5`}>{adv.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
