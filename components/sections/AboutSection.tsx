"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Eye, Heart, Award, Users, TrendingUp } from "lucide-react";

const values = [
  { icon: Target, title: "Ketepatan", desc: "Setiap pengiriman dilakukan dengan presisi dan ketepatan waktu yang terukur." },
  { icon: Heart, title: "Kepercayaan", desc: "Membangun kepercayaan pelanggan melalui konsistensi dan transparansi." },
  { icon: TrendingUp, title: "Inovasi", desc: "Terus berinovasi dengan teknologi terkini untuk layanan yang lebih baik." },
  { icon: Users, title: "Kolaborasi", desc: "Bekerja sama dengan mitra terpercaya untuk jangkauan yang lebih luas." },
];

const timeline = [
  { year: "2018", title: "Berdiri", desc: "Ditama Cargo Solution didirikan dengan visi menjadi mitra logistik terpercaya." },
  { year: "2019", title: "Ekspansi", desc: "Membuka cabang di Surabaya dan Medan, memperluas jangkauan layanan." },
  { year: "2021", title: "Digitalisasi", desc: "Meluncurkan sistem tracking real-time dan platform digital terintegrasi." },
  { year: "2023", title: "10K+ Paket", desc: "Mencapai milestone 10.000+ paket terkirim dengan kepuasan pelanggan 98%." },
  { year: "2024", title: "Ekspansi Nasional", desc: "Menjangkau 500+ kota di seluruh Indonesia dengan armada modern." },
  { year: "2026", title: "Masa Depan", desc: "Terus berkembang dengan teknologi AI dan drone delivery untuk masa depan." },
];

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900/50" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Tentang Kami</span>
          </div>
          <h2 className="font-sora font-black text-4xl sm:text-5xl text-white mb-4">
            Siapa{" "}
            <span className="gradient-text">Ditama Cargo?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Ditama Cargo Solution hadir sebagai solusi pengiriman cargo express yang cepat, aman, dan terpercaya untuk kebutuhan bisnis maupun personal di seluruh Indonesia.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: Eye,
              title: "Visi",
              content: "Menjadi perusahaan logistik cargo express terdepan di Indonesia yang dikenal atas kecepatan, keamanan, dan inovasi teknologi dalam setiap layanan pengiriman.",
              color: "from-orange-500 to-orange-700",
            },
            {
              icon: Target,
              title: "Misi",
              content: "Memberikan solusi logistik yang cepat, aman, dan terpercaya dengan memanfaatkan teknologi modern, membangun jaringan distribusi yang kuat, dan mengutamakan kepuasan pelanggan di atas segalanya.",
              color: "from-red-500 to-red-700",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="glass neon-border rounded-2xl p-8"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-sora font-bold text-2xl text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="font-sora font-bold text-2xl text-white text-center mb-8">
            Nilai-Nilai <span className="gradient-text">Perusahaan</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="glass rounded-2xl p-5 text-center group hover:border-orange-500/30 transition-all duration-300 border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-orange-400" />
                </div>
                <div className="font-semibold text-white mb-2">{value.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{value.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            className="font-sora font-bold text-2xl text-white text-center mb-12"
          >
            Perjalanan <span className="gradient-text">Kami</span>
          </motion.h3>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass neon-border rounded-2xl p-5 inline-block">
                      <div className="gradient-text font-sora font-black text-2xl mb-1">{item.year}</div>
                      <div className="text-white font-semibold mb-1">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 items-center justify-center flex-shrink-0 shadow-orange-glow z-10">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
