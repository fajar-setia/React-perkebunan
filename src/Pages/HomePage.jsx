import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, Trophy, ArrowRight, Play, CheckCircle, Leaf, TreePine, Sun, Droplets, Sparkles, Zap } from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [setScrollY] = useState(0);

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-orange-900/30 z-10"></div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-transparent animate-pulse\"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_orange_1px,_transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
        </div>

        {/* Background Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-30 scale-105' : 'opacity-0 scale-100'
                }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat filter sepia"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Glowing Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 relative">
              <span className="bg-clip-text animate-pulse">
                {heroSlides[currentSlide].title}
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-orange-300 mb-4 font-light animate-fade-in">
              {heroSlides[currentSlide].subtitle}
            </p>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto opacity-80">
              {heroSlides[currentSlide].description}
            </p>

            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Sparkles className="mr-2 group-hover:animate-spin" size={20} />
                  Mulai Kemitraan
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
              </button>

              <button className="group border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500 hover:text-black transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Lihat Kebun
              </button>
            </div>
          </div>

          {/* Floating Action Indicators */}
          {/* <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div> */}
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-orange-500 scale-125'
                : 'bg-white/30 hover:bg-white/60'
                }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-black via-orange-900/30 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-6 bg-black/50 rounded-lg border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="text-orange-400 group-hover:text-orange-300 group-hover:scale-110 transition-all duration-300" size={48} />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Crops Section */}
      <section className="py-20 bg-gradient-to-r from-black via-orange-600/10 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_orange_1px,_transparent_1px)] bg-[length:100px_100px] opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 relative">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Tanaman Unggulan
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Berbagai jenis tanaman perkebunan yang kami kelola dengan teknologi modern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crops.map((crop, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-black to-orange-950 rounded-2xl p-6 text-center border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                    {crop.image}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {crop.name}
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p className="text-sm flex items-center justify-center">
                      <TreePine className="mr-2 text-orange-400" size={16} />
                      Luas: {crop.area}
                    </p>
                    <p className="text-sm flex items-center justify-center">
                      <Zap className="mr-2 text-orange-400" size={16} />
                      Produktivitas: {crop.yield}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-r from-black via-orange-600/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/5 via-transparent to-orange-900/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Layanan Kami
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solusi lengkap untuk pengembangan perkebunan modern dan berkelanjutan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-orange-900/20 to-black rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/60 transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="text-orange-400 mr-3 group-hover:scale-110 transition-transform" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Sustainability Section */}
      <section className="py-20 bg-gradient-to-r from-black via-orange-600/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Komitmen Berkelanjutan
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Kami berkomitmen untuk praktik perkebunan yang ramah lingkungan dan berkelanjutan untuk generasi mendatang.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Sun, title: "Energi Terbarukan", desc: "Solar & Biogas", color: "text-yellow-400" },
                  { icon: Droplets, title: "Konservasi Air", desc: "Sistem Irigasi Efisien", color: "text-blue-400" },
                  { icon: Leaf, title: "Organik", desc: "Tanpa Pestisida", color: "text-green-400" },
                  { icon: TreePine, title: "Reforestasi", desc: "Penanaman Kembali", color: "text-emerald-400" }
                ].map((item, index) => (
                  <div key={index} className="group flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-800/50 to-transparent rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                    <item.icon className={`${item.color} group-hover:scale-110 transition-transform`} size={32} />
                    <div>
                      <div className="text-white font-semibold group-hover:text-orange-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-orange-500/20 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-6 text-center">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Sertifikasi
                  </span>
                </h3>
                <div className="space-y-4">
                  {[
                    "Organik Indonesia",
                    "Rainforest Alliance",
                    "Fair Trade",
                    "ISO 14001"
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-3 bg-gradient-to-r from-gray-800/50 to-transparent rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 fade-in"
                      style={{
                        animationDelay: `${index * 1}s`,
                        animationFillMode: "forwards"
                      }}
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {cert}
                      </span>
                      <CheckCircle
                        className="text-orange-400 group-hover:scale-110 transition-transform"
                        size={20}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:50px_50px] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 relative">
            Bergabunglah dengan Kami
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-lg blur opacity-30"></div>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Mulai perjalanan perkebunan berkelanjutan Anda bersama tim ahli kami. Konsultasi gratis untuk calon mitra.
          </p>

          <button className="group relative bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              <Sparkles className="mr-3 group-hover:animate-spin" size={20} />
              Konsultasi Gratis
              <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;