import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await api.get("users/me/");
      setUser(res.data);
    } catch {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
