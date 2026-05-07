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

const WA_URL = `https://wa.me/6282177981028?text=${encodeURIComponent("Halo DC Cargo, saya ingin menggunakan layanan pengiriman cargo. Bisa bantu saya?")}`;
const WA_ADMIN_URL = `https://wa.me/6285211172494?text=${encodeURIComponent("Halo DC Cargo, saya ingin menggunakan layanan pengiriman cargo. Bisa bantu saya?")}`;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-brand-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <Image src="/logo.png" alt="DC Solution Logo" width={64} height={64} className="object-contain" />
              <div>
                <div className="font-sora font-bold text-white text-lg leading-none">PT. DITAMA</div>
                <div className="font-inter text-red-400 text-xs tracking-widest uppercase mt-0.5">Cargo Solution</div>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Solusi pengiriman cargo express modern yang cepat, aman, dan terpercaya untuk seluruh Indonesia.
            </p>

            <div className="space-y-3">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 text-sm hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/30 text-[10px] uppercase tracking-wide mb-0.5">CS</div>
                  <span>+62 821-7798-1028</span>
                </div>
              </a>
              <a href={WA_ADMIN_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 text-sm hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/30 text-[10px] uppercase tracking-wide mb-0.5">Admin</div>
                  <span>+62 852-1117-2494</span>
                </div>
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>info@ditamacargo.id</span>
              </div>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Bandar Udara Internasional Soekarno–Hatta,<br />
                  Komplek Terminal Kargo,<br />
                  Jl. Cengkareng Golf Club, RT.001/RW.010,<br />
                  Pajang, Kec. Benda, Kota Tangerang,<br />
                  Banten 15126
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <Icon className="w-4 h-4 text-white/40" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="min-w-0">
              <h4 className="font-semibold text-white text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/45 text-sm hover:text-white transition-colors duration-200 block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs sm:text-sm text-center sm:text-left">
            © 2026 PT. Ditama Cargo Solution. All rights reserved.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg bg-brand-gradient flex items-center justify-center shadow-red-glow"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
