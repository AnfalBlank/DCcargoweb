"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Truck, Ship, Plane, Zap, Clock, Warehouse, Home, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Truck, title: "Cargo Darat", desc: "Pengiriman via jalur darat ke seluruh Jawa, Sumatera & Kalimantan.", color: "from-orange-500 to-orange-700" },
  { icon: Ship, title: "Cargo Laut", desc: "Solusi antar pulau dengan kapal cargo terpercaya.", color: "from-blue-500 to-blue-700" },
  { icon: Plane, title: "Cargo Udara", desc: "Pengiriman express via udara ke seluruh Indonesia.", color: "from-purple-500 to-purple-700" },
  { icon: Zap, title: "Same Day", desc: "Pengiriman di hari yang sama untuk area tertentu.", color: "from-yellow-500 to-orange-500" },
  { icon: Clock, title: "Express Delivery", desc: "Garansi tiba tepat waktu dengan prioritas tinggi.", color: "from-red-500 to-red-700" },
  { icon: Warehouse, title: "Warehouse", desc: "Pergudangan modern dengan sistem manajemen digital.", color: "from-green-500 to-green-700" },
];

export default function ServicesPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Truck className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Layanan Kami</span>
          </div>
          <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Solusi Pengiriman <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Dari cargo darat hingga udara, kami menyediakan solusi logistik komprehensif untuk semua kebutuhan bisnis Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-card rounded-2xl p-5 sm:p-6 group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="font-sora font-bold text-base sm:text-lg text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-10"
        >
          <Link href="/services">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white cursor-pointer"
            >
              Lihat Semua Layanan
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
