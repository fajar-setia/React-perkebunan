import React, { useEffect, useState } from "react";
import { Search, Filter, Grid, List, ShoppingCart, Heart, Star, Eye, CheckCircle, Sparkles, TreePine, Leaf, Users, Award, ArrowUp, Package, Zap, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ViewProduk() {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState(new Set());
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());

  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch("http://localhost:5296/api/perkebunan");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProdukList(data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };
    // Scroll listener for parallax effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    fetchProduk();
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.cardId;
            setVisibleCards(prev => {
              if (!prev.has(id)) {
                const newSet = new Set(prev);
                newSet.add(id);
                return newSet;
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    requestAnimationFrame(() => {
      const cards = document.querySelectorAll('[data-card-id]');
      cards.forEach(card => observer.observe(card));
    });

    return () => observer.disconnect();
  }, [produkList]);


  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      localStorage.setItem("pendingCartItem", JSON.stringify({
        productId: product.id,
        quantity: 1,
        nameProduct: product.nameProduct,
      }));
      sessionStorage.setItem("loginRedirect", "Cart");
      navigate("/Login");
      return;
    }

    // Simulate API call
    try {
      const response = await fetch("http://localhost:5296/api/Cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", errorText);
        throw new Error("Gagal menambahkan ke keranjang");
      }

      // ✅ Sukses → tampilkan notifikasi
      setNotificationMessage(`${product.nameProduct} berhasil ditambahkan ke keranjang!`);
      setShowNotification(true);

      // ✅ Tandai bahwa produk ini sudah ditambahkan
      setAddedToCart((prev) => new Set(prev).add(product.id));

      setTimeout(() => {
        setShowNotification(false);
        setAddedToCart((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Error:", err.message);
      alert("Terjadi kesalahan saat menambahkan ke keranjang");
    }
  };

  const filteredAndSortedProducts = (
    Array.isArray(produkList)
      ? produkList
      : (produkList.$values ?? [])
  )
    .filter(item =>
      (item.nameProduct?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (item.description?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.nameProduct.localeCompare(b.nameProduct);
      }
    });

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const LoadingCard = ({ index }) => (
    <div
      className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 animate-pulse"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationDuration: '1.5s'
      }}
    >
      <div className="w-full h-48 bg-orange-500/20 rounded-xl mb-4"></div>
      <div className="h-6 bg-orange-500/20 rounded mb-2"></div>
      <div className="h-4 bg-orange-500/20 rounded mb-4"></div>
      <div className="h-5 bg-orange-500/20 rounded mb-2"></div>
      <div className="h-4 bg-orange-500/20 rounded"></div>
    </div>
  );

  const ProductCard = ({ product, index }) => {
    const isVisible = visibleCards.has(product.id.toString());

    return (
      <div
        data-card-id={product.id}
        className={`group bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 hover:bg-orange-900/20 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
          }`}
        style={{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'forwards'
        }}
      >
        <div className="relative overflow-hidden rounded-xl mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img
            src={`http://localhost:5296${product.imageUrl}`}
            alt={product.nameProduct}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Floating Action Buttons */}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500/50 hover:scale-110"
          >
            <Heart
              className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>

          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="p-2 bg-orange-500/20 backdrop-blur-sm rounded-full hover:bg-orange-500/40 transition-colors hover:scale-110">
              <Eye className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-orange-500/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
            {product.category}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-300">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-orange-400">
              <Package className="w-4 h-4" />
              <span className="text-sm">{product.stock}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
            {product.nameProduct}
          </h3>

          <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed group-hover:text-gray-200 transition-colors">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Rp {product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 flex items-center mt-1">
                <TreePine className="w-3 h-3 mr-1 text-orange-400" />
                Stok: <span className={product.stock > 10 ? 'text-green-400' : 'text-yellow-400 ml-1'}>{product.stock}</span>
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className={`px-4 py-2 rounded-xl text-white font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 ${addedToCart.has(product.id)
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25'
                }`}
            >
              {addedToCart.has(product.id) ? (
                <>
                  <CheckCircle className="w-4 h-4 inline mr-2 animate-pulse" />
                  Ditambahkan
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 inline mr-2 group-hover:animate-bounce" />
                  Tambah
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ListView = ({ products }) => (
    <div className="space-y-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          data-card-id={product.id}
          className={`bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 hover:bg-orange-900/20 hover:border-orange-500/60 transition-all duration-500 transform hover:scale-102 ${visibleCards.has(product.id.toString()) ? 'animate-fade-in-left opacity-100' : 'opacity-0 translate-x-8'
            }`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'forwards'
          }}
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={`https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop`}
                alt={product.nameProduct}
                className="w-24 h-24 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                    {product.nameProduct}
                  </h3>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-300">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2 hover:bg-orange-500/20 rounded-full transition-colors hover:scale-110"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-3 group-hover:text-gray-200 transition-colors">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Package className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Stok: {product.stock}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-6 py-2 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 ${addedToCart.has(product.id)
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
                >
                  {addedToCart.has(product.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Ditambahkan
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 inline mr-2" />
                      Tambah ke Keranjang
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Notification Component
  const Notification = () => (
    <div className={`fixed top-20 right-6 bg-gradient-to-r from-green-500 to-green-600 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-lg transition-opacity duration-300 z-50 border border-green-400/20 ${showNotification ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="flex items-center space-x-3">
        <div className="p-1 bg-white/20 rounded-full">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold">Berhasil!</p>
          <p className="text-sm opacity-90">{notificationMessage}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
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

        <Notification />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Parallax Background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-orange-900/30"></div>

          {/* Animated Background Pattern */}
          <div className="fixed inset-0 opacity-10 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_orange_1px,_transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Produk Unggulan
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Temukan berbagai produk pertanian terbaik dengan kualitas premium dan teknologi terdepan
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: Package, label: "Produk", value: "1000+" },
                  { icon: Users, label: "Pelanggan", value: "5000+" },
                  { icon: Award, label: "Rating", value: "4.9/5" },
                  { icon: Zap, label: "Pengiriman", value: "24 Jam" }
                ].map((stat, index) => (
                  <div key={index} className="group bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Search and Filter Bar */}
            <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 border border-orange-500/20 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col xl:flex-row items-center space-y-6 xl:space-y-0 xl:space-x-6">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-400" />
                  <input
                    type="text"
                    placeholder="Cari produk pertanian..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-black/40 border border-orange-500/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-10 pr-8 py-4 bg-black/40 border border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    >
                      <option value="name" className="bg-black">Nama A-Z</option>
                      <option value="price-low" className="bg-black">Harga Terendah</option>
                      <option value="price-high" className="bg-black">Harga Tertinggi</option>
                      <option value="rating" className="bg-black">Rating Tertinggi</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2 bg-black/40 rounded-2xl p-2 border border-orange-500/20">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid'
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-orange-500/20'
                        }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'list'
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-orange-500/20'
                        }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => navigate('/Cart')}
                    className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Keranjang</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Counter */}
            <div className="flex justify-between items-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-3xl font-bold text-white">
                {searchTerm ? `Hasil untuk "${searchTerm}"` : 'Semua Produk'}
                <span className="text-orange-400 ml-3 text-xl">({filteredAndSortedProducts.length})</span>
              </h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span>Produk Berkualitas Premium</span>
              </div>
            </div>

            {/* Products Section */}
            <div className="mb-12">
              {loading ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-8`}>
                  {[...Array(8)].map((_, i) => (
                    <LoadingCard key={i} index={i} />
                  ))}
                </div>
              ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="text-8xl mb-6 animate-bounce">🔍</div>
                  <h3 className="text-3xl font-bold text-gray-300 mb-4">Produk tidak ditemukan</h3>
                  <p className="text-gray-400 text-lg">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
                </div>
              ) : (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredAndSortedProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                ) : (
                  <ListView products={filteredAndSortedProducts} />
                )
              )}
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-110 z-50 ${scrollY > 400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default ViewProduk;