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
    iconBg: "bg-red-50",
    iconColor: "text-brand-red",
  },
  {
    icon: Ship,
    title: "Cargo Laut",
    description: "Solusi pengiriman antar pulau dengan kapal cargo terpercaya. Ideal untuk pengiriman volume besar ke seluruh Indonesia.",
    advantages: ["Antar pulau", "Volume besar", "Biaya efisien"],
    coverage: "Seluruh Indonesia",
    eta: "3-14 hari kerja",
    iconBg: "bg-blue-50",
    iconColor: "text-brand-blue",
  },
  {
    icon: Plane,
    title: "Cargo Udara",
    description: "Pengiriman express via udara untuk kebutuhan mendesak. Jangkauan ke seluruh bandara di Indonesia.",
    advantages: ["Paling cepat", "Aman & terjamin", "Seluruh Indonesia"],
    coverage: "Seluruh Bandara Indonesia",
    eta: "1-2 hari kerja",
    iconBg: "bg-red-50",
    iconColor: "text-brand-red",
  },
  {
    icon: Zap,
    title: "Same Day Delivery",
    description: "Pengiriman di hari yang sama untuk area tertentu. Cocok untuk kebutuhan bisnis yang sangat mendesak.",
    advantages: ["Hari yang sama", "Prioritas utama", "Konfirmasi langsung"],
    coverage: "Jabodetabek & Kota Besar",
    eta: "Hari yang sama",
    iconBg: "bg-blue-50",
    iconColor: "text-brand-blue",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Layanan pengiriman express dengan prioritas tinggi. Garansi tiba tepat waktu atau uang kembali.",
    advantages: ["Garansi tepat waktu", "Prioritas tinggi", "Asuransi penuh"],
    coverage: "Seluruh Indonesia",
    eta: "1-3 hari kerja",
    iconBg: "bg-red-50",
    iconColor: "text-brand-red",
  },
  {
    icon: Warehouse,
    title: "Warehouse Service",
    description: "Layanan pergudangan modern dengan sistem manajemen inventori digital. Aman, bersih, dan terorganisir.",
    advantages: ["Gudang modern", "Sistem digital", "Keamanan 24/7"],
    coverage: "Jakarta, Surabaya, Medan",
    eta: "Fleksibel",
    iconBg: "bg-blue-50",
    iconColor: "text-brand-blue",
  },
  {
    icon: Home,
    title: "Door to Door",
    description: "Layanan jemput dan antar langsung dari pintu ke pintu. Tanpa repot, tanpa antri.",
    advantages: ["Jemput di lokasi", "Antar ke tujuan", "Tanpa repot"],
    coverage: "Area Layanan Kami",
    eta: "Sesuai layanan",
    iconBg: "bg-red-50",
    iconColor: "text-brand-red",
  },
  {
    icon: MapPin,
    title: "Tracking Paket",
    description: "Pantau perjalanan paket Anda secara real-time dengan sistem tracking canggih berbasis teknologi terkini.",
    advantages: ["Real-time update", "Notifikasi otomatis", "Riwayat lengkap"],
    coverage: "Semua Layanan",
    eta: "Real-time",
    iconBg: "bg-blue-50",
    iconColor: "text-brand-blue",
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
      className="bg-white rounded-2xl border border-slate-200 p-6 group cursor-pointer hover:shadow-[0_12px_48px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className={`w-7 h-7 ${service.iconColor}`} />
      </div>

      {/* Title */}
      <h3 className="font-sora font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-red transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Advantages */}
      <div className="space-y-2 mb-5">
        {service.advantages.map((adv) => (
          <div key={adv} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
            <span className="text-slate-700 text-sm">{adv}</span>
          </div>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          <div className="text-slate-500 text-xs">Coverage</div>
          <div className="text-slate-900 text-xs font-medium">{service.coverage}</div>
        </div>
        <div className="text-right">
          <div className="text-slate-500 text-xs">Estimasi</div>
          <div className="text-brand-red text-xs font-semibold">{service.eta}</div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2.5 rounded-xl border-2 border-brand-red text-brand-red text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-red hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
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
    <section id="services" className="py-24 relative overflow-hidden bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-semibold tracking-wide uppercase mb-4 border border-red-100">
            Layanan Kami
          </div>
          <h2 className="font-sora font-black text-4xl sm:text-5xl text-slate-900 mb-4">
            Solusi Pengiriman{" "}
            <span className="text-brand-red">Lengkap</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
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
          <p className="text-slate-600 mb-4">Butuh solusi khusus untuk bisnis Anda?</p>
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
