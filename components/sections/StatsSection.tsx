"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Package, Clock, Headphones, MapPin } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: 10000,
    suffix: "+",
    label: "Paket Terkirim",
    description: "Berhasil dikirim ke seluruh Indonesia",
    color: "from-orange-500 to-orange-700",
  },
  {
    icon: Clock,
    value: 98,
    suffix: "%",
    label: "On Time Delivery",
    description: "Tingkat ketepatan waktu pengiriman",
    color: "from-red-500 to-red-700",
  },
  {
    icon: Headphones,
    value: 24,
    suffix: "/7",
    label: "Customer Support",
    description: "Siap membantu kapan saja Anda butuhkan",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: MapPin,
    value: 500,
    suffix: "+",
    label: "Kota Terjangkau",
    description: "Jangkauan pengiriman seluruh Indonesia",
    color: "from-red-600 to-orange-600",
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="stat-card rounded-2xl p-8 text-center relative overflow-hidden group"
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Icon */}
      <motion.div
        animate={inView ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <stat.icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Counter */}
      <div className="font-sora font-black text-5xl gradient-text mb-2">
        {inView ? (
          <CountUp
            start={0}
            end={stat.value}
            duration={2.5}
            separator=","
            suffix={stat.suffix}
          />
        ) : (
          <span>0{stat.suffix}</span>
        )}
      </div>

      {/* Label */}
      <div className="font-semibold text-white text-lg mb-2">{stat.label}</div>

      {/* Description */}
      <div className="text-gray-500 text-sm">{stat.description}</div>

      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-50`} />
    </motion.div>
  );
}

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900/80" />

      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

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
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">Pencapaian Kami</span>
          </div>
          <h2 className="font-sora font-black text-4xl sm:text-5xl text-white mb-4">
            Angka yang{" "}
            <span className="gradient-text">Berbicara</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kepercayaan ribuan pelanggan adalah bukti nyata komitmen kami dalam memberikan layanan terbaik.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            "ISO Certified",
            "Trusted Partner",
            "5 Star Rating",
            "Best Logistics 2024",
          ].map((badge) => (
            <div
              key={badge}
              className="glass neon-border px-5 py-2.5 rounded-full text-sm text-gray-300 font-medium"
            >
              ✦ {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
