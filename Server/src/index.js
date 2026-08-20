const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const User = require("./models/User");
const authRouters = require("./routes/authRouters");
const jobRouters = require("./routes/jobRouters");
const errorHandler = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouters);
app.use("/api/jobs", jobRouters);

// Error handler
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
  res.send("Job Tracker API running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });