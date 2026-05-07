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

// ── Services: geometric cargo network ────────────────────────────────────────
function ServicesBg() {
  // Service boxes as geometric shapes
  const boxes = [
    { w: 56, h: 40, x: "6%",  y: "18%", delay: 0,   label: "DARAT" },
    { w: 56, h: 40, x: "78%", y: "12%", delay: 0.3, label: "LAUT" },
    { w: 56, h: 40, x: "82%", y: "58%", delay: 0.6, label: "UDARA" },
    { w: 56, h: 40, x: "4%",  y: "62%", delay: 0.9, label: "EXPRESS" },
    { w: 56, h: 40, x: "42%", y: "72%", delay: 1.2, label: "WAREHOUSE" },
  ];

  // Connection lines between nodes
  const lines = [
    { x1: "9%", y1: "38%", x2: "45%", y2: "50%", delay: 0.4 },
    { x1: "81%", y1: "32%", x2: "45%", y2: "50%", delay: 0.7 },
    { x1: "85%", y1: "58%", x2: "45%", y2: "72%", delay: 1.0 },
    { x1: "7%",  y1: "62%", x2: "45%", y2: "72%", delay: 1.3 },
  ];

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_50%,rgba(220,38,38,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_30%,rgba(30,58,138,0.22),transparent)]" />

      {/* Animated route lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
          animate={{ opacity: [0, 0.5, 0], x: ["-100%", "100%"] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
        />
      ))}

      {/* SVG network connections */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {lines.map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: l.delay, duration: 0.8 }}
          />
        ))}
        {/* Moving dot along a route */}
        <motion.circle
          r="3" fill="rgba(220,38,38,0.7)"
          animate={{
            cx: ["9%", "45%", "81%", "45%", "9%"],
            cy: ["38%", "50%", "32%", "50%", "38%"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Service label boxes */}
      {boxes.map((box, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm"
          style={{ width: box.w, height: box.h, left: box.x, top: box.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: box.delay, duration: 0.5 },
            scale:   { delay: box.delay, duration: 0.5 },
            y:       { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: box.delay },
          }}
        >
          <span className="text-white/40 text-[9px] font-bold tracking-wider">{box.label}</span>
        </motion.div>
      ))}

      {/* Central hub circle */}
      <motion.div
        className="absolute rounded-full border-2 border-red-500/25 bg-red-600/8"
        style={{ width: 80, height: 80, left: "calc(45% - 40px)", top: "calc(50% - 40px)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border border-red-500/15"
        style={{ width: 130, height: 130, left: "calc(45% - 65px)", top: "calc(50% - 65px)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
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
      {/* Moving dot along route */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        animate={{ x: ["10%", "85%", "10%"], y: ["20%", "60%", "20%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: 0, top: 0 }}
      />
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
      {/* Pen/write shape — geometric */}
      <motion.div
        className="absolute right-1/4 top-1/3 w-8 h-8 opacity-15"
        animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-1.5 bg-white rounded-full" />
        <div className="w-0 h-0 border-l-[16px] border-r-0 border-t-[6px] border-b-[6px] border-l-white border-t-transparent border-b-transparent mt-0.5" />
      </motion.div>
    </>
  );
}

// ── Contact: communication waves — geometric ─────────────────────────────────
function ContactBg() {
  // Chat bubble shapes (no emoji)
  const bubbles = [
    { text: "Halo, saya ingin kirim cargo...", x: "6%",  y: "18%", delay: 0,   align: "left"  as const },
    { text: "Siap! Kami bantu sekarang",       x: "44%", y: "32%", delay: 0.9, align: "right" as const },
    { text: "Berapa estimasi biayanya?",        x: "4%",  y: "52%", delay: 1.8, align: "left"  as const },
    { text: "Cek penawaran terbaik kami",       x: "41%", y: "66%", delay: 2.7, align: "right" as const },
  ];

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_50%,rgba(220,38,38,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_75%_30%,rgba(30,58,138,0.22),transparent)]" />

      {/* Chat bubbles */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute max-w-[190px] px-3 py-2 text-[10px] font-medium backdrop-blur-sm ${
            b.align === "left"
              ? "bg-white/8 border border-white/12 text-white/45 rounded-2xl rounded-tl-sm"
              : "bg-red-600/15 border border-red-500/20 text-red-200/45 rounded-2xl rounded-tr-sm"
          }`}
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.85, x: b.align === "left" ? -12 : 12 }}
          animate={{ opacity: [0, 0.85, 0.85, 0], scale: 1, x: 0 }}
          transition={{ duration: 4.5, repeat: Infinity, delay: b.delay, repeatDelay: 3.5 }}
        >
          {b.text}
          {/* Read tick */}
          {b.align === "right" && (
            <span className="ml-1 text-blue-300/50">✓✓</span>
          )}
        </motion.div>
      ))}

      {/* Phone / signal tower — geometric */}
      <div className="absolute right-[22%] top-1/2 -translate-y-1/2">
        {/* Phone body */}
        <motion.div
          className="w-10 h-16 rounded-xl border-2 border-white/20 bg-white/5 relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-white/20" />
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-white/20" />
        </motion.div>
        {/* Signal rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-green-400/25"
            style={{
              width: ring * 36,
              height: ring * 36,
              left: "50%", top: "50%",
              x: "-50%", y: "-50%",
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: ring * 0.45 }}
          />
        ))}
      </div>

      {/* Envelope shape */}
      <motion.div
        className="absolute left-[68%] top-[20%]"
        animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-8 rounded border border-white/15 bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 flex items-start justify-center">
            <div className="w-full h-0 border-l-[24px] border-r-[24px] border-t-[14px] border-l-transparent border-r-transparent border-t-white/10" />
          </div>
        </div>
      </motion.div>

      {/* Location pin shape */}
      <motion.div
        className="absolute left-[72%] bottom-[25%]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-red-400/30 bg-red-500/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-400/50" />
        </div>
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-400/30 mx-auto" />
      </motion.div>

      {/* Dot grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
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
