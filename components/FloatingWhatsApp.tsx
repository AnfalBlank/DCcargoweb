"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Context-aware WhatsApp messages per page
function getWAMessage(pathname: string): string {
  if (pathname.startsWith("/services"))
    return "Halo DC Cargo, saya ingin mengetahui lebih lanjut tentang layanan pengiriman yang tersedia. Bisa bantu saya?";
  if (pathname.startsWith("/tracking"))
    return "Halo DC Cargo, saya ingin menanyakan status pengiriman / nomor resi saya. Bisa dibantu?";
  if (pathname.startsWith("/blog"))
    return "Halo DC Cargo, saya membaca artikel di website dan ingin bertanya lebih lanjut tentang pengiriman cargo.";
  if (pathname.startsWith("/about"))
    return "Halo DC Cargo, saya ingin mengetahui lebih lanjut tentang perusahaan dan layanan yang ditawarkan.";
  if (pathname.startsWith("/contact"))
    return "Halo DC Cargo, saya ingin berkonsultasi mengenai kebutuhan pengiriman saya.";
  // Home / default
  return "Halo DC Cargo, saya ingin menggunakan layanan pengiriman cargo. Bisa bantu saya mulai?";
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const waMessage = encodeURIComponent(getWAMessage(pathname));
  const waUrl = `https://wa.me/6282177981028?text=${waMessage}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white border border-green-200 rounded-2xl p-5 w-72 shadow-card-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-green-500 flex-shrink-0">
                <Image src="/cs.png" alt="CS DC Cargo" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div>
                <div className="text-slate-700 font-semibold text-sm">DC Cargo — CS</div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">Online sekarang</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message bubble */}
            <div className="bg-slate-50 rounded-xl p-3 mb-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                👋 Halo! Ada yang bisa kami bantu? Kami siap melayani kebutuhan pengiriman cargo Anda ke seluruh Indonesia.
              </p>
            </div>

            {/* CTA */}
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors duration-300"
            >
              <Image src="/cs.png" alt="WA" width={18} height={18} className="rounded-full" />
              Mulai Chat WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button — cs.png */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full overflow-hidden shadow-2xl whatsapp-float border-2 border-green-400/60 relative"
        style={{ boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)" }}
        aria-label="Chat WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-full h-full bg-green-600 flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-full h-full"
            >
              <Image
                src="/cs.png"
                alt="Chat CS DC Cargo"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
