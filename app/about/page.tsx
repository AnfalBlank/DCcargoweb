import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - Ditama Cargo Solution",
  description: "Kenali lebih dekat Ditama Cargo Solution, perusahaan logistik cargo express terpercaya di Indonesia.",
};

const aboutFAQs = [
  { q: "Di mana lokasi kantor DC Solution?", a: "Kantor kami berlokasi di Bandar Udara Internasional Soekarno–Hatta, Komplek Terminal Kargo, Jl. Cengkareng Golf Club, RT.001/RW.010, Pajang, Kec. Benda, Kota Tangerang, Banten 15126.", waText: "Halo DC Solution, saya ingin mengunjungi kantor Anda. Bisa info jam operasional dan petunjuk arahnya?" },
  { q: "Sudah berapa lama DC Solution beroperasi?", a: "DC Solution telah beroperasi sejak 2018 dan terus berkembang hingga kini melayani 500+ kota di seluruh Indonesia dengan lebih dari 10.000 paket terkirim dan tingkat kepuasan pelanggan 98%.", waText: "Halo DC Solution, saya ingin tahu lebih lanjut tentang pengalaman dan track record perusahaan Anda." },
  { q: "Apakah DC Solution memiliki izin resmi dan sertifikasi?", a: "Ya, DC Solution beroperasi dengan izin usaha resmi dan memiliki sertifikasi yang diperlukan untuk layanan pengiriman cargo. Kami juga bermitra dengan maskapai dan operator logistik terpercaya di Indonesia.", waText: "Halo DC Solution, saya ingin mengetahui legalitas dan sertifikasi perusahaan Anda sebelum menggunakan layanan." },
  { q: "Apakah DC Solution membuka peluang kemitraan atau keagenan?", a: "Ya! Kami membuka peluang kemitraan untuk agen pengiriman di berbagai kota. Dengan menjadi mitra DC Solution, Anda mendapatkan komisi kompetitif, dukungan sistem, dan brand yang sudah terpercaya.", waText: "Halo DC Solution, saya tertarik menjadi mitra/agen DC Cargo di kota saya. Bisa info syarat dan ketentuannya?" },
  { q: "Bagaimana cara menghubungi DC Cargo untuk kerjasama bisnis?", a: "Untuk kerjasama bisnis, kemitraan, atau kontrak korporat, silakan hubungi kami via WhatsApp +62 852-1117-2494 atau email info@ditamacargo.id. Tim business development kami akan merespons dalam 1x24 jam.", waText: "Halo DC Solution, saya ingin mendiskusikan peluang kerjasama bisnis dengan perusahaan Anda." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        page="about"
        badge="Tentang Kami"
        title="Siapa"
        titleHighlight="Ditama Cargo?"
        subtitle="Mitra logistik terpercaya untuk bisnis dan personal di seluruh Indonesia sejak 2018."
      />
      <AboutSection />
      <FAQSection faqs={aboutFAQs} title="FAQ Tentang Perusahaan" subtitle="Pertanyaan umum seputar DC Solution sebagai mitra logistik Anda." />
      <CTABanner />
      <Footer />
    </>
  );
}
