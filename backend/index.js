const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
app.use(cors({
  origin: ["*" , "http://localhost:5173","https://admin.freshfruitwala.co.in","https://fruitadmin.onrender.com","https://www.freshfruitwala.co.in","https://freshfruitwala.co.in" ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ['Authorization']

}))
app.use(express.json());
app.use(cookieParser());
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
// Admin
app.use('/api/v1/adminauth', require('./routes/adminRoutes/adminRoutes'));
app.use('/api/v1/admin/categories', require('./routes/adminRoutes/categoryRoutes'));
app.use('/api/v1/admin/products', require('./routes/adminRoutes/productRoutes'));
app.use('/api/v1/admin/banner', require('./routes/adminRoutes/bannerRoutes'));
// users
app.use('/api/v1/user/order', require('./routes/userRoutes/orderRoutes'));
app.use('/api/v1/auth', require('./routes/userRoutes/authRoutes'));
app.use('/api/v1/contactus', require('./routes/userRoutes/contactusRoutes'));
app.use('/api/v1/address', require('./routes/userRoutes/AdressRoutes'));
app.use('/api/v1/profile', require('./routes/userRoutes/userProfileRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
