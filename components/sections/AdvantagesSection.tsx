"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Shield, MapPin, Star, DollarSign, Globe } from "lucide-react";
import Link from "next/link";

const advantages = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Pengiriman express dengan kecepatan maksimal. Same day delivery tersedia untuk area tertentu.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    icon: Shield,
    title: "Secure Packaging",
    description: "Setiap paket dikemas dengan standar keamanan tinggi. Asuransi pengiriman tersedia untuk semua layanan.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Pantau perjalanan paket Anda secara real-time. Update status otomatis via WhatsApp dan email.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    icon: Star,
    title: "Professional Handling",
    description: "Tim profesional berpengalaman menangani setiap paket dengan penuh tanggung jawab dan kehati-hatian.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    icon: DollarSign,
    title: "Affordable Price",
    description: "Harga kompetitif dengan kualitas premium. Dapatkan penawaran terbaik untuk pengiriman volume besar.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    icon: Globe,
    title: "Nationwide Coverage",
    description: "Jangkauan ke seluruh Indonesia dari Sabang sampai Merauke. Tidak ada daerah yang terlalu jauh.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
];

function AdvantageCard({ adv, index }: { adv: typeof advantages[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`glass rounded-2xl p-6 border ${adv.border} group hover:scale-105 transition-all duration-300`}
    >
      <div className={`w-12 h-12 rounded-xl ${adv.bg} border ${adv.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <adv.icon className={`w-6 h-6 ${adv.color}`} />
      </div>
      <h3 className={`font-sora font-bold text-lg ${adv.color} mb-2`}>{adv.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{adv.description}</p>
    </motion.div>
  );
}

export default function AdvantagesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-950" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-medium">Keunggulan Kami</span>
              </div>
              <h2 className="font-sora font-black text-4xl sm:text-5xl text-white mb-6">
                Mengapa Memilih{" "}
                <span className="gradient-text">Ditama Cargo?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Kami bukan sekadar jasa pengiriman biasa. Kami adalah mitra logistik terpercaya yang berkomitmen memberikan pengalaman pengiriman terbaik untuk bisnis dan personal Anda.
              </p>

              {/* Feature highlight */}
              <div className="space-y-4">
                {[
                  "Teknologi tracking terdepan",
                  "Armada kendaraan modern & terawat",
                  "Tim profesional bersertifikat",
                  "Garansi keamanan paket",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <Link href="/about">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white cursor-pointer"
                  >
                    Pelajari Lebih Lanjut
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Advantage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, index) => (
              <AdvantageCard key={adv.title} adv={adv} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
