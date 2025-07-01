"use client";

import { FaMapMarkerAlt } from "react-icons/fa";

interface Pharmacy {
  id: number;
  name: string;
  city: string;
  district: string;
  distance?: number;
}

interface Props {
  pharmacies: Pharmacy[];
}

export default function PharmacyList({ pharmacies }: Props) {
  return (
    <ul className="space-y-4 mt-6 max-w-4xl mx-auto">
      {pharmacies.map((pharmacy) => (
        <li
          key={pharmacy.id}
          className="bg-indigo-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-indigo-800">{pharmacy.name}</h3>
            <p className="text-sm text-indigo-600">
              {pharmacy.city} / {pharmacy.district}
            </p>
          </div>
          {pharmacy.distance !== undefined && (
            <span className="text-indigo-600 text-sm flex items-center gap-1">
              <FaMapMarkerAlt /> {pharmacy.distance.toFixed(1)} km
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
