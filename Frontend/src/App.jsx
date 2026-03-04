
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";
import OrderHistory from "./pages/OrderHistory";
import AdminPanel from "./pages/AdminPanel";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AddRestaurant from "./pages/AddRestaurant";
import AddProduct from "./pages/AddProduct";
import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
//import VendorDashboard from "./pages/VendorDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminAuthProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderHistory />} />

           
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-restaurant"
              element={
                <AdminRoute>
                  <AddRestaurant />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AdminAuthProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
