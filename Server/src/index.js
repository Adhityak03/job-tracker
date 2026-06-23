const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");


// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Job Tracker API running...");
});

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const createUser=async () => {
        try{
            const user =await User.create(
                {
                    name: "Adhitya",
                    email: "adhitya@test.com",
                    password: "123456"
                }
            )
            console.log("User created:", user);
        }
        catch (error) {
        console.log(error.message);
    }
    }


    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });