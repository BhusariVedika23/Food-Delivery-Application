import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/restaurants/${id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <Container>
      {restaurant ? (
        <>
          <h2>{restaurant.name}</h2>
          <p>⭐ {restaurant.rating}</p>
          <h4>Menu</h4>
          {restaurant.menu.map((item, index) => (
            <p key={index}>{item.name} - ${item.price}</p>
          ))}
        </>
      ) : <p>Loading...</p>}
    </Container>
  );
};

export default Restaurant;
