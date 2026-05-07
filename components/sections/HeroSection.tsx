"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Package, Truck, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CargoScene = dynamic(() => import("@/components/3d/CargoScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-bg pt-14">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent" />

      {/* Floating particles — fewer on mobile */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-30"
          style={{ left: `${8 + i * 9}%`, top: `${10 + (i % 5) * 17}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ── MOBILE layout (< lg) ── stacked, compact */}
        <div className="lg:hidden flex flex-col items-center text-center py-8 gap-6">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass neon-border"
          >
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-400 text-xs font-medium">#1 Cargo Express Indonesia</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sora font-black text-4xl leading-tight"
          >
            <span className="text-white">WE </span>
            <span className="gradient-text text-glow">DELIVER</span>
            <br />
            <span className="text-white">YOUR </span>
            <span className="text-white/70">HAPPINESS</span>
          </motion.h1>

          {/* 3D Scene — compact on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative w-full h-[220px]"
          >
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-2xl" />
            <CargoScene />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-gray-400 text-sm leading-relaxed max-w-xs"
          >
            Solusi cargo express{" "}
            <span className="text-orange-400 font-semibold">cepat</span>,{" "}
            <span className="text-orange-400 font-semibold">aman</span>, dan{" "}
            <span className="text-orange-400 font-semibold">terpercaya</span>{" "}
            untuk seluruh Indonesia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            <Link href="/contact" className="w-full">
              <motion.span
                whileTap={{ scale: 0.96 }}
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white text-sm shadow-orange-glow cursor-pointer w-full"
              >
                Kirim Sekarang
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/contact" className="w-full">
              <motion.span
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white text-sm glass neon-border cursor-pointer w-full"
              >
                Hubungi Kami
              </motion.span>
            </Link>
          </motion.div>

          {/* Quick Stats — horizontal row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex items-center justify-center gap-5 pb-4"
          >
            {[
              { value: "10K+", label: "Paket" },
              { value: "98%", label: "On Time" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div className="text-center">
                  <div className="font-sora font-bold text-lg gradient-text leading-none">{stat.value}</div>
                  <div className="text-gray-500 text-[10px] mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── DESKTOP layout (lg+) ── side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center py-16">

          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6"
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-sm font-medium">#1 Cargo Express Indonesia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sora font-black text-6xl xl:text-7xl leading-tight mb-6"
            >
              <span className="text-white">WE </span>
              <span className="gradient-text text-glow">DELIVER</span>
              <br />
              <span className="text-white">YOUR </span>
              <span className="text-white/80">HAPPINESS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Solusi pengiriman cargo express modern yang{" "}
              <span className="text-orange-400 font-semibold">cepat</span>,{" "}
              <span className="text-orange-400 font-semibold">aman</span>, dan{" "}
              <span className="text-orange-400 font-semibold">terpercaya</span>{" "}
              untuk seluruh Indonesia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-4 mb-12"
            >
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white shadow-orange-glow cursor-pointer"
                >
                  Kirim Sekarang
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white glass neon-border hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
                >
                  Hubungi Kami
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-8"
            >
              {[
                { value: "10K+", label: "Paket Terkirim" },
                { value: "98%", label: "On Time" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-10 bg-gradient-to-b from-orange-500 to-transparent" />}
                  <div>
                    <div className="font-sora font-bold text-2xl gradient-text">{stat.value}</div>
                    <div className="text-gray-500 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Scene with floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[560px]"
          >
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent rounded-full blur-3xl" />
            <CargoScene />

            {/* Floating badges — desktop only */}
            {[
              { icon: Truck,   label: "Express Delivery",  delay: 0.2, cls: "top-20 left-10" },
              { icon: MapPin,  label: "Seluruh Indonesia", delay: 0.4, cls: "top-32 right-8" },
              { icon: Package, label: "10K+ Paket",        delay: 0.6, cls: "bottom-32 left-8" },
              { icon: Zap,     label: "Same Day",          delay: 0.8, cls: "bottom-20 right-10" },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: badge.delay + 0.8 }}
                className={`absolute ${badge.cls} glass neon-border px-3 py-2 rounded-xl flex items-center gap-2 z-10`}
              >
                <badge.icon className="w-4 h-4 text-orange-400" />
                <span className="text-white text-xs font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-orange-500/40 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-orange-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
