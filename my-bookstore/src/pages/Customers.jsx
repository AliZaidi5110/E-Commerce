import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "lucide-react";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            A list of all users currently registered in your system.
          </p>
        </div>

        {/* Table-like layout */}
        {users.length > 0 ? (
          <div className="overflow-x-auto bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-gray-700/40 transition-all duration-300"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                        <User size={18} />
                      </div>
                      <span className="font-semibold text-white">{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                          user.role === "admin"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600"
                            : "bg-gradient-to-r from-green-600 to-teal-600"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10 text-lg">
            No customers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Customers;
