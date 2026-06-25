const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const User = require("./models/User");
const authRouters=require("../src/routes/authRouters")
const jobRouters=require("../src/routes/jobRouters")
const errorHandler = require("./middleware/errorMiddleware");


// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouters)
app.use("/api/jobs",jobRouters)
app.use(errorHandler);
// Test route
app.get("/", (req, res) => {
  res.send("Job Tracker API running...");
});

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");


    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });