import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Ditama Cargo Solution - We Deliver Your Happiness",
  description: "Ditama Cargo Solution adalah solusi pengiriman cargo express modern yang cepat, aman, dan terpercaya untuk seluruh Indonesia.",
  keywords: "jasa cargo express, pengiriman cargo terpercaya, cargo seluruh indonesia, jasa pengiriman cepat, cargo murah terpercaya",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Ditama Cargo Solution - We Deliver Your Happiness",
    description: "Solusi pengiriman cargo express modern yang cepat, aman, dan terpercaya untuk seluruh Indonesia.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins bg-white text-slate-900 antialiased">
        <Navbar />
        <main className="pb-16 md:pb-0">
          {children}
        </main>
        <MobileBottomBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
