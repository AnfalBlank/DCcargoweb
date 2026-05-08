import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami - Ditama Cargo Solution",
  description: "Hubungi Ditama Cargo Solution untuk konsultasi pengiriman cargo. Tersedia via WhatsApp, email, dan telepon.",
};

const contactFAQs = [
  { q: "Berapa nomor WhatsApp DC Cargo yang bisa dihubungi?", a: "Anda bisa menghubungi CS DC Solution di +62 821-7798-1028 atau Admin di +62 852-1117-2494 via WhatsApp. Kami aktif Senin–Sabtu pukul 08.00–20.00 dan Minggu 09.00–17.00.", waText: "Halo DC Solution, saya ingin berkonsultasi tentang kebutuhan pengiriman saya." },
  { q: "Berapa lama waktu respons CS DC Solution?", a: "Untuk pesan WhatsApp, kami merespons dalam hitungan menit selama jam operasional. Di luar jam operasional, pesan Anda akan dibalas pada hari kerja berikutnya.", waText: "Halo DC Solution, saya butuh bantuan segera untuk pengiriman mendesak. Bisa dibantu?" },
  { q: "Apakah bisa konsultasi pengiriman secara gratis?", a: "Ya! Konsultasi pengiriman sepenuhnya gratis. Tim kami siap membantu Anda memilih layanan yang paling sesuai dengan kebutuhan dan anggaran Anda tanpa biaya apapun.", waText: "Halo DC Solution, saya ingin konsultasi gratis untuk kebutuhan pengiriman saya. Bisa dibantu?" },
  { q: "Bagaimana cara mendapatkan penawaran harga terbaik?", a: "Hubungi kami via WhatsApp dan informasikan: asal pengiriman, tujuan, jenis barang, berat/dimensi, dan frekuensi pengiriman. Kami akan memberikan penawaran terbaik, terutama untuk pengiriman reguler atau volume besar.", waText: "Halo DC Solution, saya ingin mendapatkan penawaran harga untuk pengiriman dari [asal] ke [tujuan], berat [berat] kg." },
  { q: "Apakah bisa melakukan pickup di luar jam operasional?", a: "Untuk kebutuhan pickup di luar jam operasional atau di hari Minggu, silakan hubungi kami terlebih dahulu minimal 1 hari sebelumnya. Kami akan berusaha mengakomodasi kebutuhan Anda.", waText: "Halo DC Solution, saya butuh pickup di luar jam operasional. Apakah bisa diatur?" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        page="contact"
        badge="Hubungi Kami"
        title="Siap"
        titleHighlight="Membantu Anda"
        subtitle="Tim kami siap membantu 24/7. Hubungi kami melalui berbagai saluran yang tersedia."
      />
      <ContactSection />
      <FAQSection faqs={contactFAQs} title="FAQ Hubungi Kami" subtitle="Pertanyaan umum seputar cara menghubungi dan berkonsultasi dengan tim DC Solution." />
      <Footer />
    </>
  );
}
