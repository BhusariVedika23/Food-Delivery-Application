import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/order-history?userId=${user.userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    if (user?.userId) {
      fetchOrders();
    }
  }, [user]);

  return (
    <Container>
      <h1>Order History</h1>
      <h1><center>Your Orders</center></h1>
      {orders.length === 0 ? <h5><center>No orders found..!</center></h5> : (
        orders.map((order) => (
          <div key={order._id} className="border p-3 mb-3">
            <p><strong>Restaurant:</strong> {order.restaurant?.name || "N/A"}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> ₹{order.totalAmount}</p>
            <h5>Items:</h5>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;
