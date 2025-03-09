const Order = require("../models/Order");
const Firm = require("../models/Firm");

const getOrderHistory = async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from request query

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch orders associated with the user
        const orders = await Order.find({ user: userId }).populate("restaurant");

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getOrderHistory };
