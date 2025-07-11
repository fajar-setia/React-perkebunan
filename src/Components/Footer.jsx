function Footer() {
  return(
     <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                AgroVision
              </div>
              <p className="text-gray-400">
                Perkebunan berkelanjutan untuk masa depan yang lebih hijau
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Konsultasi Perkebunan</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Manajemen Lahan</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Monitoring & Analisis</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Produk Organik</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Tim Ahli</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@agrovision.com</li>
                <li>Phone: +62 123 456 789</li>
                <li>Address: Yogyakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AgroVision. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}

export default Footer