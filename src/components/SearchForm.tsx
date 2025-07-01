"use client";
import { cities } from "@/utils/utils";

interface Props {
  city: string;
  district: string;
  setCity: (val: string) => void;
  setDistrict: (val: string) => void;
  handleSearch: () => void;
}

export default function SearchForm({
  city,
  district,
  setCity,
  setDistrict,
  handleSearch,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <select
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setDistrict("");
        }}
        className="w-full sm:w-[38%] border rounded-xl px-4 py-3 bg-gray-50 text-gray-700"
      >
        <option value="">Şehir Seç</option>
        {cities.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        disabled={!city}
        className="w-full sm:w-[38%] border rounded-xl px-4 py-3 bg-gray-50 text-gray-700 disabled:opacity-50"
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

      <button
        disabled={!city || !district}
        onClick={handleSearch}
        className="w-full sm:w-[24%] px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ara
      </button>
    </div>
  );
}
