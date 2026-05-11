import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { initDB, db } from "@/lib/db";

const SEED_BLOGS = [
  { title: "Tips Mengemas Barang Fragile agar Aman Sampai Tujuan", excerpt: "Barang pecah belah butuh perlakuan khusus. Pelajari teknik pengemasan profesional mulai dari pemilihan bubble wrap, double box, hingga cara memberi label FRAGILE yang benar agar paket tiba sempurna.", content: "", category: "Cargo Tips", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", tags: '["Pengemasan","Fragile","Tips"]', date: "5 Mei 2026", read_time: "5 menit", featured: 1, published: 1 },
  { title: "Cargo Darat, Laut, atau Udara? Panduan Memilih yang Tepat", excerpt: "Setiap moda pengiriman punya kelebihan dan kekurangan. Artikel ini membantu Anda memilih antara cargo darat, laut, dan udara berdasarkan budget, urgensi, dan jenis barang yang dikirim.", content: "", category: "Shipping Education", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", tags: '["Perbandingan","Moda Pengiriman"]', date: "3 Mei 2026", read_time: "7 menit", featured: 0, published: 1 },
  { title: "Cara Menghitung Berat Volumetrik dan Biaya Pengiriman Cargo", excerpt: "Banyak pengirim kaget saat tagihan lebih mahal dari perkiraan. Pahami cara menghitung berat volumetrik, perbedaannya dengan berat aktual, dan strategi menghemat biaya pengiriman untuk bisnis Anda.", content: "", category: "Logistics Insight", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", tags: '["Biaya","Kalkulasi","Hemat"]', date: "28 Apr 2026", read_time: "6 menit", featured: 0, published: 1 },
  { title: "Strategi Pengiriman Efisien untuk Online Shop dan UMKM", excerpt: "Pengiriman adalah ujung tombak kepuasan pelanggan online shop. Temukan strategi memilih mitra logistik, mengatur jadwal pickup, dan menekan biaya ongkir tanpa mengorbankan kecepatan.", content: "", category: "Logistics Insight", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80", tags: '["UMKM","Online Shop","Efisiensi"]', date: "22 Apr 2026", read_time: "8 menit", featured: 0, published: 1 },
  { title: "Tren Logistik 2026: AI, Drone, dan Masa Depan Pengiriman Cargo", excerpt: "Industri logistik sedang bertransformasi besar. Dari kecerdasan buatan untuk optimasi rute, drone delivery, hingga sistem tracking berbasis IoT.", content: "", category: "Supply Chain", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80", tags: '["Teknologi","AI","Inovasi"]', date: "15 Apr 2026", read_time: "9 menit", featured: 0, published: 1 },
  { title: "Panduan Lengkap Pengiriman Cargo Antar Pulau via Laut", excerpt: "Pengiriman antar pulau via laut adalah solusi paling ekonomis untuk volume besar. Pelajari prosedur, dokumen yang diperlukan, estimasi waktu, dan tips memilih jasa cargo laut yang terpercaya.", content: "", category: "Shipping Education", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80", tags: '["Cargo Laut","Antar Pulau","Panduan"]', date: "8 Apr 2026", read_time: "10 menit", featured: 0, published: 1 },
];

const SEED_FAQS = [
  // home
  { page: "home", question: "Apa itu DC Solution dan layanan apa yang ditawarkan?", answer: "DC Solution (Ditama Cargo) adalah perusahaan jasa pengiriman cargo yang melayani pengiriman darat, laut, dan udara ke seluruh Indonesia. Kami juga menyediakan layanan Same Day Delivery, Warehouse, dan Door to Door.", wa_text: "Halo DC Solution, saya ingin tahu lebih lanjut tentang layanan yang tersedia. Bisa jelaskan?", sort_order: 1, published: 1 },
  { page: "home", question: "Bagaimana cara mulai menggunakan layanan DC Solution?", answer: "Sangat mudah! Hubungi kami via WhatsApp di +62 852-1117-2494, ceritakan kebutuhan pengiriman Anda (asal, tujuan, jenis barang, berat), dan tim kami akan memberikan penawaran terbaik dalam hitungan menit.", wa_text: "Halo DC Solution, saya ingin mulai menggunakan layanan pengiriman. Bagaimana caranya?", sort_order: 2, published: 1 },
  { page: "home", question: "Apakah DC Solution melayani pengiriman ke seluruh Indonesia?", answer: "Ya! DC Solution menjangkau 500+ kota di seluruh Indonesia dari Sabang sampai Merauke, baik via jalur darat, laut, maupun udara.", wa_text: "Halo DC Solution, apakah bisa kirim ke [kota tujuan saya]? Berapa estimasi biaya dan waktu pengirimannya?", sort_order: 3, published: 1 },
  { page: "home", question: "Berapa lama estimasi pengiriman?", answer: "Tergantung layanan yang dipilih: Same Day (hari yang sama, area tertentu), Cargo Darat 1-5 hari kerja, Cargo Laut 3-14 hari kerja, Cargo Udara 1-2 hari kerja.", wa_text: "Halo DC Solution, saya ingin tahu estimasi pengiriman dari [kota asal] ke [kota tujuan]. Layanan apa yang paling cocok?", sort_order: 4, published: 1 },
  { page: "home", question: "Apakah ada asuransi untuk barang yang dikirim?", answer: "Ya, kami menyediakan asuransi pengiriman untuk semua layanan. Barang Anda terlindungi dari risiko kerusakan atau kehilangan selama proses pengiriman.", wa_text: "Halo DC Solution, saya ingin tahu tentang asuransi pengiriman untuk barang saya. Bisa dijelaskan?", sort_order: 5, published: 1 },
  // services
  { page: "services", question: "Apa perbedaan Cargo Darat, Laut, dan Udara?", answer: "Cargo Darat cocok untuk pengiriman antar kota di Jawa/Sumatera dengan harga terjangkau (1-5 hari). Cargo Laut ideal untuk volume besar antar pulau (3-14 hari). Cargo Udara paling cepat untuk seluruh Indonesia (1-2 hari).", wa_text: "Halo DC Solution, saya ingin konsultasi memilih antara Cargo Darat, Laut, atau Udara untuk kebutuhan saya. Bisa bantu?", sort_order: 1, published: 1 },
  { page: "services", question: "Apakah tersedia layanan Same Day Delivery?", answer: "Ya! Same Day Delivery tersedia untuk area Jabodetabek dan beberapa kota besar. Paket dijemput dan diantar di hari yang sama.", wa_text: "Halo DC Solution, saya butuh Same Day Delivery dari [asal] ke [tujuan]. Apakah bisa dan berapa biayanya?", sort_order: 2, published: 1 },
  // tracking
  { page: "tracking", question: "Bagaimana cara melacak paket saya?", answer: "Masukkan nomor resi yang Anda terima saat pengiriman ke kolom tracking, lalu klik 'Lacak Paket'. Anda akan melihat status terkini dan riwayat perjalanan paket secara real-time.", wa_text: "Halo DC Solution, saya ingin melacak paket dengan nomor resi [nomor resi]. Bisa bantu cek statusnya?", sort_order: 1, published: 1 },
  { page: "tracking", question: "Kapan saya mendapatkan nomor resi?", answer: "Nomor resi akan dikirimkan via WhatsApp setelah paket Anda berhasil diproses dan masuk ke sistem kami, biasanya dalam 1-2 jam setelah penjemputan.", wa_text: "Halo DC Solution, saya belum menerima nomor resi untuk pengiriman saya. Bisa dibantu?", sort_order: 2, published: 1 },
  // contact
  { page: "contact", question: "Berapa nomor WhatsApp DC Solution yang bisa dihubungi?", answer: "CS: +62 852-1117-2494 | Admin: +62 821-7798-1028. Aktif Senin–Sabtu 08.00–20.00 dan Minggu 09.00–17.00.", wa_text: "Halo DC Solution, saya ingin berkonsultasi tentang kebutuhan pengiriman saya.", sort_order: 1, published: 1 },
  { page: "contact", question: "Apakah bisa konsultasi pengiriman secara gratis?", answer: "Ya! Konsultasi pengiriman sepenuhnya gratis. Tim kami siap membantu Anda memilih layanan yang paling sesuai.", wa_text: "Halo DC Solution, saya ingin konsultasi gratis untuk kebutuhan pengiriman saya. Bisa dibantu?", sort_order: 2, published: 1 },
  // about
  { page: "about", question: "Di mana lokasi kantor DC Solution?", answer: "Gedung Gatrans, Bandara Soekarno–Hatta, Komplek Terminal Kargo, Jl. Cengkareng Golf Club RT.001/RW.010, Pajang, Kec. Benda, Kota Tangerang, Banten 15126.", wa_text: "Halo DC Solution, saya ingin mengunjungi kantor Anda. Bisa info jam operasional?", sort_order: 1, published: 1 },
  // blog
  { page: "blog", question: "Bagaimana cara mengemas barang fragile agar aman dikirim?", answer: "Gunakan bubble wrap minimal 3 lapis, isi ruang kosong dengan styrofoam, gunakan double box untuk barang sangat rapuh, dan beri label 'FRAGILE' yang jelas.", wa_text: "Halo DC Solution, saya ingin kirim barang fragile. Apakah ada layanan pengemasan khusus?", sort_order: 1, published: 1 },
];

const SEED_CONFIG = [
  ["site_name", "PT. Ditama Cargo Solution"],
  ["site_tagline", "WE DELIVER YOUR HAPPINESS"],
  ["wa_cs", "+62 852-1117-2494"],
  ["wa_admin", "+62 821-7798-1028"],
  ["email", "adminDCS16@gmail.com"],
  ["address", "Gedung Gatrans, Bandara Soekarno–Hatta, Komplek Terminal Kargo, Jl. Cengkareng Golf Club RT.001/RW.010, Pajang, Kec. Benda, Kota Tangerang, Banten 15126"],
  ["instagram", "https://www.instagram.com/ditamacargo/"],
  ["facebook", "https://web.facebook.com/ditama.cargo.solution.2024/"],
  ["youtube", "https://www.youtube.com/playlist?list=PLYK6HLyTSHFE-jXfUyJW77j8lIyQCxGZy"],
  ["maps_url", "https://www.google.com/maps?q=GEDUNG+PT+GATRANS,+Bandar+Udara+Internasional+Soekarno%E2%80%93Hatta"],
];

export async function POST() {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await initDB();

    // Check if already seeded
    const existing = await db.execute("SELECT COUNT(*) as cnt FROM blog_posts");
    if (Number(existing.rows[0].cnt) > 0) {
      return NextResponse.json({ message: "Already seeded" });
    }

    // Seed blogs
    for (const b of SEED_BLOGS) {
      await db.execute({
        sql: `INSERT INTO blog_posts (title,excerpt,content,category,image,tags,date,read_time,featured,published)
              VALUES (?,?,?,?,?,?,?,?,?,?)`,
        args: [b.title, b.excerpt, b.content, b.category, b.image, b.tags, b.date, b.read_time, b.featured, b.published],
      });
    }

    // Seed FAQs
    for (const f of SEED_FAQS) {
      await db.execute({
        sql: `INSERT INTO faq_items (page,question,answer,wa_text,sort_order,published)
              VALUES (?,?,?,?,?,?)`,
        args: [f.page, f.question, f.answer, f.wa_text, f.sort_order, f.published],
      });
    }

    // Seed config
    for (const [key, value] of SEED_CONFIG) {
      await db.execute({
        sql: `INSERT INTO site_config (key,value) VALUES (?,?)
              ON CONFLICT(key) DO UPDATE SET value=excluded.value`,
        args: [key, value],
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
