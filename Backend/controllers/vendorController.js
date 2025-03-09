
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.JWT_SECRET;

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json({ error: "Email already taken" }); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        await newVendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
        console.log('Registered successfully');
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const vendorLogin = async (req, res) => {
     const { email, password } = req.body;
     try {
         const vendor = await Vendor.findOne({ email });
         if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
             return res.status(401).json({ error: "Invalid email or password" });
         }
 
         const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });
 
         // Ensure vendor has a firm (Assuming each vendor has only one firm)
         const firmId = vendor.firm ? vendor.firm.toString() : null;
 
         res.status(200).json({ success: "Login successful", token, firmId }); // ✅ Include firmId in response
         console.log(email, "this is token", token, "Firm ID:", firmId);
     } catch (error) {
         console.error("Login Error:", error.message);
         res.status(500).json({ error: "Internal Server Error" });
     }
 };
 

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors });
    } catch (error) {
        console.error("Fetching Vendors Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getVendorById = async (req, res) => {
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.status(200).json({ vendor });
    } catch (error) {
        console.error("Fetching Vendor by ID Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
