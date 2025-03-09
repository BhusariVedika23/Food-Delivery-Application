
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminToken");
    if (storedAdmin) {
      setAdmin(true);
    }
  }, []);

  const adminLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setAdmin(true);
    navigate("/admin");
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(false);
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
