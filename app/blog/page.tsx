import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Berita - Ditama Cargo Solution",
  description: "Tips logistik, panduan pengiriman, dan berita terkini dari Ditama Cargo Solution.",
};

const blogFAQs = [
  { q: "Bagaimana cara mengemas barang fragile agar aman dikirim?", a: "Gunakan bubble wrap minimal 3 lapis, isi ruang kosong dengan styrofoam atau kertas koran, gunakan double box untuk barang sangat rapuh, dan beri label 'FRAGILE' yang jelas. DC Solution juga menyediakan layanan pengemasan profesional.", waText: "Halo DC Solution, saya ingin kirim barang fragile. Apakah ada layanan pengemasan khusus dan berapa biayanya?" },
  { q: "Apa tips menghemat biaya pengiriman cargo untuk bisnis?", a: "Beberapa tips: (1) Konsolidasi pengiriman — kirim dalam satu batch besar lebih hemat. (2) Pilih moda yang tepat. (3) Daftar sebagai pelanggan reguler DC Solution untuk mendapat tarif khusus.", waText: "Halo DC Solution, saya punya bisnis dengan kebutuhan pengiriman rutin. Apakah ada tarif khusus untuk pelanggan reguler?" },
  { q: "Apa itu FCL dan LCL dalam pengiriman cargo laut?", a: "FCL (Full Container Load) berarti Anda menyewa satu kontainer penuh — cocok untuk volume besar. LCL (Less than Container Load) berarti barang Anda digabung dengan pengirim lain — lebih hemat untuk volume kecil.", waText: "Halo DC Solution, saya ingin kirim cargo laut. Bisa bantu hitung apakah lebih cocok FCL atau LCL untuk kebutuhan saya?" },
  { q: "Bagaimana cara menghitung berat volumetrik?", a: "Berat volumetrik = (Panjang × Lebar × Tinggi dalam cm) ÷ 5000 untuk udara, atau ÷ 4000 untuk darat. Biaya dihitung berdasarkan mana yang lebih besar antara berat aktual dan berat volumetrik.", waText: "Halo DC Solution, bisa bantu hitung berat volumetrik dan estimasi biaya pengiriman untuk paket saya?" },
  { q: "Apakah DC Solution bisa membantu pengiriman untuk bisnis online shop?", a: "Tentu! DC Solution adalah mitra ideal untuk online shop. Kami menawarkan pickup reguler, harga kompetitif untuk volume tinggi, tracking real-time, serta layanan COD.", waText: "Halo DC Solution, saya punya online shop dan butuh mitra pengiriman yang handal. Bisa info paket untuk online seller?" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        page="blog"
        badge="Blog & Berita"
        title="Insight"
        titleHighlight="Logistik"
        subtitle="Tips, panduan, dan berita terkini seputar dunia logistik dan pengiriman cargo untuk bisnis Anda."
      />
      <BlogSection />
      <FAQSection faqs={blogFAQs} title="FAQ Tips & Logistik" subtitle="Pertanyaan umum seputar tips pengiriman, pengemasan, dan logistik bisnis." />
      <Footer />
    </>
  );
}
