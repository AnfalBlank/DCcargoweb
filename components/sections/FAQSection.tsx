"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
  waText?: string; // custom WA message when user clicks CTA from this FAQ
}

const WA_NUMBER = "6282177981028";

function FAQCard({ item, index, isOpen, onToggle }: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const waMsg = encodeURIComponent(
    item.waText ?? `Halo DC Cargo, saya ingin bertanya: ${item.q}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`glass border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? "border-orange-500/40" : "border-white/8 hover:border-white/15"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className={`font-medium text-sm sm:text-base leading-snug transition-colors duration-300 ${isOpen ? "text-orange-400" : "text-white"}`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-orange-400" : "text-gray-500"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 border-t border-white/5">
              <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-4">{item.a}</p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all duration-300"
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
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 to-navy-950" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <HelpCircle className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">FAQ</span>
          </div>
          <h2 className="font-sora font-black text-3xl sm:text-4xl text-white mb-3">
            {title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">{title.split(" ").slice(-2).join(" ")}</span>
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-base max-w-xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQCard
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center glass neon-border rounded-2xl p-6"
        >
          <p className="text-gray-400 text-sm mb-4">
            Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu!
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo DC Cargo, saya punya pertanyaan yang belum terjawab di FAQ. Bisa dibantu?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi CS Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}
