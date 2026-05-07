"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Package, Clock, Headphones, MapPin } from "lucide-react";

const stats = [
  { icon: Package,     value: 10000, suffix: "+", label: "Paket Terkirim",    desc: "Berhasil dikirim ke seluruh Indonesia",       iconBg: "bg-red-50",  iconColor: "text-brand-red",  accent: "border-red-100" },
  { icon: Clock,       value: 98,    suffix: "%",  label: "On Time Delivery", desc: "Tingkat ketepatan waktu pengiriman",           iconBg: "bg-blue-50", iconColor: "text-brand-blue", accent: "border-blue-100" },
  { icon: Headphones,  value: 24,    suffix: "/7", label: "Customer Support", desc: "Siap membantu kapan saja Anda butuhkan",       iconBg: "bg-red-50",  iconColor: "text-brand-red",  accent: "border-red-100" },
  { icon: MapPin,      value: 500,   suffix: "+",  label: "Kota Terjangkau",  desc: "Jangkauan pengiriman seluruh Indonesia",       iconBg: "bg-blue-50", iconColor: "text-brand-blue", accent: "border-blue-100" },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className={`bg-white rounded-2xl p-8 text-center border ${stat.accent} hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group`}
    >
      <div className={`w-16 h-16 rounded-2xl ${stat.iconBg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
      </div>
      <div className="font-sora font-black text-5xl gradient-text mb-2">
        {inView ? <CountUp start={0} end={stat.value} duration={2.5} separator="," suffix={stat.suffix} /> : `0${stat.suffix}`}
      </div>
      <div className="font-semibold text-brand-navy text-lg mb-1">{stat.label}</div>
      <div className="text-slate-400 text-sm">{stat.desc}</div>
    </motion.div>
  );
}

export default function StatsSection() {
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
            Pencapaian Kami
          </span>
          <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-brand-navy mb-4">
            Angka yang <span className="gradient-text">Berbicara</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Kepercayaan ribuan pelanggan adalah bukti nyata komitmen kami dalam memberikan layanan terbaik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          {["ISO Certified", "Trusted Partner", "5 Star Rating", "Best Logistics 2024"].map((b) => (
            <div key={b} className="px-5 py-2.5 rounded-full bg-surface-gray border border-surface-border text-slate-500 text-sm font-medium">
              ✦ {b}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
