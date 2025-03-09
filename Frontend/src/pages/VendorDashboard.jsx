import React, { useState, useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { Link } from "react-router-dom"; 

const VendorDashboard = () => {
  const { admin } = useContext(AdminAuthContext);

  const handleAlert = () => {
    alert("Please login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div
        style={{
          width: "200px",
          backgroundColor: "#fa2d2d",
          color: "white",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          
          <img
            src="" 
            alt=" Logo"
            style={{ width: "100px", height: "auto" }} 
          />
        </div>

        
        <Link
          to="/admin/login"
          style={{
            marginBottom: "10px",
            color: "white",
            display: "block",
            textDecoration: "none",
          }}
        >
          Admin Login
        </Link>
        <Link
          to="/admin/signup"
          style={{
            marginBottom: "10px",
            color: "white",
            display: "block",
            textDecoration: "none",
          }}
        >
          Admin Signup
        </Link>

       
        <div
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={handleAlert}
        >
          Add Restaurant
        </div>
        <div
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={handleAlert}
        >
          Add Product
        </div>
        <div
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={handleAlert}
        >
          All Products
        </div>
        <div
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={handleAlert}
        >
          User Details
        </div>
      </div>

      
      <div style={{ flex: 1, padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Vendor Dashboard</div>
          <div>Firname: {}</div>
          <div>Login / Register</div>
        </div>
        <div style={{ height: "500px", backgroundColor: "white" }}>
          {}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;