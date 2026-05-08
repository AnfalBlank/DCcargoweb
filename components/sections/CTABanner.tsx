"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTABanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-20 bg-surface-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-brand-navy p-10 sm:p-14 text-center shadow-card-lg"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-pattern opacity-10" />

          <div className="relative z-10">
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-6 shadow-red-glow"
            >
              <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>

            <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Siap Kirim Sekarang?
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-9">
              Bergabunglah dengan ribuan pelanggan yang telah mempercayakan kebutuhan logistik mereka kepada Ditama Cargo Solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer w-full sm:w-auto shadow-red-glow"
                >
                  Kirim Sekarang <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <motion.a
                href={`https://wa.me/6285211172494?text=${encodeURIComponent("Halo DC Solution, saya ingin menggunakan layanan pengiriman cargo. Bisa bantu saya mulai?")}`}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
                Chat WhatsApp
              </motion.a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-white/10">
              {["✓ Gratis Konsultasi", "✓ Harga Transparan", "✓ Garansi Tepat Waktu", "✓ Asuransi Pengiriman"].map((item) => (
                <span key={item} className="text-white/50 text-xs sm:text-sm">{item}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
