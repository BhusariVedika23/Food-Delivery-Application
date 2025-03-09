
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Container, ListGroup, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + Number(item.price), 0);
    setTotalPrice(total);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/orders", {
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1, 
        })),
        totalPrice,
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        clearCart();
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center text-dark"><b>Your Cart</b></h2>

      {cart.length === 0 ? (
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <Card className="p-3 shadow-sm">
              <p className="lead text-muted"><b>Your cart is empty...!</b></p>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <ListGroup>
  {cart.map((item, index) => (
    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
      <span><b>{item.productName}</b> - ₹{item.price}</span>
      <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>
        Remove
      </Button>
    </ListGroup.Item>
  ))}
</ListGroup>


          <Card className="p-3 mt-3 shadow-sm">
            <h4 className="text-end"><b>Total: ₹{totalPrice.toLocaleString()}</b></h4>
          </Card>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="outline-danger" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
