"use client";

import { useState } from "react";

const cities = [
  { name: "İstanbul", districts: ["Şişli", "Kadıköy"] },
  { name: "Ankara", districts: ["Çankaya"], medicine: "c" },
];

export default function MedicineSearchPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [medicine, setMedicine] = useState("");

  const handleSearch = () => {
    console.log("Arama yapılıyor:", { city, district, medicine });
    // Buraya API çağrısı veya filtreleme kodları gelecek
  };

  return (
    <main className="min-h-screen bg-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 sm:p-12 space-y-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          İlaç Arama
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (city && district && medicine.trim()) handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Şehir seçimi */}
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDistrict("");
            }}
            className="w-full sm:w-[30%] border rounded-xl px-4 py-3 bg-gray-50 text-gray-700"
          >
            <option value="">Şehir Seç</option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* İlçe seçimi */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!city}
            className="w-full sm:w-[30%] border rounded-xl px-4 py-3 bg-gray-50 text-gray-700 disabled:opacity-50"
          >
            <option value="">İlçe Seç</option>
            {cities
              .find((c) => c.name === city)
              ?.districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>

          {/* İlaç ismi */}
          <input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            placeholder="İlaç ismi girin"
            className="w-full sm:w-[35%] border rounded-xl px-4 py-3 bg-gray-50 text-gray-700"
          />

          {/* Ara butonu */}
          <button
            type="submit"
            disabled={!city || !district || !medicine.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ara
          </button>
        </form>

        {/* Buraya arama sonuçları veya mesajları eklenebilir */}
      </div>
    </main>
  );
}
