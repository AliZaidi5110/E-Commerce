import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const nav = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
  <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300" role="navigation">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={Logo} alt="BookStore Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              StudentStore
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
              Home
            </Link>
            {!user && (
              <Link to="/admin-login" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                Admin
              </Link>
            )}
            {user && user.role === "user" && (
              <>
                <Link to="/products" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                  Products
                </Link>
                <div className="relative">
                  <Link to="/cart" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 flex items-center space-x-1">
                    <span>Cart</span>
                    {cartItemCount > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </div>
                <Link to="/orders" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                  Orders
                </Link>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Link to="/admin" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                  Dashboard
                </Link>
                <Link
                  to="/manage-products"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  Products
                </Link>
                <Link to="/customers" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                  Customers
                </Link>
              </>
            )}
        </div>
      </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {user.name || "User"}
              </span>
            </div>
          )}

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!user && (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
              </>
            )}

            {/* Theme Toggle - Always visible */}
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 backdrop-blur-sm"
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user && (
              <button
                onClick={() => {
                  logout();
                  nav("/");
                }}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            )}
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 dark:text-gray-200 focus:outline-none p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="p-6 space-y-1">
          <Link
            to="/"
            onClick={toggleMenu}
            className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
          >
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/admin-login"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Admin
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center px-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {user.name || "User"}
              </span>
            </div>
          )}

          {user && user.role === "user" && (
            <>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Products
              </Link>
              <Link
                to="/cart"
                onClick={toggleMenu}
                className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link
                to="/orders"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Orders
              </Link>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link
                to="/admin"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/manage-products"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Manage Products
              </Link>
              <Link
                to="/customers"
                onClick={toggleMenu}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
              >
                Customers
              </Link>
            </>
          )}

          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
            </button>

            {user && (
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                  nav("/");
                }}
                className="flex items-center gap-3 w-full px-4 py-3 mt-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    )}
  </nav>
);

};

export default Navbar;