
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const [firms, setFirms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Unauthorized! Please Login First.");
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
      return;
    }

    axios
      .get(`${BASE_URL}/firm/all-firms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFirms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching firms:", error.response?.data || error.message);
        setErrorMessage("Failed to fetch firms.");
      });
  }, []);

  return (
    
<div className="container py-5" style={{ backgroundColor: "#c6faa5", minHeight: "100vh" }}>
  <div className="p-4 shadow-lg rounded bg-$yellow-100">
    <h1 className="text-center mb-4 text-dark fw-bold">Admin Panel</h1>

    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

    <h2 className="text-primary mb-4">Firms List</h2>

    <div className="list-group">
      {firms.map((firm) => (
        <div key={firm._id} className="card mb-3 shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#007bff",
                  fontSize: "18px",
                }}
              >
                {firm.firmName.charAt(0).toUpperCase()}
              </div>
              <div className="ms-3">
                <h5 className="mb-0">{firm.firmName}</h5>
                <small className="text-muted"></small>
              </div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


  );
};

export default AdminPanel;




