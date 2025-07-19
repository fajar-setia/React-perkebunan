import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  ArrowLeft,
  Heart,
  Star,
  Package,
  Truck,
  Shield,
  CheckCircle
} from "lucide-react";
import Navbar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  // const [SaveCartItemToApi, setSaveCartItemToApi] = useState(null);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const fetchCartItemsFromApi = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token"); // Ambil token JWT

      console.log("Token:", token);
      console.log("UserId:", userId);
      

      if (!userId || !token) {
        console.warn("UserId atau token tidak tersedia");
        setTimeout(fetchCartItemsFromApi, 200);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5296/api/Cart/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan header Authorization
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Gagal ambil keranjang: ${response.status}`);
        }

        const raw = await response.json();
        const data = Array.isArray(raw) ? raw : raw.$values ?? [];
        setCartItems(data);
      } catch (error) {
        console.error("Gagal ambil data keranjang dari API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItemsFromApi();
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("Cart", JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const removeItem = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5296/api/Cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal hapus item");
      }

      // Hapus dari state lokal agar UI langsung update
      setCartItems(items => items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error hapus item:", error);
      alert("Gagal menghapus item");
    }
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10 });
      setCouponCode('');
    } else if (couponCode.toLowerCase() === 'newuser') {
      setAppliedCoupon({ code: 'NEWUSER', discount: 15 });
      setCouponCode('');
    } else {
      alert('Kode kupon tidak valid');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    try {
      // Simulasi proses checkout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Dalam implementasi nyata, kirim data ke API
      const checkoutData = {
        items: cartItems,
        subtotal,
        discount,
        shippingCost,
        total,
        coupon: appliedCoupon
      };

      console.log('Checkout data:', checkoutData);

      // Reset cart setelah checkout berhasil
      setCartItems([]);
      localStorage.removeItem("Cart");
      alert('Checkout berhasil! Terima kasih atas pesanan Anda.');

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Terjadi kesalahan saat checkout. Silakan coba lagi.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price ?? 0;
    return acc + price * item.quantity;
  }, 0);

  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shippingCost = subtotal > 100000 ? 0 : 10000;
  const total = subtotal - discount + shippingCost;

  const LoadingCard = () => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-white/10 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-6 bg-white/10 rounded mb-2"></div>
          <div className="h-4 bg-white/10 rounded mb-2"></div>
          <div className="h-5 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  );

  const CartItem = ({ item }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={`http://localhost:5296${item.product?.imageUrl ?? "/images/default.jpg"}`} // ✅ sudah diperbaiki
            alt={item.product?.nameProduct ?? "Produk"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "http://localhost:5296/images/default.jpg"; // fallback jika gambar gagal
            }}
            className="w-20 h-20 object-cover rounded-xl"
          />
          <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {item.quantity}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{item.product?.nameProduct ?? "Produk"}</h3>
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 hover:bg-red-500/20 rounded-full transition-colors group"
            >
              <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
            </button>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
              {item.product?.category ?? "Kategori"}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-300">{item.product?.category ?? "Kategori"}</span>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-3">{item.product?.description ?? "-"}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <span className="text-white font-semibold min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              <span className="text-sm text-gray-400">
                Stok: {item.product?.stock ?? 0}
              </span>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">
                Rp {(item.product?.price ?? 0).toLocaleString()} x {item.quantity}
              </p>
              <p className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Rp {((item.product?.price ?? 0) * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderSummary = () => {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-6 space-y-6">
        {/* Ringkasan Pesanan */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Ringkasan Pesanan</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal ({cartItems.length} item)</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-green-400">
                <span>Diskon ({appliedCoupon.code})</span>
                <span>-Rp {discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-300">
              <span>Ongkos Kirim</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-green-400">Gratis</span>
                ) : (
                  `Rp ${shippingCost.toLocaleString()}`
                )}
              </span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Rp {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Kupon */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Kode Kupon</h4>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">{appliedCoupon.code}</span>
                <span className="text-sm text-gray-300">(-{appliedCoupon.discount}%)</span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Masukkan kode kupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold transition-colors"
              >
                Terapkan
              </button>
            </div>
          )}
        </div>

        {/* Informasi Pengiriman */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Truck className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Informasi Pengiriman</span>
          </div>
          <p className="text-sm text-gray-300">
            {shippingCost === 0
              ? "Gratis ongkir untuk pembelian di atas Rp 100.000"
              : "Estimasi pengiriman 2-3 hari kerja"}
          </p>
        </div>

        {/* Tombol Checkout */}
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className={`w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${checkoutLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>{checkoutLoading ? 'Memproses...' : 'Checkout Sekarang'}</span>
        </button>
      </div>
    );
  };

  const EmptyCart = () => (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">🛒</div>
      <h3 className="text-3xl font-bold text-gray-300 mb-4">Keranjang Belanja Kosong</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Sepertinya Anda belum menambahkan produk ke keranjang. Yuk mulai berbelanja!
      </p>
      <button onClick={() => navigate("/produk")}
        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Mulai Belanja</span>
      </button>
    </div>
  );
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
        <div className="pt-20 pb-12 px-6">
          <div className="container mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Keranjang Belanja
              </h1>
              <p className="text-xl text-gray-300">
                Kelola produk pilihan Anda sebelum checkout
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-green-400">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Pembayaran Aman</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Pengiriman Cepat</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Package className="w-5 h-5" />
                <span className="text-sm">Kualitas Terjamin</span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <LoadingCard key={i} />
                  ))}
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-fit">
                  <div className="h-6 bg-white/10 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-white/10 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Item di Keranjang
                      <span className="text-purple-400 ml-2">({cartItems.length})</span>
                    </h2>
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Lanjut Belanja</span>
                    </button>
                  </div>


                  {cartItems.map((item, index) => (

                    <CartItem key={item.id || index} item={item} />
                  ))}
                </div>

                {/* Order Summary */}
                <div>
                  <OrderSummary />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;