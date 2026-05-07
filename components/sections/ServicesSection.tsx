"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Truck,
  Ship,
  Plane,
  Zap,
  Clock,
  Warehouse,
  Home,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Truck,
    title: "Cargo Darat",
    description: "Pengiriman cargo via jalur darat ke seluruh pulau Jawa, Sumatera, Kalimantan, dan Sulawesi dengan armada modern.",
    advantages: ["Harga terjangkau", "Kapasitas besar", "Tracking real-time"],
    coverage: "Seluruh Pulau Jawa & Sumatera",
    eta: "1-5 hari kerja",
    color: "from-red-600 to-red-800",
    glow: "rgba(220, 38, 38, 0.3)",
  },
  {
    icon: Ship,
    title: "Cargo Laut",
    description: "Solusi pengiriman antar pulau dengan kapal cargo terpercaya. Ideal untuk pengiriman volume besar ke seluruh Indonesia.",
    advantages: ["Antar pulau", "Volume besar", "Biaya efisien"],
    coverage: "Seluruh Indonesia",
    eta: "3-14 hari kerja",
    color: "from-blue-500 to-blue-700",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  {
    icon: Plane,
    title: "Cargo Udara",
    description: "Pengiriman express via udara untuk kebutuhan mendesak. Jangkauan ke seluruh bandara di Indonesia.",
    advantages: ["Paling cepat", "Aman & terjamin", "Seluruh Indonesia"],
    coverage: "Seluruh Bandara Indonesia",
    eta: "1-2 hari kerja",
    color: "from-purple-500 to-purple-700",
    glow: "rgba(168, 85, 247, 0.3)",
  },
  {
    icon: Zap,
    title: "Same Day Delivery",
    description: "Pengiriman di hari yang sama untuk area tertentu. Cocok untuk kebutuhan bisnis yang sangat mendesak.",
    advantages: ["Hari yang sama", "Prioritas utama", "Konfirmasi langsung"],
    coverage: "Jabodetabek & Kota Besar",
    eta: "Hari yang sama",
    color: "from-yellow-500 to-red-600",
    glow: "rgba(234, 179, 8, 0.3)",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Layanan pengiriman express dengan prioritas tinggi. Garansi tiba tepat waktu atau uang kembali.",
    advantages: ["Garansi tepat waktu", "Prioritas tinggi", "Asuransi penuh"],
    coverage: "Seluruh Indonesia",
    eta: "1-3 hari kerja",
    color: "from-red-500 to-red-700",
    glow: "rgba(239, 68, 68, 0.3)",
  },
  {
    icon: Warehouse,
    title: "Warehouse Service",
    description: "Layanan pergudangan modern dengan sistem manajemen inventori digital. Aman, bersih, dan terorganisir.",
    advantages: ["Gudang modern", "Sistem digital", "Keamanan 24/7"],
    coverage: "Jakarta, Surabaya, Medan",
    eta: "Fleksibel",
    color: "from-green-500 to-green-700",
    glow: "rgba(34, 197, 94, 0.3)",
  },
  {
    icon: Home,
    title: "Door to Door",
    description: "Layanan jemput dan antar langsung dari pintu ke pintu. Tanpa repot, tanpa antri.",
    advantages: ["Jemput di lokasi", "Antar ke tujuan", "Tanpa repot"],
    coverage: "Area Layanan Kami",
    eta: "Sesuai layanan",
    color: "from-teal-500 to-teal-700",
    glow: "rgba(20, 184, 166, 0.3)",
  },
  {
    icon: MapPin,
    title: "Tracking Paket",
    description: "Pantau perjalanan paket Anda secara real-time dengan sistem tracking canggih berbasis teknologi terkini.",
    advantages: ["Real-time update", "Notifikasi otomatis", "Riwayat lengkap"],
    coverage: "Semua Layanan",
    eta: "Real-time",
    color: "from-red-600 to-blue-700",
    glow: "rgba(220, 38, 38, 0.3)",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="service-card rounded-2xl p-6 group cursor-pointer"
      style={{
        "--glow-color": service.glow,
      } as React.CSSProperties}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <service.icon className="w-7 h-7 text-white" />
      </div>

      {/* Title */}
      <h3 className="font-sora font-bold text-xl text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Advantages */}
      <div className="space-y-2 mb-5">
        {service.advantages.map((adv) => (
          <div key={adv} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{adv}</span>
          </div>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div>
          <div className="text-gray-500 text-xs">Coverage</div>
          <div className="text-white text-xs font-medium">{service.coverage}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-500 text-xs">Estimasi</div>
          <div className="text-red-500 text-xs font-semibold">{service.eta}</div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2.5 rounded-xl border border-red-600/30 text-red-500 text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-600/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <Link href="/contact" className="flex items-center gap-2 w-full justify-center">
          Konsultasi Sekarang
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.button>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

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
            <Truck className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-medium">Layanan Kami</span>
          </div>
          <h2 className="font-sora font-black text-4xl sm:text-5xl text-white mb-4">
            Solusi Pengiriman{" "}
            <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dari cargo darat hingga udara, kami menyediakan solusi logistik komprehensif untuk semua kebutuhan bisnis Anda.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Butuh solusi khusus untuk bisnis Anda?</p>
          <Link href="/contact">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 rounded-2xl font-semibold text-white inline-flex items-center gap-2 cursor-pointer"
            >
              Konsultasi Gratis
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
