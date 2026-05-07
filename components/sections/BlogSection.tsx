"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { BookOpen, Search, ArrowRight, Clock, Tag, TrendingUp, Package, Truck, Globe, Star } from "lucide-react";

const categories = ["Semua", "Cargo Tips", "Logistics Insight", "Shipping Education", "Company News", "Supply Chain"];

const articles = [
  {
    id: 1,
    title: "Tips Mengemas Barang Fragile agar Aman Sampai Tujuan",
    excerpt: "Barang pecah belah butuh perlakuan khusus. Pelajari teknik pengemasan profesional mulai dari pemilihan bubble wrap, double box, hingga cara memberi label FRAGILE yang benar agar paket tiba sempurna.",
    category: "Cargo Tips",
    date: "5 Mei 2026",
    readTime: "5 menit",
    featured: true,
    gradient: "from-red-600 to-red-700",
    icon: Package,
    tags: ["Pengemasan", "Fragile", "Tips"],
  },
  {
    id: 2,
    title: "Cargo Darat, Laut, atau Udara? Panduan Memilih yang Tepat",
    excerpt: "Setiap moda pengiriman punya kelebihan dan kekurangan. Artikel ini membantu Anda memilih antara cargo darat, laut, dan udara berdasarkan budget, urgensi, dan jenis barang yang dikirim.",
    category: "Shipping Education",
    date: "3 Mei 2026",
    readTime: "7 menit",
    featured: false,
    gradient: "from-blue-500 to-purple-600",
    icon: Truck,
    tags: ["Perbandingan", "Moda Pengiriman"],
  },
  {
    id: 3,
    title: "Cara Menghitung Berat Volumetrik dan Biaya Pengiriman Cargo",
    excerpt: "Banyak pengirim kaget saat tagihan lebih mahal dari perkiraan. Pahami cara menghitung berat volumetrik, perbedaannya dengan berat aktual, dan strategi menghemat biaya pengiriman untuk bisnis Anda.",
    category: "Logistics Insight",
    date: "28 Apr 2026",
    readTime: "6 menit",
    featured: false,
    gradient: "from-yellow-500 to-red-600",
    icon: TrendingUp,
    tags: ["Biaya", "Kalkulasi", "Hemat"],
  },
  {
    id: 4,
    title: "Strategi Pengiriman Efisien untuk Online Shop dan UMKM",
    excerpt: "Pengiriman adalah ujung tombak kepuasan pelanggan online shop. Temukan strategi memilih mitra logistik, mengatur jadwal pickup, dan menekan biaya ongkir tanpa mengorbankan kecepatan.",
    category: "Logistics Insight",
    date: "22 Apr 2026",
    readTime: "8 menit",
    featured: false,
    gradient: "from-green-500 to-teal-600",
    icon: Star,
    tags: ["UMKM", "Online Shop", "Efisiensi"],
  },
  {
    id: 5,
    title: "Tren Logistik 2026: AI, Drone, dan Masa Depan Pengiriman Cargo",
    excerpt: "Industri logistik sedang bertransformasi besar. Dari kecerdasan buatan untuk optimasi rute, drone delivery, hingga sistem tracking berbasis IoT — inilah tren yang akan mengubah cara kita mengirim barang.",
    category: "Supply Chain",
    date: "15 Apr 2026",
    readTime: "9 menit",
    featured: false,
    gradient: "from-purple-500 to-pink-600",
    icon: Globe,
    tags: ["Teknologi", "AI", "Inovasi"],
  },
  {
    id: 6,
    title: "Panduan Lengkap Pengiriman Cargo Antar Pulau via Laut",
    excerpt: "Pengiriman antar pulau via laut adalah solusi paling ekonomis untuk volume besar. Pelajari prosedur, dokumen yang diperlukan, estimasi waktu, dan tips memilih jasa cargo laut yang terpercaya.",
    category: "Shipping Education",
    date: "8 Apr 2026",
    readTime: "10 menit",
    featured: false,
    gradient: "from-cyan-500 to-blue-600",
    icon: Truck,
    tags: ["Cargo Laut", "Antar Pulau", "Panduan"],
  },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      key={article.id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass border border-white/8 rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-2 hover:border-red-600/30 transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div className={`h-44 bg-gradient-to-br ${article.gradient} relative overflow-hidden flex-shrink-0`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <article.icon className="w-16 h-16 text-white/20" />
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-[10px] font-medium">
            {article.category}
          </span>
        </div>
        {/* Read time */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
          <Clock className="w-3 h-3 text-white/70" />
          <span className="text-white/70 text-[10px]">{article.readTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/10 text-red-500 border border-red-600/20">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-sora font-bold text-white text-sm leading-snug mb-2 group-hover:text-red-500 transition-colors duration-300 line-clamp-2 flex-1">
          {article.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-gray-600 text-xs">{article.date}</span>
          <span className="flex items-center gap-1 text-red-500 text-xs font-medium group-hover:gap-2 transition-all duration-300">
            Baca <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogSection() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuredRef, featuredInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchCategory = activeCategory === "Semua" || article.category === activeCategory;
    const matchSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredArticle = articles[0];
  const gridArticles = filteredArticles.filter(
    (a) => !(a.featured && activeCategory === "Semua" && !searchQuery)
  );

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900/50" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Search & Filter */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 transition-all duration-300 text-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-glow"
                    : "glass border border-white/10 text-gray-400 hover:text-white hover:border-red-600/30"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        {activeCategory === "Semua" && !searchQuery && (
          <motion.div
            ref={featuredRef}
            initial={{ opacity: 0, y: 30 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass neon-border rounded-2xl overflow-hidden mb-8 group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="grid md:grid-cols-2">
              <div className={`h-52 md:h-auto bg-gradient-to-br ${featuredArticle.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <featuredArticle.icon className="w-28 h-28 text-white/15" />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-red-600 rounded-full text-white text-xs font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-xs">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featuredArticle.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/10 text-red-500 border border-red-600/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-sora font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">{featuredArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <span>{featuredArticle.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-red-500 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    Baca <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {gridArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
          </div>
        )}

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass neon-border px-8 py-3 rounded-xl text-red-500 font-medium hover:bg-red-600/10 transition-all duration-300 text-sm"
          >
            Lihat Semua Artikel
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
