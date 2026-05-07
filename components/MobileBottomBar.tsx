"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Truck, MapPin, BookOpen, Phone } from "lucide-react";

const items = [
  { label: "Home",     href: "/",         icon: Home },
  { label: "Services", href: "/services", icon: Truck },
  { label: "Track",    href: "/tracking", icon: MapPin },
  { label: "Blog",     href: "/blog",     icon: BookOpen },
  { label: "Contact",  href: "/contact",  icon: Phone },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-bottom shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center gap-0.5 py-1 px-1"
              >
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                  active ? "bg-red-50" : ""
                }`}>
                  <item.icon className={`w-5 h-5 transition-colors duration-200 ${
                    active ? "text-brand-red" : "text-slate-400"
                  }`} />
                </div>
                <span className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
                  active ? "text-brand-red" : "text-slate-400"
                }`}>
                  {item.label}
                </span>
                {active && (
                  <motion.div layoutId="bottomDot" className="w-1 h-1 rounded-full bg-brand-red mt-0.5" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
