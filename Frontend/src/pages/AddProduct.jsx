
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [firmId, setFirmId] = useState(""); // Selected firm ID
  const [firmIds, setFirmIds] = useState([]); // List of firm IDs from localStorage
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  
  const addFirmIdToLocalStorage = (newFirmId) => {
    let storedFirmIds = JSON.parse(localStorage.getItem("firmIds")) || [];
    if (!storedFirmIds.includes(newFirmId)) {
      storedFirmIds.push(newFirmId);
      localStorage.setItem("firmIds", JSON.stringify(storedFirmIds));
      setFirmIds(storedFirmIds); // Update state
    }
  };

  useEffect(() => {
    const storedFirmIds = JSON.parse(localStorage.getItem("firmIds")) || [];
    setFirmIds(Array.isArray(storedFirmIds) ? storedFirmIds : []);
  }, []);
  

  
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!firmId) {
      setErrorMessage("Please select a Firm ID.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("bestseller", bestseller);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/product/add-product/${firmId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Product added successfully!");
        setProductName("");
        setPrice("");
        setCategory("");
        setBestseller(false);
        setDescription("");
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error adding product. Try again.");
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
                    <p className="text-center h1 fw-bold mb-4">Add Product</p>

                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={handleAddProduct}
                      encType="multipart/form-data"
                    >
                     
                      <div className="mb-3">
                        <label className="form-label">Select Firm</label>
                        <select
                          className="form-control"
                          value={firmId}
                          onChange={(e) => setFirmId(e.target.value)}
                          required
                        >
                          {firmIds.length === 0 ? (
                            <option value="">No Firm IDs Found</option>
                          ) : (
                            firmIds.map((id, index) => (
                              <option key={index} value={id}>{id}</option>
                            ))
                          )}
                        </select>
                      </div>

                      
                      <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter product name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                        />
                      </div>

                     
                      <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
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
                        <label className="form-label">Bestseller</label>
                        <input
                          type="checkbox"
                          className="form-check-input ms-2"
                          checked={bestseller}
                          onChange={(e) => setBestseller(e.target.checked)}
                        />
                      </div>

                     
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                      </div>

              
                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Add Product
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="/head_image.jpg"
                      className="img-fluid"
                      alt="Product Illustration"
                    />
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

export default AddProduct;
