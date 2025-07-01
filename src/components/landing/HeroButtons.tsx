"use client";

import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-12 flex justify-center gap-6 flex-wrap">
      <Link href="/ilacimi-bul">
        <button className="bg-red-500 text-white py-3 px-12 rounded-full text-lg shadow-md hover:bg-red-700 hover:scale-105 transition-transform duration-300">
          İlacımı Bul
        </button>
      </Link>
      <Link href="/nobetci-eczane">
        <button className="bg-green-600 text-white py-3 px-8 rounded-full text-lg shadow-md hover:bg-green-700 hover:scale-105 transition-transform duration-300">
          Nöbetçi Eczane
        </button>
      </Link>
      <Link href="/yakinimdaki-eczaneler">
        <button className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-300">
          Yakınımdaki Eczaneler
        </button>
      </Link>
    </div>
  );
}