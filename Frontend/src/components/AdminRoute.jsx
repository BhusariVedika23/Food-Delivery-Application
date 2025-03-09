import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminRoute = ({ children }) => {
  const { admin } = useContext(AdminAuthContext);
  return admin ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
