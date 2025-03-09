import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "60px", 
        left: 0,
        width: "200px",
        backgroundColor: "#c6faa5",
        padding: "20px",
        height: "100vh",
        zIndex: 1000,
      }}
    >
      <h2>Admin Options</h2>
      <div className="list-group">
        <Link
          to="/admin/login"
          className="list-group-item list-group-item-action"
          onClick={onClose} 
        >
          Admin Login
        </Link>
        <Link
          to="/admin/signup"
          className="list-group-item list-group-item-action"
          onClick={onClose} 
        >
          Admin Signup
        </Link>
        <Link
          to="/admin/add-restaurant"
          className="list-group-item list-group-item-action"
          onClick={onClose} 
        >
          Add Restaurant
        </Link>
        <Link
          to="/admin/add-product"
          className="list-group-item list-group-item-action"
          onClick={onClose} 
        >
          Add Product
        </Link>
        <Link
          to="/admin"
          className="list-group-item list-group-item-action"
          onClick={onClose}
        >
          Admin Panel
        </Link>
      </div>
      <button className="btn btn-danger mt-3" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AdminSidebar;