"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Layanan: [
    { label: "Cargo Darat",       href: "/services" },
    { label: "Cargo Laut",        href: "/services" },
    { label: "Cargo Udara",       href: "/services" },
    { label: "Same Day Delivery", href: "/services" },
    { label: "Express Delivery",  href: "/services" },
    { label: "Warehouse Service", href: "/services" },
    { label: "Door to Door",      href: "/services" },
  ],
  Perusahaan: [
    { label: "Tentang Kami",  href: "/about" },
    { label: "Visi & Misi",   href: "/about" },
    { label: "Blog & Berita", href: "/blog" },
    { label: "Karir",         href: "/contact" },
  ],
  Dukungan: [
    { label: "Tracking Paket",     href: "/tracking" },
    { label: "Hubungi Kami",       href: "/contact" },
    { label: "FAQ",                href: "/contact" },
    { label: "Syarat & Ketentuan", href: "/contact" },
  ],
};

const WA_CS    = `https://wa.me/6285211172494?text=${encodeURIComponent("Halo DC Solution, saya ingin menggunakan layanan pengiriman. Bisa bantu saya?")}`;
const WA_ADMIN = `https://wa.me/6282177981028?text=${encodeURIComponent("Halo DC Solution, saya ingin menggunakan layanan pengiriman. Bisa bantu saya?")}`;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#060D1F] overflow-hidden">
      {/* ── Background layers ── */}
      {/* Radial gradient center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(30,58,138,0.35),transparent)]" />
      {/* Red accent bottom-left */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-700/15 rounded-full blur-3xl" />
      {/* Blue accent top-right */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-800/20 rounded-full blur-3xl" />
      {/* Dot grid pattern */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Subtle diagonal lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">

        {/* ── Top divider accent ── */}
        <div className="h-1 bg-gradient-to-r from-brand-red via-white/20 to-brand-blue rounded-full mb-0" />

        {/* ── Main content ── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand column — 4 cols */}
          <div className="md:col-span-4">
            {/* Logo + name */}
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit group">
              <div className="w-16 h-16 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="DC Solution Logo"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <div className="font-sora font-black text-white text-xl leading-tight">
                  PT. DITAMA
                </div>
                <div className="font-sora font-bold text-brand-red text-sm tracking-wider uppercase leading-tight mt-0.5">
                  CARGO SOLUTION
                </div>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-sm">
              Solusi pengiriman cargo express modern yang cepat, aman, dan terpercaya untuk seluruh Indonesia.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-7">
              {/* CS */}
              <a href={WA_CS} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-red-600/40 transition-colors">
                  <Phone className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <div className="text-white/35 text-[10px] uppercase tracking-widest font-medium">Customer Service</div>
                  <div className="text-white/75 text-sm group-hover:text-white transition-colors">+62 852-1117-2494</div>
                </div>
              </a>

              {/* Admin */}
              <a href={WA_ADMIN} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600/40 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white/35 text-[10px] uppercase tracking-widest font-medium">Admin</div>
                  <div className="text-white/75 text-sm group-hover:text-white transition-colors">+62 821-7798-1028</div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:adminDCS16@gmail.com"
                className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <div className="text-white/35 text-[10px] uppercase tracking-widest font-medium">Email</div>
                  <div className="text-white/75 text-sm group-hover:text-white transition-colors">adminDCS16@gmail.com</div>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <div className="text-white/35 text-[10px] uppercase tracking-widest font-medium mb-0.5">Alamat</div>
                  <div className="text-white/60 text-xs leading-relaxed">
                    Gedung Gatrans, Bandara Soekarno–Hatta,<br />
                    Komplek Terminal Kargo,<br />
                    Jl. Cengkareng Golf Club RT.001/RW.010,<br />
                    Pajang, Kec. Benda,<br />
                    Kota Tangerang, Banten 15126
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ditamacargo/" },
                { Icon: Facebook,  label: "Facebook",  href: "https://web.facebook.com/ditama.cargo.solution.2024/" },
                { Icon: Twitter,   label: "Twitter",   href: "#" },
                { Icon: Youtube,   label: "YouTube",   href: "https://www.youtube.com/playlist?list=PLYK6HLyTSHFE-jXfUyJW77j8lIyQCxGZy" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/25 transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-white/50" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns — 8 cols split into 3 */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-sora font-bold text-white text-sm mb-5 pb-2 border-b border-white/10">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/45 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2026 PT. Ditama Cargo Solution. All rights reserved.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-red to-brand-blue flex items-center justify-center shadow-red-glow"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
