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
          {!user && (
            <Link to="/admin-login" className="text-gray-900 dark:text-white">
              Admin
            </Link>
          )}
          {user && user.role === "user" && (
            <>
              <Link to="/products" className="text-gray-900 dark:text-white">
                Products
              </Link>
              <div className="relative">
                <Link to="/cart" className="text-gray-900 dark:text-white">
                  Cart
                </Link>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
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
              <Link
                to="/manage-products"
                className="text-gray-900 dark:text-white"
              >
                Manage Products
              </Link>
              <Link to="/customers" className="text-gray-900 dark:text-white">
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
          <span className="text-gray-900 dark:text-white font-medium">
            {user.name || "User"}
          </span>
        )}

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

          {user && (
            <>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none"
              >
                {isDarkMode ? "Light" : "Dark"} Mode
              </button>
              <button
                onClick={() => {
                  logout();
                  nav("/");
                }}
                className="px-3 text-gray-900 dark:text-white focus:outline-none"
              >
                Logout
              </button>
            </>
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
            <Link
              to="/admin-login"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
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
            <Link
              to="/manage-products"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
            >
              Manage Products
            </Link>
            <Link
              to="/customers"
              onClick={toggleMenu}
              className="block text-gray-900 dark:text-white"
            >
              Customers
            </Link>
          </>
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