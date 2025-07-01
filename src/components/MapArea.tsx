interface Props {
  visible: boolean;
}

export default function MapArea({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 sm:p-12">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
        Harita Üzerinde Gösterim
      </h2>
      <div className="mx-auto h-96 bg-gray-200 rounded-2xl flex items-center justify-center text-indigo-600 font-semibold">
        Harita burada görünecek (örnek alan)
      </div>
    </div>
  );
}
