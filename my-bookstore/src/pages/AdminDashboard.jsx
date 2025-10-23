import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const menuItems = [
    { title: "Manage Products", path: "/manage-products" },
    { title: "View Customers", path: "/customers" },
    { title: "View Orders", path: "/orders" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mb-10">
          Manage your products, customers, and orders efficiently.
        </p>

        {/* Dashboard Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="group relative bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h2 className="text-xl font-semibold mb-2 relative z-10">
                {item.title}
              </h2>
              <p className="text-gray-400 text-sm relative z-10 group-hover:text-gray-300">
                Click to manage {item.title.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
