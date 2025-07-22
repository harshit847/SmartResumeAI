"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/resume.routes.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const resume_controller_1 = require("../controllers/resume.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const resume_controller_2 = require("../controllers/resume.controller");
const resume_controller_3 = require("../controllers/resume.controller");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = express_1.default.Router();
router.post("/upload", auth_middleware_1.verifyToken, upload.single("resume"), resume_controller_1.analyzeResume);
router.get("/download-report/:id", resume_controller_2.downloadResumeReport);
router.post("/match-jd", auth_middleware_1.verifyToken, resume_controller_3.matchResumeWithJD);
exports.default = router;
