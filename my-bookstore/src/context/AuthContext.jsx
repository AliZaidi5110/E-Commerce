import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser(token);
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get("http://localhost:5001/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      console.error("Login error:", err);
      return { error: err.response?.data?.message || "Login failed" };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", { name, email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      console.error("Registration error:", err);
      return { error: err.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);