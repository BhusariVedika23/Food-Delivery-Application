const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, name, price } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push({ productId, name, price });
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
});

// Get cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

module.exports = router;
