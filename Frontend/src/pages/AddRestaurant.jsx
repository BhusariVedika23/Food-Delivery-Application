
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleAddFirm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Get token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You are not logged in. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const formData = new FormData();
    formData.append("firmName", firmName);
    formData.append("area", area);
    formData.append("category", category);
    formData.append("region", region);
    formData.append("offer", offer);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:4000/firm/add-firm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.status === 201) {
        alert("Firm added successfully!");
        setFirmName("");
        setArea("");
        setCategory("");
        setRegion("");
        setOffer("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);

      if (!error.response) {
        setErrorMessage("Server is unreachable. Check if the backend is running.");
      } else if (error.response.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      } else if (error.response.status === 404) {
        setErrorMessage("API endpoint not found. Check backend routes.");
      } else {
        setErrorMessage(error.response.data?.message || "Error adding firm. Try again.");
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#c6faa5" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-9">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-4">Add Restaurant</p>

                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <form className="mx-1 mx-md-4" onSubmit={handleAddFirm} encType="multipart/form-data">
                      <div className="mb-3">
                        <label className="form-label">Restaurant Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter firm name"
                          value={firmName}
                          onChange={(e) => setFirmName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Area</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter area"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Region</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter region"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Offer</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter offer details"
                          value={offer}
                          onChange={(e) => setOffer(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Add Firm
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="/head_image.jpg" className="img-fluid" alt="Firm Illustration" />
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

export default AddFirm;




