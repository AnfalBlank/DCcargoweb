"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin, Clock, ArrowRight } from "lucide-react";

const mockTrackingData = {
  "DC001234": {
    resi: "DC001234",
    status: "In Transit",
    origin: "Jakarta Pusat",
    destination: "Surabaya",
    estimatedArrival: "8 Mei 2026",
    weight: "5 kg",
    service: "Express Delivery",
    timeline: [
      { status: "Paket Diterima", location: "Jakarta Pusat", time: "06 Mei 2026, 09:00", done: true },
      { status: "Sortir di Hub Jakarta", location: "Hub Jakarta Timur", time: "06 Mei 2026, 14:30", done: true },
      { status: "Dalam Perjalanan", location: "Tol Trans Jawa", time: "07 Mei 2026, 08:00", done: true },
      { status: "Tiba di Hub Surabaya", location: "Hub Surabaya", time: "08 Mei 2026, 06:00", done: false },
      { status: "Proses Pengiriman", location: "Surabaya", time: "08 Mei 2026, 09:00", done: false },
      { status: "Terkirim", location: "Alamat Tujuan", time: "08 Mei 2026, 14:00", done: false },
    ],
  },
  "DC005678": {
    resi: "DC005678",
    status: "Delivered",
    origin: "Bandung",
    destination: "Yogyakarta",
    estimatedArrival: "5 Mei 2026",
    weight: "2 kg",
    service: "Same Day",
    timeline: [
      { status: "Paket Diterima", location: "Bandung", time: "05 Mei 2026, 07:00", done: true },
      { status: "Sortir di Hub Bandung", location: "Hub Bandung", time: "05 Mei 2026, 08:30", done: true },
      { status: "Dalam Perjalanan", location: "Jalur Bandung-Yogya", time: "05 Mei 2026, 10:00", done: true },
      { status: "Tiba di Hub Yogyakarta", location: "Hub Yogyakarta", time: "05 Mei 2026, 15:00", done: true },
      { status: "Proses Pengiriman", location: "Yogyakarta", time: "05 Mei 2026, 16:00", done: true },
      { status: "Terkirim", location: "Alamat Tujuan", time: "05 Mei 2026, 17:30", done: true },
    ],
  },
};

const statusColors: Record<string, string> = {
  "In Transit": "text-brand-red bg-red-50 border-red-200",
  "Delivered": "text-green-600 bg-green-50 border-green-200",
  "Processing": "text-brand-blue bg-blue-50 border-blue-200",
};

export default function TrackingSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [resiInput, setResiInput] = useState("");
  const [trackingResult, setTrackingResult] = useState<typeof mockTrackingData["DC001234"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async () => {
    if (!resiInput.trim()) return;
    setIsLoading(true);
    setNotFound(false);
    setTrackingResult(null);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    const result = mockTrackingData[resiInput.toUpperCase() as keyof typeof mockTrackingData];
    if (result) {
      setTrackingResult(result);
    } else {
      setNotFound(true);
    }
    setIsLoading(false);
  };

  return (
    <section className="py-12 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Search Box */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm"
        >
          <p className="text-slate-500 text-sm mb-4 text-center">
            Demo — Coba resi: <button onClick={() => setResiInput("DC001234")} className="text-brand-red hover:underline font-medium">DC001234</button> atau <button onClick={() => setResiInput("DC005678")} className="text-brand-red hover:underline font-medium">DC005678</button>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={resiInput}
                onChange={(e) => setResiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="Masukkan nomor resi (contoh: DC001234)"
                className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTrack}
              disabled={isLoading}
              className="btn-primary px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Melacak...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Lacak Paket
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Not Found */}
        <AnimatePresence>
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-red-200 rounded-2xl p-6 text-center mb-8"
            >
              <div className="text-brand-red text-lg font-semibold mb-2">Nomor Resi Tidak Ditemukan</div>
              <p className="text-slate-600 text-sm">Pastikan nomor resi yang Anda masukkan sudah benar.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tracking Result */}
        <AnimatePresence>
          {trackingResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="text-slate-500 text-sm mb-1">Nomor Resi</div>
                    <div className="font-sora font-bold text-2xl text-slate-900">{trackingResult.resi}</div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusColors[trackingResult.status] || "text-slate-600 bg-slate-50 border-slate-200"}`}>
                    {trackingResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Asal", value: trackingResult.origin },
                    { label: "Tujuan", value: trackingResult.destination },
                    { label: "Estimasi Tiba", value: trackingResult.estimatedArrival },
                    { label: "Layanan", value: trackingResult.service },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="text-slate-500 text-xs mb-1">{item.label}</div>
                      <div className="text-slate-900 text-sm font-semibold">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-sora font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-red" />
                  Riwayat Pengiriman
                </h3>
                <div className="space-y-0">
                  {trackingResult.timeline.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 relative"
                    >
                      {/* Line */}
                      {i < trackingResult.timeline.length - 1 && (
                        <div className={`absolute left-[18px] top-8 w-0.5 h-full ${step.done ? "bg-gradient-to-b from-brand-red to-red-300" : "bg-slate-200"}`} />
                      )}

                      {/* Dot */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        step.done
                          ? "bg-gradient-to-br from-brand-red to-red-600 shadow-lg"
                          : "bg-slate-100 border-2 border-slate-200"
                      }`}>
                        {step.done ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-6 ${i === trackingResult.timeline.length - 1 ? "pb-0" : ""}`}>
                        <div className={`font-semibold text-sm ${step.done ? "text-slate-900" : "text-slate-500"}`}>
                          {step.status}
                        </div>
                        <div className={`text-xs mt-0.5 ${step.done ? "text-slate-600" : "text-slate-400"}`}>
                          {step.location}
                        </div>
                        <div className={`text-xs mt-0.5 ${step.done ? "text-brand-red" : "text-slate-400"}`}>
                          {step.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!trackingResult && !notFound && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-brand-red" />
            </div>
            <p className="text-slate-500">Masukkan nomor resi untuk melacak paket Anda</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
