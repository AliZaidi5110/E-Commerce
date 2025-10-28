import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { FaBars, FaTimes, FaUser, FaChevronDown, FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const nav = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
  <nav className="dark:bg-gray-800 shadow p-4" role="navigation">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={Logo} alt="BookStore Logo" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-900 dark:text-white">
            Home
          </Link>
          {user && user.role === "user" && (
            <>
              <Link to="/products" className="text-gray-900 dark:text-white">
                Products
              </Link>
              <Link to="/orders" className="text-gray-900 dark:text-white">
                Orders
              </Link>
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin" className="text-gray-900 dark:text-white">
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user && (
            <>
              <Link to="/login" className="text-gray-900 dark:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-900 dark:text-white">
                Register
              </Link>
            </>
          )}

          {/* Cart Icon for Users */}
          {user && user.role === "user" && (
            <Link 
              to="/cart" 
              className="relative text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              title="Shopping Cart"
            >
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                title={user.name || "User"}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <FaChevronDown className={`text-sm transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      toggleTheme();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? "Light" : "Dark"} Mode
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      nav("/");
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu Button (mobile only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden mt-3 space-y-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <Link
          to="/"
          onClick={toggleMenu}
          className="block text-gray-900 dark:text-white"
        >
          Home
        </Link>

        {!user && (
          <>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
            >
              Register
            </Link>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <Link
              to="/products"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
            >
              Products
            </Link>
            <Link
              to="/cart"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
            >
              Cart ({cartItemCount})
            </Link>
            <Link
              to="/orders"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
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
              className="block text-gray-900 dark:text-white"
            >
              Dashboard
            </Link>
          </>
        )}

        {user && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {user && (
          <>
            <button
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="block w-full text-left px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded"
            >
              {isDarkMode ? "Light" : "Dark"} Mode
            </button>
            <button
              onClick={() => {
                logout();
                toggleMenu();
                nav("/");
              }}
              className="block w-full text-left text-gray-900 dark:text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    )}
  </nav>
);

};

export default Navbar;