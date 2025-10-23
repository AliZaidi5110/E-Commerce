import React from "react";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-6 mt-auto border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center mb-6">
          <img src={Logo} alt="StudentStore Logo" className="h-10 w-auto" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About StudentStore</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your one-stop shop for quality books. Browse, shop, and manage your collection with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/products" className="hover:text-gray-900 dark:hover:text-white transition-colors">Products</a></li>
              <li><a href="/cart" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cart</a></li>
              <li><a href="/orders" className="hover:text-gray-900 dark:hover:text-white transition-colors">Orders</a></li>
              <li><a href="/admin" className="hover:text-gray-900 dark:hover:text-white transition-colors">Admin</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: support@studentstore.com<br />
              Phone: +92-123-4567890<br />
              Address: 123 Book Lane, Karachi, Pakistan
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} StudentStore. All rights reserved. | 
            Current Time: {new Date().toLocaleTimeString("en-PK", { timeZone: "Asia/Karachi" })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;