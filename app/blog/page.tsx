import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Berita - Ditama Cargo Solution",
  description: "Tips logistik, panduan pengiriman, dan berita terkini dari Ditama Cargo Solution.",
};

const blogFAQs = [
  {
    q: "Bagaimana cara mengemas barang fragile agar aman dikirim?",
    a: "Gunakan bubble wrap minimal 3 lapis, isi ruang kosong dengan styrofoam atau kertas koran, gunakan double box untuk barang sangat rapuh, dan beri label 'FRAGILE' yang jelas. DC Cargo juga menyediakan layanan pengemasan profesional — hubungi kami!",
    waText: "Halo DC Cargo, saya ingin kirim barang fragile. Apakah ada layanan pengemasan khusus dan berapa biayanya?",
  },
  {
    q: "Apa tips menghemat biaya pengiriman cargo untuk bisnis?",
    a: "Beberapa tips: (1) Konsolidasi pengiriman — kirim dalam satu batch besar lebih hemat dari banyak pengiriman kecil. (2) Pilih moda yang tepat — tidak selalu harus udara. (3) Daftar sebagai pelanggan reguler DC Cargo untuk mendapat tarif khusus. Hubungi kami untuk konsultasi!",
    waText: "Halo DC Cargo, saya punya bisnis dengan kebutuhan pengiriman rutin. Apakah ada tarif khusus untuk pelanggan reguler?",
  },
  {
    q: "Apa itu FCL dan LCL dalam pengiriman cargo laut?",
    a: "FCL (Full Container Load) berarti Anda menyewa satu kontainer penuh — cocok untuk volume besar. LCL (Less than Container Load) berarti barang Anda digabung dengan pengirim lain dalam satu kontainer — lebih hemat untuk volume kecil. DC Cargo melayani keduanya.",
    waText: "Halo DC Cargo, saya ingin kirim cargo laut. Bisa bantu hitung apakah lebih cocok FCL atau LCL untuk kebutuhan saya?",
  },
  {
    q: "Bagaimana cara menghitung berat volumetrik?",
    a: "Berat volumetrik = (Panjang × Lebar × Tinggi dalam cm) ÷ 5000 untuk udara, atau ÷ 4000 untuk darat. Biaya dihitung berdasarkan mana yang lebih besar antara berat aktual dan berat volumetrik. Hubungi kami untuk kalkulasi gratis!",
    waText: "Halo DC Cargo, bisa bantu hitung berat volumetrik dan estimasi biaya pengiriman untuk paket saya?",
  },
  {
    q: "Apakah DC Cargo bisa membantu pengiriman untuk bisnis online shop?",
    a: "Tentu! DC Cargo adalah mitra ideal untuk online shop. Kami menawarkan pickup reguler, harga kompetitif untuk volume tinggi, tracking real-time untuk Anda dan pelanggan, serta layanan COD. Hubungi kami untuk paket khusus online seller!",
    waText: "Halo DC Cargo, saya punya online shop dan butuh mitra pengiriman yang handal. Bisa info paket untuk online seller?",
  },
];

export default function BlogPage() {
  return (
    <>
      <div className="pt-24 pb-8 relative overflow-hidden animated-bg">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <span className="text-orange-400 text-sm font-medium">Blog & Berita</span>
          </div>
          <h1 className="font-sora font-black text-4xl sm:text-5xl text-white mb-3">
            Insight <span className="gradient-text">Logistik</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tips, panduan, dan berita terkini seputar dunia logistik dan pengiriman cargo.
          </p>
        </div>
      </div>
      <BlogSection />
      <FAQSection
        faqs={blogFAQs}
        title="FAQ Tips & Logistik"
        subtitle="Pertanyaan umum seputar tips pengiriman, pengemasan, dan logistik bisnis."
      />
      <Footer />
    </>
  );
}
