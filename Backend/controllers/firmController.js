const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const uploads = multer({ storage: storage });
const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Use `req.vendor._id` instead of `req.vendorId`
        if (!req.vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: req.vendor._id, //  Corrected
        });

        const savedFirm = await firm.save();

        req.vendor.firm.push(savedFirm);
        await req.vendor.save();

        return res.status(201).json({ message: "Firm added successfully!", firm: savedFirm });
    } catch (error) {
        console.error("Error adding firm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ error: "No firm found" });
        }

        return res.status(200).json({ message: "Firm deleted successfully!" });
    } catch (error) {
        console.error("Error deleting firm:", error);
        res.status(500).json({ error: "Internal Server error" });
    }
};

const getAllFirms = async (req, res) => {
    try {
        const firms = await Firm.find();
        res.status(200).json(firms);
    } catch (error) {
        console.error("Error fetching firms:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Export functions separately (not as an array)
module.exports = {
    addFirm,
    deleteFirmById,
    getAllFirms,
    uploads, // Export upload separately for use in routes
};

