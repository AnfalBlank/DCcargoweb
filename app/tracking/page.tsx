import TrackingSection from "@/components/sections/TrackingSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracking Paket - Ditama Cargo Solution",
  description: "Lacak paket Anda secara real-time dengan sistem tracking canggih Ditama Cargo Solution.",
};

const trackingFAQs = [
  { q: "Bagaimana cara melacak paket saya?", a: "Masukkan nomor resi yang Anda terima saat pengiriman ke kolom tracking di atas, lalu klik 'Lacak Paket'. Anda akan melihat status terkini dan riwayat perjalanan paket secara real-time.", waText: "Halo DC Cargo, saya ingin melacak paket dengan nomor resi [nomor resi]. Bisa bantu cek statusnya?" },
  { q: "Kapan saya mendapatkan nomor resi?", a: "Nomor resi akan dikirimkan via WhatsApp setelah paket Anda berhasil diproses dan masuk ke sistem kami, biasanya dalam 1-2 jam setelah penjemputan atau drop-off.", waText: "Halo DC Cargo, saya belum menerima nomor resi untuk pengiriman saya. Bisa dibantu?" },
  { q: "Status paket saya tidak berubah, apa yang harus dilakukan?", a: "Jika status tidak berubah lebih dari 24 jam, kemungkinan ada kendala di jalur pengiriman. Segera hubungi CS kami via WhatsApp dengan menyertakan nomor resi untuk pengecekan lebih lanjut.", waText: "Halo DC Cargo, status paket saya dengan resi [nomor resi] tidak berubah sejak [tanggal]. Mohon bantu cek." },
  { q: "Apakah saya bisa mendapat notifikasi otomatis update status?", a: "Ya! Kami mengirimkan update status otomatis via WhatsApp ke nomor yang terdaftar saat pengiriman. Pastikan nomor WhatsApp Anda aktif dan terdaftar dengan benar saat melakukan pemesanan.", waText: "Halo DC Cargo, saya ingin mengaktifkan notifikasi WhatsApp untuk tracking paket saya. Bagaimana caranya?" },
  { q: "Paket saya sudah berstatus 'Terkirim' tapi belum diterima, bagaimana?", a: "Segera hubungi CS kami via WhatsApp dengan nomor resi Anda. Kami akan melakukan investigasi dan koordinasi dengan kurir untuk memastikan paket sampai ke tangan yang tepat.", waText: "Halo DC Cargo, paket saya dengan resi [nomor resi] berstatus terkirim tapi belum saya terima. Mohon bantu investigasi." },
];

export default function TrackingPage() {
  return (
    <>
      <PageHero
        page="tracking"
        badge="Live Tracking"
        title="Lacak Paket"
        titleHighlight="Real-time"
        subtitle="Pantau perjalanan paket Anda kapan saja dan di mana saja dengan sistem tracking canggih kami."
      />
      <TrackingSection />
      <FAQSection faqs={trackingFAQs} title="FAQ Tracking Paket" subtitle="Pertanyaan umum seputar pelacakan dan status pengiriman paket Anda." />
      <Footer />
    </>
  );
}
