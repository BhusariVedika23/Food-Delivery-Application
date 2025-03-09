import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>💲{item.price}</Card.Text>
        <Button onClick={() => addToCart(item)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default MenuItem;