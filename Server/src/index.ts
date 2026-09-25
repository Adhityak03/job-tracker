import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import User from "./models/User";
import authRouters from "./routes/authRouters";
import jobRouters from "./routes/jobRouters";
import errorHandler from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouters);
app.use("/api/jobs", jobRouters);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Job Tracker API running...");
});

const PORT = Number(process.env.PORT) || 5000;


const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });