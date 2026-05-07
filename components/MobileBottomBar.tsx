"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Truck, MapPin, BookOpen, Phone } from "lucide-react";

const bottomNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Truck },
  { label: "Track", href: "/tracking", icon: MapPin },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all duration-300 ${
                  isActive ? "text-orange-400" : "text-gray-500"
                }`}
              >
                {/* Active indicator dot */}
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="bottomBarIndicator"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"
                    />
                  )}
                  <div
                    className={`p-1.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-orange-500/15 shadow-orange-glow"
                        : "bg-transparent"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? "text-orange-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>
                <span
                  className={`text-[10px] font-medium leading-none transition-all duration-300 ${
                    isActive ? "text-orange-400" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
