import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Leaf,
  Home,
  Package,
  Info,
  User,
  ShoppingCart,
  PlusCircle,
  LogOut
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5296/api/User/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }

        const data = await response.json();
        setUser(data); // simpan data user ke state
      } catch (err) {
        console.error("Gagal ambil user:", err.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest("#user-dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-3xl transition-all duration-500 ease-in-out transform hover:scale-105 ${
      isActive 
        ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold shadow-lg shadow-orange-500/40" 
        : "text-gray-200 hover:text-orange-400 hover:bg-black/30 font-semibold hover:shadow-md hover:shadow-orange-500/20"
    }`;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 
                      ${isScrolled 
                        ? "bg-black-900/30 shadow-2xl shadow-black/50 backdrop-blur-xl border-b border-orange-600/30" 
                        : "bg-gradient-to-r from-orange-600/20 via-black/80 to-orange-600/20 shadow-xl shadow-black/30 backdrop-blur-lg border-b border-orange-500/20"
                      } 
                    text-white transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-full shadow-lg shadow-orange-500/40">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Perkebunan
                </span>
                <span className="text-gray-300 text-sm block -mt-1">Nusantara</span>
              </div>
            </div>

            <div className="hidden lgMobile:flex items-center space-x-4">
              <NavLink to="/" className={navLinkClass}><Home className="w-4 h-4" /><span>Beranda</span></NavLink>
              <NavLink to="/ViewProduct" className={navLinkClass}><Package className="w-4 h-4" /><span>Produk</span></NavLink>
              <NavLink to="/TentangKami" className={navLinkClass}><Info className="w-4 h-4" /><span>Tentang</span></NavLink>
              <NavLink to="/Cart" className={navLinkClass}><ShoppingCart className="w-4 h-4" /><span>Keranjang</span></NavLink>
              <NavLink to="/AddProductAdmin" className={navLinkClass}><PlusCircle className="w-4 h-4" /><span>AddData</span></NavLink>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="hidden lgMobile:flex items-center space-x-3 relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-gray-200 font-semibold hover:text-orange-400 transition-all duration-500 ease-in-out transform hover:scale-105 px-3 py-2 rounded-full hover:bg-black/30 hover:shadow-md hover:shadow-orange-500/20"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.username}</span>
                  </button>

                  {showDropdown && (
                    <div id="user-dropdown"
                      className="absolute right-0 mt-12 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-xl text-white shadow-2xl shadow-black/50 rounded-xl border border-orange-500/20 w-48 z-50 overflow-hidden">
                      <button
                        onClick={() => navigate('/Profile')}
                        className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-orange-500/20 transition-all duration-300 text-gray-200 hover:text-orange-400 font-medium"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-500/20 transition-all duration-300 hover:text-red-300 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

              ) : (
                <div className="flex items-center space-x-4">
                  <NavLink to="/Login" className="flex items-center text-orange-400 hover:text-orange-300 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-black/30 hover:shadow-md hover:shadow-orange-500/20">
                    <User className="w-4 h-4 mr-2" />
                    <span>Login</span>
                  </NavLink>
                  <span className="text-gray-500 font-bold">|</span>
                  <NavLink to="/Register" className="flex items-center text-orange-400 hover:text-orange-300 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-black/30 hover:shadow-md hover:shadow-orange-500/20">
                    <User className="w-4 h-4 mr-2" />
                    <span>Signup</span>
                  </NavLink>
                </div>
              )}

              <button
                className="lgMobile:hidden p-2 rounded-md text-orange-400 hover:text-orange-300 hover:bg-black/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-orange-500/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lgMobile:hidden fixed justify-center items-center w-full z-30 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl mt-20 p-6 space-y-3 shadow-2xl shadow-black/50 text-white border border-orange-500/20 mx-4">
          <NavLink to="/" className={navLinkClass}><Home className="w-5 h-5" /><span>Beranda</span></NavLink>
          <NavLink to="/ViewProduct" className={navLinkClass}><Package className="w-5 h-5" /><span>Produk</span></NavLink>
          <NavLink to="/TentangKami" className={navLinkClass}><Info className="w-5 h-5" /><span>Tentang</span></NavLink>
          <NavLink to="/Cart" className={navLinkClass}><ShoppingCart className="w-5 h-5" /><span>Keranjang</span></NavLink>
          <NavLink to="/AddProductAdmin" className={navLinkClass}><PlusCircle className="w-5 h-5" /><span>AddProduct</span></NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink
              to="/Login"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-3 rounded-xl hover:from-orange-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-105 font-semibold"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;