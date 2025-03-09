import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card className="mb-3 shadow">
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>⭐ {restaurant.rating}</Card.Text>
        <Link to={`/restaurant/${restaurant._id}`} className="btn btn-primary">View Details</Link>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
