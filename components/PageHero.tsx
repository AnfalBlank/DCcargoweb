"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type PageType = "about" | "services" | "tracking" | "blog" | "contact";

interface PageHeroProps {
  page: PageType;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
}

// ── About: floating team silhouettes + timeline dots ─────────────────────────
function AboutBg() {
  return (
    <>
      {/* Radial center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(30,58,138,0.4),transparent)]" />
      {/* Floating circles representing milestones */}
      {[
        { size: 180, x: "8%",  y: "15%", delay: 0,   opacity: 0.07 },
        { size: 120, x: "80%", y: "10%", delay: 0.5, opacity: 0.06 },
        { size: 90,  x: "70%", y: "65%", delay: 1,   opacity: 0.08 },
        { size: 60,  x: "20%", y: "70%", delay: 1.5, opacity: 0.06 },
        { size: 200, x: "50%", y: "80%", delay: 0.8, opacity: 0.04 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white"
          style={{ width: c.size, height: c.size, left: c.x, top: c.y, opacity: c.opacity }}
          animate={{ scale: [1, 1.08, 1], opacity: [c.opacity, c.opacity * 1.6, c.opacity] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
        />
      ))}
      {/* Timeline vertical line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Year dots on timeline */}
      {["2018","2020","2022","2024","2026"].map((year, i) => (
        <motion.div
          key={year}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ top: `${15 + i * 17}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
        >
          <div className="w-2 h-2 rounded-full bg-red-400/60" />
          <span className="text-white/20 text-[9px] mt-1 font-mono">{year}</span>
        </motion.div>
      ))}
      {/* Floating award badges */}
      {[
        { label: "Est. 2018", x: "12%", y: "30%", delay: 0.6 },
        { label: "500+ Kota", x: "75%", y: "40%", delay: 0.9 },
        { label: "98% On Time", x: "60%", y: "20%", delay: 1.2 },
      ].map((b) => (
        <motion.div
          key={b.label}
          className="absolute px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-white/50 text-xs font-medium backdrop-blur-sm"
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: b.delay, duration: 0.6 }}
        >
          {b.label}
        </motion.div>
      ))}
    </>
  );
}

// ── Services: moving cargo icons grid ────────────────────────────────────────
function ServicesBg() {
  const icons = ["🚛","✈️","🚢","📦","⚡","🏭","🏠","📍","🔒","⏱️","🌏","💼"];
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_50%,rgba(220,38,38,0.2),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_30%,rgba(30,58,138,0.25),transparent)]" />
      {/* Animated route lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
          animate={{ opacity: [0, 0.6, 0], x: ["-100%", "100%"] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
        />
      ))}
      {/* Floating service icons */}
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none"
          style={{
            left: `${5 + (i % 6) * 17}%`,
            top: `${10 + Math.floor(i / 6) * 55}%`,
            opacity: 0.12,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.08, 0.18, 0.08],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
      ))}
      {/* Grid dots */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </>
  );
}

// ── Tracking: radar / signal animation ───────────────────────────────────────
function TrackingBg() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(30,58,138,0.35),rgba(6,13,31,0.8))]" />
      {/* Radar rings expanding from center */}
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-blue-400/30"
          style={{
            width: ring * 120,
            height: ring * 120,
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: ring * 0.6, ease: "easeOut" }}
        />
      ))}
      {/* Radar sweep line */}
      <motion.div
        className="absolute"
        style={{ left: "50%", top: "50%", width: 200, height: 2, transformOrigin: "0% 50%" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-400/60 to-transparent" />
      </motion.div>
      {/* Location ping dots */}
      {[
        { x: "25%", y: "35%", delay: 0 },
        { x: "65%", y: "25%", delay: 0.8 },
        { x: "45%", y: "60%", delay: 1.6 },
        { x: "75%", y: "55%", delay: 2.4 },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute" style={{ left: dot.x, top: dot.y }}>
          <motion.div
            className="w-3 h-3 rounded-full bg-red-400"
            animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: dot.delay }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-400"
            animate={{ scale: [1, 3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: dot.delay }}
          />
        </motion.div>
      ))}
      {/* Moving package along path */}
      <motion.div
        className="absolute text-xl"
        animate={{ x: ["10%", "85%", "10%"], y: ["20%", "60%", "20%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: 0, top: 0 }}
      >
        📦
      </motion.div>
      {/* Dashed route path */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10% 20% Q 50% 80% 85% 60%" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
      </svg>
    </>
  );
}

// ── Blog: floating article cards + text lines ─────────────────────────────────
function BlogBg() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_40%,rgba(30,58,138,0.3),transparent)]" />
      {/* Floating "article card" shapes */}
      {[
        { w: 160, h: 100, x: "5%",  y: "15%", delay: 0,   rot: -5 },
        { w: 140, h: 90,  x: "75%", y: "10%", delay: 0.4, rot: 4 },
        { w: 120, h: 80,  x: "80%", y: "55%", delay: 0.8, rot: -3 },
        { w: 150, h: 95,  x: "3%",  y: "60%", delay: 1.2, rot: 6 },
      ].map((card, i) => (
        <motion.div
          key={i}
          className="absolute rounded-xl bg-white/5 border border-white/10 overflow-hidden"
          style={{ width: card.w, height: card.h, left: card.x, top: card.y, rotate: card.rot }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: card.delay, duration: 0.6 }, y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: card.delay } }}
        >
          {/* Fake image area */}
          <div className="h-2/5 bg-gradient-to-r from-red-900/30 to-blue-900/30" />
          {/* Fake text lines */}
          <div className="p-2 space-y-1.5">
            <div className="h-1.5 bg-white/15 rounded-full w-4/5" />
            <div className="h-1.5 bg-white/10 rounded-full w-3/5" />
            <div className="h-1.5 bg-white/8 rounded-full w-2/3" />
          </div>
        </motion.div>
      ))}
      {/* Floating category tags */}
      {["Cargo Tips","Logistics","Supply Chain","News"].map((tag, i) => (
        <motion.div
          key={tag}
          className="absolute px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/25 text-red-300/60 text-[10px] font-medium"
          style={{ left: `${20 + i * 20}%`, top: `${70 + (i % 2) * 15}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        >
          {tag}
        </motion.div>
      ))}
      {/* Pencil/write icon floating */}
      <motion.div
        className="absolute text-4xl opacity-10 right-1/4 top-1/3"
        animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✍️
      </motion.div>
    </>
  );
}

// ── Contact: communication waves ─────────────────────────────────────────────
function ContactBg() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_50%,rgba(220,38,38,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_75%_30%,rgba(30,58,138,0.25),transparent)]" />
      {/* WhatsApp-style message bubbles */}
      {[
        { text: "Halo, saya ingin kirim cargo...", x: "8%",  y: "20%", delay: 0,   align: "left" },
        { text: "Siap! Kami bantu sekarang 🚀",   x: "45%", y: "35%", delay: 0.8, align: "right" },
        { text: "Berapa estimasi biayanya?",       x: "5%",  y: "55%", delay: 1.6, align: "left" },
        { text: "Cek penawaran terbaik kami ✓",   x: "42%", y: "68%", delay: 2.4, align: "right" },
      ].map((bubble, i) => (
        <motion.div
          key={i}
          className={`absolute max-w-[180px] px-3 py-2 rounded-2xl text-[10px] font-medium backdrop-blur-sm ${
            bubble.align === "left"
              ? "bg-white/10 border border-white/15 text-white/50 rounded-tl-sm"
              : "bg-red-600/20 border border-red-500/25 text-red-200/50 rounded-tr-sm"
          }`}
          style={{ left: bubble.x, top: bubble.y }}
          initial={{ opacity: 0, scale: 0.8, x: bubble.align === "left" ? -10 : 10 }}
          animate={{ opacity: [0, 0.9, 0.9, 0], scale: 1, x: 0 }}
          transition={{ duration: 4, repeat: Infinity, delay: bubble.delay + i * 0.2, repeatDelay: 4 }}
        >
          {bubble.text}
        </motion.div>
      ))}
      {/* Signal waves from phone icon */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2">
        <div className="text-4xl opacity-15">📱</div>
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-green-400/30"
            style={{
              width: ring * 40,
              height: ring * 40,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.4 }}
          />
        ))}
      </div>
      {/* Floating contact icons */}
      {["📧","📞","💬","📍"].map((icon, i) => (
        <motion.div
          key={icon}
          className="absolute text-2xl opacity-10"
          style={{ left: `${15 + i * 20}%`, top: `${75 + (i % 2) * 10}%` }}
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
        >
          {icon}
        </motion.div>
      ))}
    </>
  );
}

// ── Config per page ───────────────────────────────────────────────────────────
const pageConfig: Record<PageType, { bg: string; BgComponent: React.FC }> = {
  about: {
    bg: "from-[#060D1F] via-[#0d1f4a] to-[#060D1F]",
    BgComponent: AboutBg,
  },
  services: {
    bg: "from-[#0a0a0a] via-[#1a0a0a] to-[#060D1F]",
    BgComponent: ServicesBg,
  },
  tracking: {
    bg: "from-[#020817] via-[#060D1F] to-[#020817]",
    BgComponent: TrackingBg,
  },
  blog: {
    bg: "from-[#060D1F] via-[#0d1535] to-[#060D1F]",
    BgComponent: BlogBg,
  },
  contact: {
    bg: "from-[#0a0612] via-[#0d1535] to-[#060D1F]",
    BgComponent: ContactBg,
  },
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function PageHero({ page, badge, title, titleHighlight, subtitle }: PageHeroProps) {
  const { bg, BgComponent } = pageConfig[page];

  return (
    <div className={`pt-24 pb-14 relative overflow-hidden bg-gradient-to-br ${bg}`}>
      {/* Page-specific animated background */}
      <BgComponent />

      {/* Noise overlay for depth */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">{badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sora font-black text-4xl sm:text-5xl text-white mb-4"
        >
          {title}{" "}
          <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
