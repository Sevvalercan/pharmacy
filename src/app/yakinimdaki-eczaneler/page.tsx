"use client";

import { useState, useEffect } from "react";
import SearchForm from "@/components/SearchForm";
import PharmacyList from "@/components/PharmacyList";
import MapArea from "@/components/MapArea";

interface Pharmacy {
  id: number;
  name: string;
  city: string;
  district: string;
  distance?: number;
}

const ALL_PHARMACIES: Pharmacy[] = [
  { id: 1, name: "Şişli Nöbetçi Eczanesi", city: "İstanbul", district: "Şişli", distance: 1.2 },
  { id: 2, name: "Kadıköy Eczanesi", city: "İstanbul", district: "Kadıköy", distance: 3.5 },
  { id: 3, name: "Çankaya Nöbetçi Eczane", city: "Ankara", district: "Çankaya", distance: 2.1 },
  // Daha fazla eczane ekleyebilirsiniz...
];

export default function NearbyPage() {
  // Konum durumu
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nearbyPharmacies, setNearbyPharmacies] = useState<Pharmacy[]>([]);
  const [aramaYapildi, setAramaYapildi] = useState(false);

  // Manuel arama state
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  // Otomatik konum alma
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tarayıcınız konum servislerini desteklemiyor.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });

        // 5 km içindeki eczaneler (örnek)
        const filtered = ALL_PHARMACIES.filter(
          (eczane) => eczane.distance !== undefined && eczane.distance <= 5
        );
        setNearbyPharmacies(filtered);
        setLoading(false);
        setAramaYapildi(true);
      },
      () => {
        setError("Konum alınamadı. Lütfen izin verin veya manuel arama yapın.");
        setLoading(false);
      }
    );
  }, []);

  // Manuel arama fonksiyonu
  const handleSearch = () => {
    if (!city || !district) return;

    setLoading(true);
    setError(null);

    // Örnek filtreleme - gerçek projede API çağrısı olabilir
    setTimeout(() => {
      const result = ALL_PHARMACIES.filter(
        (eczane) => eczane.city === city && eczane.district === district
      );
      setNearbyPharmacies(result);
      setLoading(false);
      setAramaYapildi(true);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 sm:p-12 space-y-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Yakınımdaki Nöbetçi Eczaneler
        </h1>

        {/* Hata varsa */}
        {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

        {/* Otomatik konumdan sonra ya da hata durumunda manuel form */}
        <SearchForm
          city={city}
          district={district}
          setCity={setCity}
          setDistrict={setDistrict}
          handleSearch={handleSearch}
        />

        {/* Yükleniyor */}
        {loading && (
          <p className="text-center text-indigo-600 font-medium animate-pulse">
            {error ? "Yükleniyor..." : "Konumunuz alınıyor..."}
          </p>
        )}

        {/* Eczane listesi */}
        {!loading && aramaYapildi && nearbyPharmacies.length > 0 && (
          <PharmacyList pharmacies={nearbyPharmacies} />
        )}

        {!loading && aramaYapildi && nearbyPharmacies.length === 0 && (
          <p className="text-center text-gray-400 italic">Nöbetçi eczane bulunamadı.</p>
        )}
      </div>

      {/* Harita alanı */}
      <MapArea visible={aramaYapildi && nearbyPharmacies.length > 0} />
    </main>
  );
}
