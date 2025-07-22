import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.routes";
import resumeRoutes from "./src/routes/resume.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes); 

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error: ", err));

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on http://localhost:3001");
});
