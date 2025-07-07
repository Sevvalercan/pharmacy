"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navItems = [
  { href: "/ilacimi-bul", label: "İlacımı Bul" },
  { href: "/nobetci-eczane", label: "Nöbetçi Eczane" },
  { href: "/yakinimdaki-eczaneler", label: "Yakınımdaki Eczaneler" },
  { href: "/randevu", label: "Randevu" },
];

export default function Navbar() {
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // SCROLL EFFECT
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

  // DIŞ TIKLAMA KAPATMA
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
        <Link href="/" className="p-4">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-40 h-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");

            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : scrolled
                    ? "text-blue-900 hover:text-blue-600"
                    : "text-blue-800 hover:text-blue-500"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-800 focus:outline-none"
          >
            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-md md:hidden"
        >
          <div className="flex flex-col items-center space-y-4 p-6">
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg   text-center transition-colors duration-300 ${
                    isActive
                      ? "text-blue-500"
                      : "text-blue-800 hover:text-blue-500"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
