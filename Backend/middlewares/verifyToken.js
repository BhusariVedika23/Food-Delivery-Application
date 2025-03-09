
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);

        if (!decoded.vendorId) {
            return res.status(403).json({ error: "Invalid token payload." });
        }

        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found. Invalid token." });
        }

        req.vendor = vendor; // Attach vendor object
        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ error: "Token expired. Please log in again." });
        }
        return res.status(403).json({ error: "Invalid or malformed token." });
    }
};

module.exports = verifyToken;



