import React, { useState } from 'react';
import { Menu, X, Leaf, Home, Package, Info, User, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-3xl transition-all duration-500 ease-in-out transform ${
      isActive
        ? "bg-purple-700 text-white font-bold"
        : "hover:text-purple-200 hover:scale-105 font-bold"
    }`;

  return (
    <nav className="bg-purple-900/80 fixed w-full text-white shadow-lg z-50 mx-auto rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <Leaf className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <span className="font-bold text-xl">Perkebunan</span>
              <span className="text-purple-200 text-sm block -mt-1">Nusantara</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </NavLink>
            <NavLink to="/ViewProduct" className={navLinkClass}>
              <Package className="w-4 h-4" />
              <span>Produk</span>
            </NavLink>
            <NavLink to="/TentangKami" className={navLinkClass}>
              <Info className="w-4 h-4" />
              <span>Tentang</span>
            </NavLink>
            <NavLink to="/Chart" className={navLinkClass}>
              <ShoppingCart className="w-4 h-4" />
              <span>Keranjang</span>
            </NavLink>
          </div>

          {/* Login Button & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-400 hover:to-purple-300 text-white px-6 py-2 rounded-full transition-all duration-500 transform hover:scale-105 shadow-md">
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>

            <button
              className="md:hidden p-2 rounded-md hover:bg-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-purple-800 bg-opacity-95 rounded-lg mt-2 p-4 space-y-4">
            <NavLink to="/" className={navLinkClass}>
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </NavLink>
            <NavLink to="/produk" className={navLinkClass}>
              <Package className="w-5 h-5" />
              <span>Produk</span>
            </NavLink>
            <NavLink to="/tentang" className={navLinkClass}>
              <Info className="w-5 h-5" />
              <span>Tentang</span>
            </NavLink>
            <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-400 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-purple-300 transition-all">
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
