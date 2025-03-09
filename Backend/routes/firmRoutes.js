
const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firmController");  // Import all functions
const verifyToken = require("../middlewares/verifyToken"); // Ensure correct middleware path

//  Add a new firm (protected route)
router.post("/add-firm", verifyToken, firmController.uploads.single("image"), firmController.addFirm);

// Delete a firm by ID (protected route)
router.delete("/:firmId", verifyToken, firmController.deleteFirmById);

// Get all firms (public route)
router.get("/all-firms", firmController.getAllFirms);

module.exports = router;
