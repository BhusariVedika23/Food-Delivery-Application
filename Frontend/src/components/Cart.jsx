import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cart]);

  const handleCheckout = () => {
    axios
      .post("http://localhost:5000/api/orders", { items: cart })
      .then(() => {
        alert("Order placed successfully!");
        clearCart();
        navigate("/orders");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some delicious food!</p>
      ) : (
        <>
          <Row>
            {cart.map((item) => (
              <Col md={4} key={item._id}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={item.image} alt={item.name} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ₹{item.price}</Card.Text>
                    <Card.Text>
                      Quantity: 
                      <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</Button>
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h2>Total Price: ₹{totalPrice}</h2>
          <Button variant="success" onClick={handleCheckout}>Checkout</Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
