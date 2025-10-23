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
  <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300" role="navigation">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={Logo} alt="BookStore Logo" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          {!user && (
            <Link to="/admin-login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Admin
            </Link>
          )}
          {user && user.role === "user" && (
            <>
              <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Products
              </Link>
              <div className="relative">
                <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cart
                </Link>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <Link to="/orders" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Orders
              </Link>
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
              <Link
                to="/manage-products"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Manage Products
              </Link>
              <Link to="/customers" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Customers
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Show user name on ALL screens */}
        {user && (
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {user.name || "User"}
          </span>
        )}

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user && (
            <>
              <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Register
              </Link>
            </>
          )}

          {/* Theme Toggle - Always visible */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
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
          </button>

          {user && (
            <button
              onClick={() => {
                logout();
                nav("/");
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu Button (mobile only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden mt-3 space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-lg">
        <Link
          to="/"
          onClick={toggleMenu}
          className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
        >
          Home
        </Link>

        {!user && (
          <>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/admin-login"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Admin
            </Link>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <Link
              to="/products"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Cart ({cartItemCount})
            </Link>
            <Link
              to="/orders"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
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
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/manage-products"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Manage Products
            </Link>
            <Link
              to="/customers"
              onClick={toggleMenu}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors"
            >
              Customers
            </Link>
          </>
        )}

        {/* Theme Toggle - Always visible in mobile */}
        <button
          onClick={() => {
            toggleTheme();
            toggleMenu();
          }}
          className="flex items-center gap-2 w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
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
          {isDarkMode ? "Light" : "Dark"} Mode
        </button>

        {user && (
          <button
            onClick={() => {
              logout();
              toggleMenu();
              nav("/");
            }}
            className="block w-full text-left px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    )}
  </nav>
);

};

export default Navbar;