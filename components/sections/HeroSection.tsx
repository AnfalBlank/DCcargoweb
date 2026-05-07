"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Package, Truck } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CargoScene = dynamic(() => import("@/components/3d/CargoScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  ),
});

const stats = [
  { value: "10K+", label: "Paket Terkirim" },
  { value: "98%",  label: "On Time" },
  { value: "24/7", label: "Support" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-bg pt-14">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl" />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{ left: `${8 + i * 11}%`, top: `${15 + (i % 4) * 20}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ══════════════════════════════════════════
            MOBILE layout  (< lg)
        ══════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center text-center py-8 gap-5">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20"
          >
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-xs font-medium">#1 Cargo Express Indonesia</span>
          </motion.div>

          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full h-[240px]"
          >
            <div className="absolute inset-0 bg-blue-900/10 rounded-full blur-2xl" />
            <CargoScene />
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sora font-black text-3xl leading-tight text-white"
          >
            WE{" "}
            <span style={{ color: "#FCA5A5" }} className="drop-shadow-[0_0_20px_rgba(252,165,165,0.6)]">
              DELIVER
            </span>
            <br />
            <span className="text-white/70">YOUR HAPPINESS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
            className="text-white/60 text-sm leading-relaxed max-w-xs"
          >
            Solusi cargo express{" "}
            <span className="text-red-300 font-semibold">cepat</span>,{" "}
            <span className="text-red-300 font-semibold">aman</span>, dan{" "}
            <span className="text-red-300 font-semibold">terpercaya</span>{" "}
            untuk seluruh Indonesia.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            <Link href="/contact" className="w-full">
              <motion.span whileTap={{ scale: 0.96 }}
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer w-full"
              >
                Kirim Sekarang <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/contact" className="w-full">
              <motion.span whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white text-sm border border-white/25 hover:bg-white/10 transition-all cursor-pointer w-full"
              >
                Hubungi Kami
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.95 }}
            className="flex items-center justify-center gap-6 pb-4"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-8 bg-white/15" />}
                <div className="text-center">
                  <div className="font-sora font-black text-xl text-white leading-none">{s.value}</div>
                  <div className="text-white/45 text-[10px] mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            DESKTOP layout  (lg+)
        ══════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center py-20">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-7"
            >
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">#1 Cargo Express Indonesia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sora font-black text-6xl xl:text-7xl leading-[1.05] text-white mb-6"
            >
              WE{" "}
              <span style={{ color: "#FCA5A5" }} className="drop-shadow-[0_0_30px_rgba(252,165,165,0.5)]">
                DELIVER
              </span>
              <br />
              <span className="text-white/75">YOUR HAPPINESS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/60 text-lg leading-relaxed mb-9 max-w-lg"
            >
              Solusi pengiriman cargo express modern yang{" "}
              <span className="text-red-300 font-semibold">cepat</span>,{" "}
              <span className="text-red-300 font-semibold">aman</span>, dan{" "}
              <span className="text-red-300 font-semibold">terpercaya</span>{" "}
              untuk seluruh Indonesia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-4 mb-14"
            >
              <Link href="/contact">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer shadow-red-glow"
                >
                  Kirim Sekarang <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white border border-white/25 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Hubungi Kami
                </motion.span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-10"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-10 bg-white/15" />}
                  <div>
                    <div className="font-sora font-black text-3xl text-white">{s.value}</div>
                    <div className="text-white/45 text-xs mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative h-[560px]"
          >
            <div className="absolute inset-0 bg-blue-900/10 rounded-full blur-3xl" />
            <CargoScene />

            {/* Floating info badges */}
            {[
              { icon: Truck,   label: "Express Delivery",  cls: "top-20 left-4" },
              { icon: Shield,  label: "Aman & Terjamin",   cls: "top-36 right-2" },
              { icon: Package, label: "10K+ Paket",        cls: "bottom-36 left-2" },
              { icon: Clock,   label: "Same Day",          cls: "bottom-20 right-4" },
            ].map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                className={`absolute ${b.cls} bg-white/90 backdrop-blur-sm border border-white/80 shadow-card px-3 py-2 rounded-xl flex items-center gap-2 z-10`}
              >
                <b.icon className="w-4 h-4 text-brand-red" />
                <span className="text-slate-700 text-xs font-semibold">{b.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/35 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
