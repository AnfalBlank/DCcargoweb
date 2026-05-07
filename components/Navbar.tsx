"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Tracking", href: "/tracking" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Hero pages have dark bg — navbar text should be white until scrolled
  const isHeroPage = pathname === "/";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(15,23,42,0.08)] py-2"
          : isHeroPage
          ? "bg-transparent py-4"
          : "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(15,23,42,0.06)] py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="DC Solution" width={52} height={52} className="object-contain" priority />
              {/* Desktop: DITAMA / Cargo Solution */}
              <div className="hidden sm:block">
                <div className={`font-sora font-black text-base leading-none transition-colors duration-300 ${
                  scrolled || !isHeroPage ? "text-brand-navy" : "text-white"
                }`}>DITAMA</div>
                <div className={`font-sora font-bold text-sm leading-none mt-0.5 transition-colors duration-300 ${
                  scrolled || !isHeroPage ? "text-brand-red" : "text-red-300"
                }`}>
                  CARGO SOLUTION
                </div>
              </div>
              {/* Mobile: PT. DITAMA CARGO LOGISTIK */}
              <div className="sm:hidden">
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className={`font-sora font-black text-sm leading-tight transition-colors duration-300 ${
                    scrolled || !isHeroPage ? "text-brand-navy" : "text-white"
                  }`}>
                    PT. DITAMA
                  </div>
                  <div className={`font-sora font-bold text-[10px] leading-tight transition-colors duration-300 ${
                    scrolled || !isHeroPage ? "text-brand-red" : "text-red-300"
                  }`}>
                    CARGO LOGISTIK
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    pathname === link.href
                      ? "text-brand-red bg-red-50"
                      : scrolled || !isHeroPage
                      ? "text-slate-600 hover:text-brand-navy hover:bg-slate-50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/tracking">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`block px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 cursor-pointer ${
                  scrolled || !isHeroPage
                    ? "text-brand-red border-red-200 hover:bg-red-50"
                    : "text-white border-white/30 hover:bg-white/10"
                }`}
              >
                Track Paket
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="block btn-primary px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer"
              >
                Kirim Sekarang
              </motion.span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHeroPage ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link href={link.href}>
                    <span className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      pathname === link.href ? "text-brand-red bg-red-50" : "text-slate-600 hover:text-brand-navy hover:bg-slate-50"
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 pb-1">
                <Link href="/contact">
                  <span className="block btn-primary w-full py-3 text-sm font-semibold rounded-xl text-center cursor-pointer">
                    Kirim Sekarang
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
