import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami - Ditama Cargo Solution",
  description: "Hubungi Ditama Cargo Solution untuk konsultasi pengiriman cargo. Tersedia via WhatsApp, email, dan telepon.",
};

const contactFAQs = [
  {
    q: "Berapa nomor WhatsApp DC Cargo yang bisa dihubungi?",
    a: "Anda bisa menghubungi CS DC Cargo di +62 821-7798-1028 via WhatsApp atau telepon. Kami aktif Senin–Sabtu pukul 08.00–20.00 dan Minggu 09.00–17.00.",
    waText: "Halo DC Cargo, saya ingin berkonsultasi tentang kebutuhan pengiriman saya.",
  },
  {
    q: "Berapa lama waktu respons CS DC Cargo?",
    a: "Untuk pesan WhatsApp, kami merespons dalam hitungan menit selama jam operasional. Di luar jam operasional, pesan Anda akan dibalas pada hari kerja berikutnya. Untuk urusan mendesak, kirim pesan dan kami akan prioritaskan.",
    waText: "Halo DC Cargo, saya butuh bantuan segera untuk pengiriman mendesak. Bisa dibantu?",
  },
  {
    q: "Apakah bisa konsultasi pengiriman secara gratis?",
    a: "Ya! Konsultasi pengiriman sepenuhnya gratis. Tim kami siap membantu Anda memilih layanan yang paling sesuai dengan kebutuhan dan anggaran Anda tanpa biaya apapun.",
    waText: "Halo DC Cargo, saya ingin konsultasi gratis untuk kebutuhan pengiriman saya. Bisa dibantu?",
  },
  {
    q: "Bagaimana cara mendapatkan penawaran harga terbaik?",
    a: "Hubungi kami via WhatsApp dan informasikan: asal pengiriman, tujuan, jenis barang, berat/dimensi, dan frekuensi pengiriman. Kami akan memberikan penawaran terbaik, terutama untuk pengiriman reguler atau volume besar.",
    waText: "Halo DC Cargo, saya ingin mendapatkan penawaran harga untuk pengiriman dari [asal] ke [tujuan], berat [berat] kg.",
  },
  {
    q: "Apakah bisa melakukan pickup di luar jam operasional?",
    a: "Untuk kebutuhan pickup di luar jam operasional atau di hari Minggu, silakan hubungi kami terlebih dahulu minimal 1 hari sebelumnya. Kami akan berusaha mengakomodasi kebutuhan Anda dengan biaya tambahan yang wajar.",
    waText: "Halo DC Cargo, saya butuh pickup di luar jam operasional. Apakah bisa diatur?",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="pt-24 pb-10 relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">Hubungi Kami</span>
          </div>
          <h1 className="font-sora font-black text-4xl sm:text-5xl text-white mb-3">
            Siap <span className="gradient-text">Membantu Anda</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tim kami siap membantu 24/7. Hubungi kami melalui berbagai saluran yang tersedia.
          </p>
        </div>
      </div>
      <ContactSection />
      <FAQSection
        faqs={contactFAQs}
        title="FAQ Hubungi Kami"
        subtitle="Pertanyaan umum seputar cara menghubungi dan berkonsultasi dengan tim DC Cargo."
      />
      <Footer />
    </>
  );
}
