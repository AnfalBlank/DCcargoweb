import ServicesSection from "@/components/sections/ServicesSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan - Ditama Cargo Solution",
  description: "Layanan pengiriman cargo lengkap: Cargo Darat, Laut, Udara, Same Day, Express, Warehouse, Door to Door.",
};

const servicesFAQs = [
  { q: "Apa perbedaan Cargo Darat, Laut, dan Udara?", a: "Cargo Darat cocok untuk pengiriman antar kota di Jawa/Sumatera dengan harga terjangkau (1-5 hari). Cargo Laut ideal untuk volume besar antar pulau (3-14 hari). Cargo Udara paling cepat untuk seluruh Indonesia (1-2 hari) namun dengan tarif lebih tinggi.", waText: "Halo DC Solution, saya ingin konsultasi memilih antara Cargo Darat, Laut, atau Udara untuk kebutuhan saya. Bisa bantu?" },
  { q: "Apakah tersedia layanan Same Day Delivery?", a: "Ya! Same Day Delivery tersedia untuk area Jabodetabek dan beberapa kota besar. Paket dijemput dan diantar di hari yang sama. Hubungi kami sebelum pukul 10.00 untuk memastikan ketersediaan.", waText: "Halo DC Solution, saya butuh Same Day Delivery dari [asal] ke [tujuan]. Apakah bisa dan berapa biayanya?" },
  { q: "Bagaimana layanan Door to Door bekerja?", a: "Tim kami akan menjemput paket langsung dari lokasi Anda dan mengantarkan ke alamat tujuan tanpa Anda perlu ke kantor pengiriman. Cukup hubungi kami, tentukan jadwal penjemputan, dan kami yang urus sisanya.", waText: "Halo DC Solution, saya ingin menggunakan layanan Door to Door. Bisa dijemput dari [alamat saya]?" },
  { q: "Apakah DC Solution menyediakan layanan Warehouse?", a: "Ya! Kami memiliki fasilitas gudang modern di Jakarta, Surabaya, dan Medan dengan sistem manajemen inventori digital, keamanan 24/7, dan kondisi penyimpanan yang terjaga.", waText: "Halo DC Solution, saya tertarik dengan layanan Warehouse. Bisa info lebih lanjut tentang kapasitas dan harganya?" },
  { q: "Berapa berat minimum dan maksimum yang bisa dikirim?", a: "DC Solution melayani pengiriman dari 1 kg hingga puluhan ton. Untuk pengiriman volume besar (FCL/LCL), kami menyediakan solusi khusus dengan harga yang lebih kompetitif.", waText: "Halo DC Solution, saya ingin kirim barang seberat [berat] kg dari [asal] ke [tujuan]. Berapa biayanya?" },
  { q: "Barang apa saja yang bisa dikirim melalui DC Solution?", a: "Kami melayani pengiriman berbagai jenis barang: elektronik, fashion, makanan (non-perishable), furniture, spare part, dokumen, dan lainnya. Untuk barang khusus (B3, barang berbahaya), hubungi kami terlebih dahulu.", waText: "Halo DC Solution, saya ingin kirim [jenis barang]. Apakah bisa dan ada persyaratan khusus?" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        page="services"
        badge="Layanan Kami"
        title="Solusi Pengiriman"
        titleHighlight="Lengkap"
        subtitle="Dari cargo darat hingga udara, kami siap melayani semua kebutuhan logistik Anda ke seluruh Indonesia."
      />
      <ServicesSection />
      <FAQSection faqs={servicesFAQs} title="FAQ Layanan Pengiriman" subtitle="Pertanyaan umum seputar layanan cargo dan pengiriman DC Solution." />
      <CTABanner />
      <Footer />
    </>
  );
}
