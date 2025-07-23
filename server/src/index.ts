import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Add this route to test if backend is live
app.get("/api", (req, res) => {
  res.json({ message: "API is working fine!" });
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo Error: ", err));

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on http://localhost:3001");
});
