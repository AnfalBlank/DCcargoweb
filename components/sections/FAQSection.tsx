"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
  waText?: string;
}

const WA = "6282177981028";

function FAQCard({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  const waMsg = encodeURIComponent(item.waText ?? `Halo DC Solution, saya ingin bertanya: ${item.q}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-red-200 shadow-card" : "border-surface-border hover:border-slate-300"
      }`}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className={`font-medium text-sm sm:text-base leading-snug transition-colors duration-200 ${isOpen ? "text-brand-red" : "text-brand-navy"}`}>
          {item.q}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${isOpen ? "text-brand-red" : "text-slate-400"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 border-t border-surface-border">
              <p className="text-slate-500 text-sm leading-relaxed mt-4 mb-4">{item.a}</p>
              <a
                href={`https://wa.me/${WA}?text=${waMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium hover:bg-green-100 transition-all duration-200"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Tanya via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({ faqs, title = "Pertanyaan yang Sering Ditanyakan", subtitle }: FAQSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-surface-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-semibold tracking-wide uppercase mb-4 border border-red-100">
            FAQ
          </span>
          <h2 className="font-sora font-black text-3xl sm:text-4xl text-brand-navy mb-3">
            {title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">{title.split(" ").slice(-2).join(" ")}</span>
          </h2>
          {subtitle && <p className="text-slate-500 text-base max-w-xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQCard key={i} item={item} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center bg-white rounded-2xl p-6 border border-surface-border shadow-card"
        >
          <p className="text-slate-500 text-sm mb-4">Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu!</p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent("Halo DC Solution, saya punya pertanyaan yang belum terjawab di FAQ. Bisa dibantu?")}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi CS Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}
