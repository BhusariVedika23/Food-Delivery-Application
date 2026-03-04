
import React, { useState, useContext } from "react";
import axios from "axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const { adminLogin } = useContext(AdminAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/vendor/login`, {
        email,
        password,
      });

      console.log("Admin Login Response:", response.data); 

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); 
        adminLogin(response.data.token);

        let firmIds = response.data.firmId;

       
        if (typeof firmIds === "string") {
          firmIds = firmIds.split(",");
        }

        localStorage.setItem("firmIds", JSON.stringify(firmIds));
        console.log("Stored Firm IDs:", firmIds); 
      }
    } catch (error) {
      console.error("Admin Login failed:", error.response?.data || error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#c6faa5" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5">Admin Log in</p>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleLogin}>
                      <div className="mb-4">
                        <label className="form-label">Your Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="/head_image.jpg" className="img-fluid" alt="Sample" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;

