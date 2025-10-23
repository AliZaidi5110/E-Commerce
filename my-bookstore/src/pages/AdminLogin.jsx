import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login({ email, password });
    if (res.error) {
      setError(res.error);
    } else if (res.success) {
      // Check if user is admin
      if (res.user && res.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        setError("Access denied. Admin credentials required.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white mb-4">Admin Login</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
          Login
        </button>
        <p className="mt-2 text-gray-400">
          <Link to="/login" className="text-green-400">User Login</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;