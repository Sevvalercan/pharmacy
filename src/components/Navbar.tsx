"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/ilacimi-bul", label: "İlacımı Bul" },
  { href: "/nobetci-eczane", label: "Nöbetçi Eczane" },
  { href: "/yakinimdaki-eczaneler", label: "Yakınımdaki Eczaneler" },
  { href: "/randevu", label: "Randevu" },
];

export default function Navbar() {
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  // Aktif sayfa yolunu al
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
        controls.start({
          height: 56,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "rgba(255,255,255,0.95)",
          transition: { duration: 0.3 },
        });
      } else {
        setScrolled(false);
        controls.start({
          height: 80,
          boxShadow: "none",
          backgroundColor: "rgba(255,255,255,1)",
          transition: { duration: 0.3 },
        });
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);

  return (
    <motion.nav
      animate={controls}
      initial={{
        height: 80,
        boxShadow: "none",
        backgroundColor: "rgba(255,255,255,1)",
      }}
      className="sticky top-0 z-50 flex items-center px-6"
      style={{ width: "100%" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <Link href="/" className="p-12 mt-4">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-full h-auto object-contain"
          />
        </Link>
        <div className="hidden md:flex space-x-8">
          {navItems.map(({ href, label }) => {
            // Aktif mi kontrolü
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-blue-00" // aktif link açık mavi
                    : scrolled
                    ? "text-blue-700 hover:text-blue-700"
                    : "text-blue-900 hover:text-blue-700"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
