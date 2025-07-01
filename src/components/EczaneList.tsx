import EczaneCard from "./EczaneCard";

interface Eczane {
  id: number;
  name: string;
  city: string;
  district: string;
  distance?: number;
}

interface Props {
  eczaneler: Eczane[];
  loading: boolean;
  aramaYapildi: boolean;
}

export default function EczaneList({ eczaneler, loading, aramaYapildi }: Props) {
  if (loading) {
    return <p className="text-center text-indigo-600 font-medium animate-pulse">Yükleniyor...</p>;
  }

  if (eczaneler.length === 0 && aramaYapildi) {
    return <p className="text-center text-gray-400 italic mt-6">Bu bölgede nöbetçi eczane bulunamadı.</p>;
  }

  return (
    <ul className="space-y-4 mt-6">
      {eczaneler.map((e) => (
        <EczaneCard key={e.id} {...e} />
      ))}
    </ul>
  );
}
