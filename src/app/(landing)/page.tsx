"use client";

import HeroCursor from "@/components/landing/HeroCursor";
import HeroText from "@/components/landing/HeroText";
import HeroButtons from "@/components/landing/HeroButtons";

export default function LandingHero() {
  return (
    <section className="relative py-20 px-6 min-h-screen bg-gradient-to-b from-red-250 to-red-0 overflow-hidden">
      <HeroCursor />
      <HeroText />
      <HeroButtons />
    </section>
  );
}
