"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTABanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-orange-600/20" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass neon-border rounded-3xl p-8 sm:p-10 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-5 shadow-orange-glow-lg"
          >
            <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          <h2 className="font-sora font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Siap Kirim Sekarang?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Bergabunglah dengan ribuan pelanggan yang telah mempercayakan kebutuhan logistik mereka kepada Ditama Cargo Solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white shadow-orange-glow cursor-pointer w-full sm:w-auto"
              >
                Kirim Sekarang
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
            <motion.a
              href={`https://wa.me/6282177981028?text=${encodeURIComponent("Halo DC Cargo, saya ingin menggunakan layanan pengiriman cargo. Bisa bantu saya mulai?")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white glass border border-green-500/30 hover:bg-green-500/10 transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              Chat WhatsApp
            </motion.a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10">
            {["✓ Gratis Konsultasi", "✓ Harga Transparan", "✓ Garansi Tepat Waktu", "✓ Asuransi Pengiriman"].map((item) => (
              <span key={item} className="text-gray-400 text-xs sm:text-sm">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
