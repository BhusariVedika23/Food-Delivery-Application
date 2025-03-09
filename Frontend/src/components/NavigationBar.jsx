import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AdminAuthContext } from "../context/AdminAuthContext";
import AdminSidebar from "./AdminSidebar";

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);
  const { admin } = useContext(AdminAuthContext);
  const [showAdminSidebar, setShowAdminSidebar] = useState(false);

  const toggleAdminSidebar = () => {
    setShowAdminSidebar(!showAdminSidebar);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-danger" to="/">
          <i className="fas fa-utensils pe-2"></i>GreenBites
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                <i className="fas fa-home pe-2"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/cart">
                <i className="fas fa-shopping-cart pe-2"></i>Cart
              </Link>
            </li>

            
            {admin && (
              <li className="nav-item">
                <button
                  className="nav-link text-dark btn btn-link"
                  onClick={toggleAdminSidebar}
                >
                  <i className="fas fa-user-shield pe-2"></i>Admin
                </button>
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/orders">
                    <i className="fas fa-box pe-2"></i>Order History
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link text-dark"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-sign-out-alt pe-2"></i>Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-3">
                  <Link className="btn btn-danger btn-rounded" to="/login">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="btn btn-outline-danger btn-rounded" to="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      {showAdminSidebar && <AdminSidebar onClose={toggleAdminSidebar} />}
    </nav>
  );
};

export default NavigationBar;