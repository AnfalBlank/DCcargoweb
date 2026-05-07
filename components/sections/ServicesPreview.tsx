"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Truck, Ship, Plane, Zap, Clock, Warehouse, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Truck,     title: "Cargo Darat",    desc: "Pengiriman via jalur darat ke seluruh Jawa, Sumatera & Kalimantan.",  color: "bg-red-50 text-brand-red",   border: "hover:border-red-200" },
  { icon: Ship,      title: "Cargo Laut",     desc: "Solusi antar pulau dengan kapal cargo terpercaya.",                   color: "bg-blue-50 text-brand-blue", border: "hover:border-blue-200" },
  { icon: Plane,     title: "Cargo Udara",    desc: "Pengiriman express via udara ke seluruh Indonesia.",                  color: "bg-red-50 text-brand-red",   border: "hover:border-red-200" },
  { icon: Zap,       title: "Same Day",       desc: "Pengiriman di hari yang sama untuk area tertentu.",                   color: "bg-blue-50 text-brand-blue", border: "hover:border-blue-200" },
  { icon: Clock,     title: "Express",        desc: "Garansi tiba tepat waktu dengan prioritas tinggi.",                   color: "bg-red-50 text-brand-red",   border: "hover:border-red-200" },
  { icon: Warehouse, title: "Warehouse",      desc: "Pergudangan modern dengan sistem manajemen digital.",                 color: "bg-blue-50 text-brand-blue", border: "hover:border-blue-200" },
];

export default function ServicesPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-surface-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-semibold tracking-wide uppercase mb-4 border border-red-100">
            Layanan Kami
          </span>
          <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-brand-navy mb-4">
            Solusi Pengiriman <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
            Dari cargo darat hingga udara, kami menyediakan solusi logistik komprehensif untuk semua kebutuhan bisnis Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`bg-white rounded-2xl p-5 sm:p-6 border border-surface-border transition-all duration-300 ${s.border} hover:shadow-card-hover hover:-translate-y-1.5 group`}
            >
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-sora font-bold text-base sm:text-lg text-brand-navy mb-2">{s.title}</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer"
            >
              Lihat Semua Layanan <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
