export default function Footer() {
  return (
    <footer className="bg-indigo-50 text-indigo-700 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 İlacımYanımda</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-indigo-900">Hakkında</a>
          <a href="#" className="hover:text-indigo-900">KVKK</a>
          <a href="#" className="hover:text-indigo-900">İletişim</a>
        </div>
      </div>
    </footer>
  )
}
