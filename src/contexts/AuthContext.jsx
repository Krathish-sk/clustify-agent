import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const hostURL = "https://clustifyagent-backend.onrender.com";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("clustify-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Demo credentials short-circuit
    if (email === "demo@clustify.com" && password === "demo123") {
      const demoUser = {
        id: "1",
        name: "Demo User",
        email,
        joinDate: new Date().toISOString().split("T")[0],
      };
      localStorage.setItem("clustify-user", JSON.stringify(demoUser));
      setUser(demoUser);
      return true;
    }

    try {
      setIsLoading(true);

      const resp = await axios.post(`${hostURL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = resp.data;

      // Store in localStorage
      localStorage.setItem("clustify-token", token);
      localStorage.setItem("clustify-user", JSON.stringify(user));

      // Update state
      setUser(user);

      return true;
    } catch (error) {
      // Log detailed error info
      console.error("Login failed:", error);

      // Get human-readable message
      const message =
        error.response?.data?.error ||
        error.message ||
        "Something went wrong during login.";

      // Optionally show in UI (toast, alert, or state)
      alert(message); // For quick debugging

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setIsLoading(true);

      const res = await axios.post(`${hostURL}/api/auth/register`, {
        name,
        email,
        password,
      });

      const { token, user } = res.data;

      // Store them in localStorage
      localStorage.setItem("clustify-token", token);
      localStorage.setItem("clustify-user", JSON.stringify(user));

      // Update React state
      setUser(user);

      return true;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.error || error.message
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("clustify-user");
    localStorage.removeItem("clustify-token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
