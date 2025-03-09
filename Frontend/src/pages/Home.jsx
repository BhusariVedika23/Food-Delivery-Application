
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]); // Stores all restaurants
  const [products, setProducts] = useState([]); // Stores products of selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Selected restaurant
  const { user } = useContext(AuthContext);
  const { cart, addToCart } = useContext(CartContext);

  // 🔹 Fetch Restaurants on Load
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:4000/firm/all-firms");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // 🔹 Fetch Products when a Restaurant is clicked
  const handleSelectRestaurant = async (restaurant) => {
    console.log("Selected Restaurant:", restaurant); // Debugging
  
    const firmId = restaurant.firmId || restaurant._id; // Use `_id` as fallback
  
    if (!firmId) {
      console.error("firmId missing in restaurant object:", restaurant);
      return;
    }
  
    setSelectedRestaurant(restaurant); // Update UI with selected restaurant
  
    try {
      const response = await axios.get(
        `http://localhost:4000/product/${firmId}/products` // Use firmId or _id
      );
      console.log("API Response:", response.data); // Debugging
  
      if (response.data && response.data.products) {
        setProducts(response.data.products); // Update products state
      } else {
        console.error("Unexpected API response format:", response.data);
        setProducts([]); // Prevent undefined issues
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };
  
  return (
    <Container className="mt-5 pt-4">
    
      <div className="mb-4">
        <div style={{ position: "relative" }}>
          <img
            src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
            className="img-fluid w-100"
            alt="Banner"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            <h1 className="fw-bold" style={{ fontSize: "3rem" }}>
              <i>
                <u>Welcome</u>
              </i>
            </h1>
            <h1 className="fw-bold" style={{ fontSize: "3rem" }}>
              <i>
                <u>Discover The Best Food With Us</u>
              </i>
            </h1>
          </div>
        </div>
      </div>

      {/* 🔹 Restaurants Section */}
      <h2 className="mt-4 mb-3 fw-bold" style={{ fontSize: "2rem" }}>
        Top Restaurants
      </h2>
      <Row>
        {restaurants.map((restaurant) => (
          <Col md={4} key={restaurant._id} className="mb-4">
            <Card
              className="shadow border-0"
              onClick={() => handleSelectRestaurant(restaurant)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:4000/uploads/${restaurant.image}`} // Restaurant Image
                alt={restaurant.firmName}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{restaurant.firmName}</Card.Title>
                <Card.Text className="text-muted">{restaurant.area}</Card.Text>
                <Card.Text className="text-success">{restaurant.offer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔹 Products of Selected Restaurant */}
      {selectedRestaurant && (
        <div className="mt-5">
          <h3 className="fw-bold">{selectedRestaurant.firmName} - Products</h3>
          {products.length > 0 ? (
            <Row>
              {products.map((product) => (
                <Col md={3} key={product._id} className="mb-3">
                  <Card className="shadow-sm">
                    {/* Product Image */}
                    <Card.Img
                    variant="top"
                    src={`http://localhost:4000/uploads/${product.image}`} // Dynamically set image URL
                    alt={product.productName}
                    style={{ height: "150px", objectFit: "cover" }}
                    />


                    <Card.Body>
                      <Card.Title>{product.productName}</Card.Title>
                      <Card.Text>₹{product.price}</Card.Text>
                      <Card.Text className="text-muted">{product.description}</Card.Text>
                      <Button variant="success" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted">No products available</p>
          )}
        </div>
      )}

      {/* 🔹 Cart Section */}
      {cart.length > 0 && (
        <div className="mt-5">
          <h3 className="fw-bold">Cart</h3>
          <ListGroup>
            {cart.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between">
                <span>{item.productName} - ₹{item.price}</span>
                <Button variant="danger" size="sm" onClick={() => addToCart(item)}>
                  Add
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      <Footer />
    </Container>
  );
};

export default Home;
