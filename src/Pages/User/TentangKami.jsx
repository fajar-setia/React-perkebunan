import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Users, Award, Leaf, Heart, Star, Globe, Shield, Truck, Quote } from "lucide-react";
import Navbar from "../../Components/NavBar";
import Footer from "../../Components/Footer";

function TentangKami() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Statistics counter animation
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    years: 0,
    awards: 0
  });

  const finalStats = {
    customers: 10000,
    products: 500,
    years: 15,
    awards: 25
  };

  const teamMembers = [
    {
      name: "Budi Santoso",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Berpengalaman 20+ tahun dalam industri pertanian dan teknologi"
    },
    {
      name: "Sari Wijaya",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "Ahli dalam manajemen rantai pasok dan kualitas produk"
    },
    {
      name: "Ahmad Rahman",
      position: "Technology Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Memimpin pengembangan platform digital dan inovasi teknologi"
    },
    {
      name: "Dewi Kartika",
      position: "Customer Relations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Berdedikasi untuk memberikan pengalaman terbaik kepada pelanggan"
    }
  ];

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          customers: Math.floor(finalStats.customers * progress),
          products: Math.floor(finalStats.products * progress),
          years: Math.floor(finalStats.years * progress),
          awards: Math.floor(finalStats.awards * progress)
        });

        if (step >= steps) {
          clearInterval(interval);
          setStats(finalStats);
        }
      }, stepDuration);
    };

    animateStats();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Berkelanjutan",
      description: "Komitmen terhadap praktik pertanian yang ramah lingkungan dan berkelanjutan"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Kualitas Terjamin",
      description: "Semua produk melalui kontrol kualitas ketat untuk memastikan standar tertinggi"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Kepedulian",
      description: "Mendukung petani lokal dan komunitas dengan hubungan yang saling menguntungkan"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Inovasi",
      description: "Menggunakan teknologi terdepan untuk meningkatkan efisiensi dan kualitas"
    }
  ];

  const milestones = [
    { year: "2008", title: "Didirikan", description: "Memulai dengan visi memberdayakan petani lokal" },
    { year: "2012", title: "Ekspansi Regional", description: "Memperluas jangkauan ke seluruh Jawa" },
    { year: "2018", title: "Platform Digital", description: "Meluncurkan platform e-commerce pertanian" },
    { year: "2023", title: "Sertifikasi Internasional", description: "Meraih sertifikasi kualitas internasional" }
  ];

  useEffect(() => {
    // Simulate Google Maps loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Tentang Kami
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Membangun jembatan antara petani dan konsumen dengan teknologi terdepan, 
              menghadirkan produk pertanian berkualitas tinggi langsung ke tangan Anda
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
              {['about', 'team', 'values', 'history'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {section === 'about' && 'Tentang'}
                  {section === 'team' && 'Tim Kami'}
                  {section === 'values' && 'Nilai-Nilai'}
                  {section === 'history' && 'Sejarah'}
                </button>
              ))}
            </div>
          </div>

          {/* About Section */}
          {activeSection === 'about' && (
            <div className="space-y-16">
              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                      <Globe className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Visi Kami</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Menjadi platform terdepan yang menghubungkan petani dengan konsumen, 
                    menciptakan ekosistem pertanian yang berkelanjutan dan menguntungkan semua pihak 
                    melalui inovasi teknologi dan kualitas produk yang unggul.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-green-500/20 rounded-full mr-4">
                      <Heart className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Misi Kami</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Memberdayakan petani lokal dengan menyediakan akses pasar yang lebih luas, 
                    menghadirkan produk pertanian berkualitas tinggi kepada konsumen, 
                    dan membangun komunitas yang peduli terhadap ketahanan pangan dan lingkungan.
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-center mb-8">Pencapaian Kami</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="text-4xl font-bold text-purple-400 mb-2">
                      {stats.customers.toLocaleString()}+
                    </div>
                    <div className="text-gray-300">Pelanggan Puas</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {stats.products.toLocaleString()}+
                    </div>
                    <div className="text-gray-300">Produk Berkualitas</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      {stats.years}+
                    </div>
                    <div className="text-gray-300">Tahun Pengalaman</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <div className="text-4xl font-bold text-pink-400 mb-2">
                      {stats.awards}+
                    </div>
                    <div className="text-gray-300">Penghargaan</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Section */}
          {activeSection === 'team' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Tim Profesional Kami</h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Didukung oleh tim ahli yang berpengalaman dan berdedikasi tinggi dalam menciptakan solusi terbaik
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                      <p className="text-purple-400 font-semibold mb-3">{member.position}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Section */}
          {activeSection === 'values' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Prinsip-prinsip yang menjadi fondasi dalam setiap langkah perjalanan kami
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-all duration-300">
                        <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                          {value.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                          {value.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Section */}
          {activeSection === 'history' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Perjalanan Kami</h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Melihat kembali pencapaian penting dalam membangun ekosistem pertanian yang berkelanjutan
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-800 z-10"></div>
                      
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-purple-400 mr-4">{milestone.year}</span>
                            <h4 className="text-xl font-bold text-white">{milestone.title}</h4>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact & Location Section */}
          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Phone className="w-6 h-6 mr-3 text-purple-400" />
                Hubungi Kami
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-300">Jl. Pertanian No. 123, Yogyakarta 55281</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-300">+62 274 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-300">info@agritech.com</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-300">Senin - Jumat: 08:00 - 17:00</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-purple-400" />
                Lokasi Kami
              </h3>
              <div className="relative h-64 rounded-xl overflow-hidden">
                {!isMapLoaded ? (
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-4"></div>
                      <p className="text-gray-400">Memuat peta...</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.9442442444963!2d110.3913462!3d-7.7971408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a14f4b0b6c3f7%3A0x1a5b6c7d8e9f0a1b!2sYogyakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1642345678901!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default TentangKami;