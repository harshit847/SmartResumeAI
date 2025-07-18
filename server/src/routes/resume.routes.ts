// src/routes/resume.routes.ts
import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/resume.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { downloadResumeReport } from "../controllers/resume.controller";
import { matchResumeWithJD } from "../controllers/resume.controller";


const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/upload", verifyToken, upload.single("resume"), analyzeResume);

router.get("/download-report/:id", downloadResumeReport);

router.post("/match-jd", verifyToken, matchResumeWithJD);

export default router;
