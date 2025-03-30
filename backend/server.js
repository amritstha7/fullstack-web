// backend/server.js
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Import routes file

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/employees")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Use auth routes
app.use("/api/auth", authRoutes);  // Use the routes for auth

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
