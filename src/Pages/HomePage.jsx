import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, Trophy, ArrowRight, Play, CheckCircle, Leaf, TreePine, Sun, Droplets } from 'lucide-react';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const heroSlides = [
    {
      title: "Perkebunan Berkelanjutan",
      subtitle: "Masa Depan Pertanian Hijau",
      description: "Mengembangkan perkebunan modern dengan teknologi terdepan untuk hasil yang optimal dan ramah lingkungan",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&h=1080&fit=crop"
    },
    {
      title: "Inovasi Agrikultur",
      subtitle: "Teknologi untuk Bumi",
      description: "Menggabungkan tradisi pertanian dengan teknologi modern untuk menciptakan ekosistem perkebunan yang produktif",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&h=1080&fit=crop"
    },
    {
      title: "Keahlian Terpercaya",
      subtitle: "Pengalaman Puluhan Tahun",
      description: "Didukung oleh tim ahli perkebunan yang berpengalaman dalam mengelola berbagai jenis tanaman komersial",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
    }
  ];

  const services = [
    {
      icon: "🌱",
      title: "Konsultasi Perkebunan",
      description: "Panduan lengkap untuk memulai dan mengoptimalkan perkebunan Anda",
      features: ["Analisis Tanah", "Pemilihan Bibit", "Perencanaan Tanam", "Strategi Budidaya"]
    },
    {
      icon: "🚜",
      title: "Manajemen Lahan",
      description: "Pengelolaan lahan perkebunan yang efisien dan berkelanjutan",
      features: ["Persiapan Lahan", "Sistem Irigasi", "Pemupukan", "Pengendalian Hama"]
    },
    {
      icon: "📊",
      title: "Monitoring & Analisis",
      description: "Sistem pemantauan modern untuk hasil perkebunan yang optimal",
      features: ["IoT Sensors", "Data Analytics", "Prediksi Cuaca", "Laporan Berkala"]
    },
    {
      icon: "🌿",
      title: "Produk Organik",
      description: "Pengembangan produk perkebunan organik berkualitas tinggi",
      features: ["Sertifikasi Organik", "Kontrol Kualitas", "Packaging", "Distribusi"]
    }
  ];

  const stats = [
    { number: "1000+", label: "Hektar Dikelola", icon: TreePine },
    { number: "500+", label: "Petani Mitra", icon: Users },
    { number: "25+", label: "Jenis Tanaman", icon: Leaf },
    { number: "98%", label: "Tingkat Keberhasilan", icon: CheckCircle }
  ];

  const crops = [
    { name: "Kelapa Sawit", area: "400 Ha", yield: "20 Ton/Ha", image: "🌴" },
    { name: "Kopi Arabika", area: "200 Ha", yield: "2.5 Ton/Ha", image: "☕" },
    { name: "Kakao", area: "150 Ha", yield: "1.8 Ton/Ha", image: "🍫" },
    { name: "Karet", area: "250 Ha", yield: "2.2 Ton/Ha", image: "🌳" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navbar isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>

        {/* Background Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-4 font-light">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Mulai Kemitraan
                <ArrowRight className="inline ml-2" size={20} />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2" size={20} />
                Lihat Kebun
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <stat.icon className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300" size={48} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crops Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tanaman Unggulan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Berbagai jenis tanaman perkebunan yang kami kelola dengan teknologi modern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crops.map((crop, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {crop.image}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{crop.name}</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="text-sm">Luas: {crop.area}</p>
                  <p className="text-sm">Produktivitas: {crop.yield}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Layanan Kami
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solusi lengkap untuk pengembangan perkebunan modern dan berkelanjutan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="text-purple-400 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Komitmen Berkelanjutan
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Kami berkomitmen untuk praktik perkebunan yang ramah lingkungan dan berkelanjutan untuk generasi mendatang.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Sun className="text-yellow-400" size={32} />
                  <div>
                    <div className="text-white font-semibold">Energi Terbarukan</div>
                    <div className="text-gray-400 text-sm">Solar & Biogas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Droplets className="text-blue-400" size={32} />
                  <div>
                    <div className="text-white font-semibold">Konservasi Air</div>
                    <div className="text-gray-400 text-sm">Sistem Irigasi Efisien</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Leaf className="text-green-400" size={32} />
                  <div>
                    <div className="text-white font-semibold">Organik</div>
                    <div className="text-gray-400 text-sm">Tanpa Pestisida</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TreePine className="text-emerald-400" size={32} />
                  <div>
                    <div className="text-white font-semibold">Reforestasi</div>
                    <div className="text-gray-400 text-sm">Penanaman Kembali</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Sertifikasi</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Organik Indonesia</span>
                  <CheckCircle className="text-green-400" size={20} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Rainforest Alliance</span>
                  <CheckCircle className="text-green-400" size={20} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Fair Trade</span>
                  <CheckCircle className="text-green-400" size={20} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">ISO 14001</span>
                  <CheckCircle className="text-green-400" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bergabunglah dengan Kami
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Mulai perjalanan perkebunan berkelanjutan Anda bersama tim ahli kami. Konsultasi gratis untuk calon mitra.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Konsultasi Gratis
            <ChevronRight className="inline ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;