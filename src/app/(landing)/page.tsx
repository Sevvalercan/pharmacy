"use client";

import AnimatedImages from "@/components/landing/AnimatedImages";
import HeroText from "@/components/landing/HeroText";
import HeroButtons from "@/components/landing/HeroButtons";

export default function LandingHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-red-250 to-red-0 overflow-hidden">
      <AnimatedImages />

      <div className="w-[300px]  md:w-[500px]">
        <img
          src="/images/logo.svg" // Burada logo dosyanın yolu olmalı
          alt="İlacım Yanımda Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      <HeroText />
      <HeroButtons />
    </section>
  );
}
