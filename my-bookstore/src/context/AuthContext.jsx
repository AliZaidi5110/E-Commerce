import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
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
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      // Try user login first
      let res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      let { token, user: userData } = res.data;
      
      // If user login fails, try admin login
      if (!userData) {
        res = await axios.post("http://localhost:5001/api/auth/admin-login", { email, password });
        const data = res.data;
        token = data.token;
        userData = data.admin || data.user;
      }
      
      localStorage.setItem("token", token);
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      // If user login failed, try admin login
      try {
        const adminRes = await axios.post("http://localhost:5001/api/auth/admin-login", { email, password });
        const { token, admin } = adminRes.data;
        localStorage.setItem("token", token);
        setUser(admin);
        return { success: true, user: admin };
      } catch (adminErr) {
        console.error("Login error:", err);
        return { error: "Invalid email or password" };
      }
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
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);