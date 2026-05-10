import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StatsSection from "@/components/sections/StatsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/Footer";

const homeFAQs = [
  {
    q: "Apa itu DC Solution dan layanan apa yang ditawarkan?",
    a: "DC Solution (Ditama Cargo) adalah perusahaan jasa pengiriman cargo yang melayani pengiriman darat, laut, dan udara ke seluruh Indonesia. Kami juga menyediakan layanan Same Day Delivery, Warehouse, dan Door to Door.",
    waText: "Halo DC Solution, saya ingin tahu lebih lanjut tentang layanan yang tersedia. Bisa jelaskan?",
  },
  {
    q: "Bagaimana cara mulai menggunakan layanan DC Solution?",
    a: "Sangat mudah! Hubungi kami via WhatsApp di +62 852-1117-2494, ceritakan kebutuhan pengiriman Anda (asal, tujuan, jenis barang, berat), dan tim kami akan memberikan penawaran terbaik dalam hitungan menit.",
    waText: "Halo DC Solution, saya ingin mulai menggunakan layanan pengiriman. Bagaimana caranya?",
  },
  {
    q: "Apakah DC Solution melayani pengiriman ke seluruh Indonesia?",
    a: "Ya! DC Solution menjangkau 500+ kota di seluruh Indonesia dari Sabang sampai Merauke, baik via jalur darat, laut, maupun udara. Kami beroperasi dari Terminal Kargo Bandara Soekarno-Hatta, Tangerang.",
    waText: "Halo DC Solution, apakah bisa kirim ke [kota tujuan saya]? Berapa estimasi biaya dan waktu pengirimannya?",
  },
  {
    q: "Berapa lama estimasi pengiriman?",
    a: "Tergantung layanan yang dipilih: Same Day (hari yang sama, area tertentu), Express 1-3 hari kerja, Cargo Darat 1-5 hari kerja, Cargo Laut 3-14 hari kerja, Cargo Udara 1-2 hari kerja.",
    waText: "Halo DC Solution, saya ingin tahu estimasi pengiriman dari [kota asal] ke [kota tujuan]. Layanan apa yang paling cocok?",
  },
  {
    q: "Apakah ada asuransi untuk barang yang dikirim?",
    a: "Ya, kami menyediakan asuransi pengiriman untuk semua layanan. Barang Anda terlindungi dari risiko kerusakan atau kehilangan selama proses pengiriman. Hubungi kami untuk detail coverage.",
    waText: "Halo DC Solution, saya ingin tahu tentang asuransi pengiriman untuk barang saya. Bisa dijelaskan?",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <AdvantagesSection />
      <TestimonialsSection />
      <FAQSection
        faqs={homeFAQs}
        title="Pertanyaan yang Sering Ditanyakan"
        subtitle="Temukan jawaban atas pertanyaan umum seputar layanan DC Solution."
      />
      <CTABanner />
      <Footer />
    </>
  );
}
