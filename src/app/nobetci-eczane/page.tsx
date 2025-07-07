"use client";

import { useState } from "react";
import PharmacyList from "@/components/PharmacyList";
import MapArea from "@/components/MapArea";
import { ECZANELER } from "@/utils/utils";
import SearchForm from "@/components/SearchForm";

export default function DutyPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [aramaYapildi, setAramaYapildi] = useState(false);

  const handleSearch = () => {
    if (!city || !district) return;

    setLoading(true);
    setAramaYapildi(true);

    setTimeout(() => {
      const result = ECZANELER.filter(
        (e) => e.city === city && e.district === district
      );
      setFiltered(result);
      setLoading(false);
    }, 600);
  };

  return (
    <main className="text-gray-800 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8 sm:p-12 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Nöbetçi Eczane Bul
          </h1>
          <p className="text-gray-600">
            Şehir ve ilçe seçerek nöbetçi eczaneleri bulun.
          </p>
        </header>

        <SearchForm
          city={city}
          district={district}
          setCity={setCity}
          setDistrict={setDistrict}
          handleSearch={handleSearch}
        />

        {loading && (
          <p className="text-center text-blue-600 font-medium animate-pulse">
            Yükleniyor...
          </p>
        )}

        {!loading && aramaYapildi && (
          <>
            {filtered.length > 0 ? (
              <PharmacyList pharmacies={filtered} />
            ) : (
              <p className="text-center text-gray-400 italic mt-6">
                Bu bölgede nöbetçi eczane bulunamadı.
              </p>
            )}
          </>
        )}
      </div>

      <MapArea visible={aramaYapildi && filtered.length > 0} />
    </main>
  );
}
