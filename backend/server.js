const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());
// MongoDB connection
mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => {
      console.log("Connected to MongoDB");
   })
   .catch((err) => {
      console.error("MongoDB connection error:", err);
   });
// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
   res.send("Welcome to the backend server!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
