"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { BookOpen, Search, ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["Semua", "Logistics Insight", "Cargo Tips", "Shipping Education", "Company News", "Supply Chain"];

const articles = [
  {
    id: 1,
    title: "Tips Mengemas Barang Fragile untuk Pengiriman Jarak Jauh",
    excerpt: "Panduan lengkap cara mengemas barang pecah belah agar tiba dengan selamat di tujuan. Mulai dari pemilihan bahan hingga teknik pengemasan yang benar.",
    category: "Cargo Tips",
    date: "5 Mei 2026",
    readTime: "5 menit",
    featured: true,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 2,
    title: "Perbedaan Cargo Darat, Laut, dan Udara: Mana yang Tepat untuk Bisnis Anda?",
    excerpt: "Memilih moda transportasi yang tepat bisa menghemat biaya dan waktu. Simak perbandingan lengkap ketiga moda pengiriman ini.",
    category: "Shipping Education",
    date: "3 Mei 2026",
    readTime: "7 menit",
    featured: false,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 3,
    title: "Ditama Cargo Raih Penghargaan Best Logistics Company 2024",
    excerpt: "Kami dengan bangga mengumumkan penghargaan bergengsi yang kami terima atas dedikasi dalam memberikan layanan logistik terbaik.",
    category: "Company News",
    date: "1 Mei 2026",
    readTime: "3 menit",
    featured: false,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "Tren Supply Chain 2026: Teknologi AI dalam Logistik Modern",
    excerpt: "Bagaimana kecerdasan buatan mengubah industri logistik dan apa yang perlu Anda ketahui untuk tetap kompetitif.",
    category: "Supply Chain",
    date: "28 Apr 2026",
    readTime: "8 menit",
    featured: false,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 5,
    title: "Cara Menghitung Biaya Pengiriman Cargo yang Efisien",
    excerpt: "Panduan praktis menghitung biaya pengiriman berdasarkan berat, volume, dan jarak untuk mengoptimalkan anggaran logistik bisnis Anda.",
    category: "Logistics Insight",
    date: "25 Apr 2026",
    readTime: "6 menit",
    featured: false,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: 6,
    title: "Strategi Optimasi Last-Mile Delivery untuk UMKM",
    excerpt: "Last-mile delivery adalah tantangan terbesar dalam logistik. Pelajari strategi efektif untuk UMKM mengoptimalkan pengiriman terakhir.",
    category: "Logistics Insight",
    date: "22 Apr 2026",
    readTime: "9 menit",
    featured: false,
    gradient: "from-red-500 to-orange-600",
  },
];

export default function BlogSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchCategory = activeCategory === "Semua" || article.category === activeCategory;
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured || activeCategory !== "Semua" || searchQuery);

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900/50" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all duration-300 text-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-glow"
                    : "glass border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/30"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && activeCategory === "Semua" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass neon-border rounded-2xl overflow-hidden mb-8 group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="grid md:grid-cols-2">
              <div className={`h-48 md:h-auto bg-gradient-to-br ${featuredArticle.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/20" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm">{featuredArticle.category}</span>
                </div>
                <h3 className="font-sora font-bold text-2xl text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{featuredArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-500 text-xs">
                    <span>{featuredArticle.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-orange-400 text-sm font-medium hover:gap-2 transition-all duration-300">
                    Baca <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass border border-white/8 rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-2 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/20" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-gray-600 text-xs">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada artikel yang ditemukan.
          </div>
        )}

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass neon-border px-8 py-3 rounded-xl text-orange-400 font-medium hover:bg-orange-500/10 transition-all duration-300"
          >
            Lihat Semua Artikel
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
