import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  name: string;
  city: string;
  district: string;
  distance?: number;
}

export default function EczaneCard({ name, city, district, distance }: Props) {
  return (
    <li className="bg-indigo-50  p-5 rounded-xl shadow hover:shadow-md transition flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-indigo-800">{name}</h3>
        <p className="text-sm text-indigo-600">{city} / {district}</p>
      </div>
      {distance && (
        <span className="text-indigo-600 text-sm flex items-center gap-1">
          <FaMapMarkerAlt /> {distance.toFixed(1)} km
        </span>
      )}
    </li>
  );
}
