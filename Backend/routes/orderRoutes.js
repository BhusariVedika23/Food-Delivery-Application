const express = require("express");
const router = express.Router();
const { getOrderHistory } = require("../controllers/orderController");

router.get("/order-history", getOrderHistory); // ✅ Route to fetch order history

module.exports = router;