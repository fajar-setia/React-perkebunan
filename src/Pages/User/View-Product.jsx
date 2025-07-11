import React, { useEffect, useState } from "react";
import { Search, Filter, Grid, List, ShoppingCart, Heart, Star, Eye } from "lucide-react";
import Navbar from "../../Components/NavBar";
import Footer from "../../Components/Footer";


function ViewProduk() {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState(new Set());


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

    fetchProduk();
  }, []);

  const filteredAndSortedProducts = produkList
    .filter(item =>
      item.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const LoadingCard = () => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse">
      <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
      <div className="h-6 bg-white/10 rounded mb-2"></div>
      <div className="h-4 bg-white/10 rounded mb-4"></div>
      <div className="h-5 bg-white/10 rounded mb-2"></div>
      <div className="h-4 bg-white/10 rounded"></div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={`http://localhost:5296${product.imageUrl}`}
          alt={product.nameProduct}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
        >
          <Heart
            className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Eye className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-300">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
          {product.nameProduct}
        </h3>

        <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Rp {product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Stok: <span className={product.stock > 10 ? 'text-green-400' : 'text-yellow-400'}>{product.stock}</span>
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105">
            <ShoppingCart className="w-4 h-4 inline mr-2" />
            Add Chart
          </button>
        </div>
      </div>
    </div>
  );

  const ListView = ({ products }) => (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center space-x-6">
            <img
              src={`http://localhost:5296${product.imageUrl}`}
              alt={product.nameProduct}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{product.nameProduct}</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-300">{product.rating}</span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-1">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                  <p className="text-xl font-bold text-green-400">Rp {product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Stok: {product.stock}</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold transition-all duration-300">
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
        {/* Hero Section */}
        <div className="pt-20 pb-12 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Produk Berkualitas
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Temukan berbagai produk pertanian terbaik dengan kualitas premium dan harga terjangkau
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="name" className="bg-gray-800">Nama A-Z</option>
                    <option value="price-low" className="bg-gray-800">Harga Terendah</option>
                    <option value="price-high" className="bg-gray-800">Harga Tertinggi</option>
                    <option value="rating" className="bg-gray-800">Rating Tertinggi</option>
                  </select>

                  <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {searchTerm ? `Hasil pencarian "${searchTerm}"` : 'Semua Produk'}
                  <span className="text-purple-400 ml-2">({filteredAndSortedProducts.length})</span>
                </h2>
              </div>

              {loading ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                  {[...Array(8)].map((_, i) => (
                    <LoadingCard key={i} />
                  ))}
                </div>
              ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">Produk tidak ditemukan</h3>
                  <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
                </div>
              ) : (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <ListView products={filteredAndSortedProducts} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ViewProduk;