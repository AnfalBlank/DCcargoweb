"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Layanan: [
    { label: "Cargo Darat", href: "/services" },
    { label: "Cargo Laut", href: "/services" },
    { label: "Cargo Udara", href: "/services" },
    { label: "Same Day Delivery", href: "/services" },
    { label: "Express Delivery", href: "/services" },
    { label: "Warehouse Service", href: "/services" },
    { label: "Door to Door", href: "/services" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Visi & Misi", href: "/about" },
    { label: "Blog & Berita", href: "/blog" },
    { label: "Karir", href: "/contact" },
  ],
  Dukungan: [
    { label: "Tracking Paket", href: "/tracking" },
    { label: "Hubungi Kami", href: "/contact" },
    { label: "FAQ", href: "/contact" },
    { label: "Syarat & Ketentuan", href: "/contact" },
  ],
};

const WA_NUMBER = "6282177981028";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo DC Cargo, saya ingin menggunakan layanan pengiriman cargo. Bisa bantu saya?")}`;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#010314] border-t border-white/5">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main grid — 1 col mobile, 2 col tablet, 5 col desktop */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Brand — spans 2 cols on lg */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 w-fit">
              <Image
                src="/logo.png"
                alt="DC Solution Logo"
                width={72}
                height={72}
                className="object-contain"
              />
              <div>
                <div className="font-sora font-bold text-white text-lg leading-none">PT. DITAMA</div>
                <div className="font-inter text-orange-400 text-xs tracking-widest uppercase mt-0.5">
                  Cargo Solution
                </div>
              </div>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              Solusi pengiriman cargo express modern yang cepat, aman, dan terpercaya untuk seluruh Indonesia.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-500 text-sm hover:text-orange-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>+62 821-7798-1028</span>
              </a>
              <div className="flex items-start gap-3 text-gray-500 text-sm">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>info@ditamacargo.id</span>
              </div>
              <div className="flex items-start gap-3 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Bandar Udara Internasional Soekarno–Hatta,<br />
                  Komplek Terminal Kargo,<br />
                  Jl. Cengkareng Golf Club, RT.001/RW.010,<br />
                  Pajang, Kec. Benda, Kota Tangerang,<br />
                  Banten 15126
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link columns — each 1 col */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="min-w-0">
              <h4 className="font-semibold text-white mb-4 text-sm">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 text-sm hover:text-orange-400 transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Ditama Cargo Solution. All rights reserved.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-orange-glow"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
