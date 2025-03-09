const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// Import Routes
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');

const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((error) => console.log(error));


// Use Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Green Bites 🌿</h1>");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

