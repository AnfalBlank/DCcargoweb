"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, HelpCircle, Settings,
  LogOut, Menu, X, ChevronRight, Globe, ExternalLink
} from "lucide-react";
import BlogManager from "./components/BlogManager";
import FAQManager from "./components/FAQManager";
import SettingsManager from "./components/SettingsManager";
import Overview from "./components/Overview";

const navItems = [
  { id: "overview",  label: "Dashboard",  icon: LayoutDashboard },
  { id: "blog",      label: "Blog & Artikel", icon: FileText },
  { id: "faq",       label: "FAQ",         icon: HelpCircle },
  { id: "settings",  label: "Pengaturan",  icon: Settings },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const renderContent = () => {
    switch (active) {
      case "overview":  return <Overview />;
      case "blog":      return <BlogManager />;
      case "faq":       return <FAQManager />;
      case "settings":  return <SettingsManager />;
      default:          return <Overview />;
    }
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-5"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="w-10 h-10 flex-shrink-0">
          <Image src="/logo.png" alt="DC Solution" width={40} height={40} className="object-contain" />
        </div>
        <div>
          <div className="font-sora font-black text-white text-sm leading-none">PT. DITAMA</div>
          <div className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActive(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === item.id
                ? "bg-white/15 text-white"
                : "text-white/55 hover:bg-white/8 hover:text-white/80"
            }`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
            {active === item.id && <ChevronRight className="w-3 h-3 ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="space-y-2 pt-4 border-t border-white/10">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:bg-white/8 hover:text-white/80 transition-all">
          <Globe className="w-4 h-4" />
          Lihat Website
          <ExternalLink className="w-3 h-3 ml-auto" />
        </a>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-slate-900 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-60 bg-slate-900 z-50"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-sora font-bold text-slate-900 text-base">
                {navItems.find((n) => n.id === active)?.label}
              </h1>
              <p className="text-slate-400 text-xs hidden sm:block">PT. Ditama Cargo Solution</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:block">Administrator</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
