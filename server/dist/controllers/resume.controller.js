"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchResumeWithJD = exports.downloadResumeReport = exports.analyzeResume = void 0;
const cohere_ai_1 = require("cohere-ai");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const resume_model_1 = __importDefault(require("../models/resume.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const generatePdf_1 = require("../utils/generatePdf");
const reportTemplate_1 = require("../utils/reportTemplate");
const utils_1 = require("../utils");
dotenv_1.default.config();
const cohere = new cohere_ai_1.CohereClient({
    token: process.env.COHERE_API_KEY || "",
});
const analyzeResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const fileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        if (!fileBuffer)
            return res.status(400).json({ message: "No file uploaded" });
        let extractedText = "";
        try {
            const pdfData = yield (0, pdf_parse_1.default)(fileBuffer);
            extractedText = pdfData.text;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error("PDF parse error:", err.message);
            }
            else {
                console.error("PDF parse error:", err);
            }
            return res.status(400).json({ message: "Invalid or corrupted PDF file" });
        }
        yield resume_model_1.default.findOneAndDelete({ userId: req.userId });
        const response = yield cohere.chat({
            model: "command-r",
            message: `You are an expert resume reviewer. Analyze the following resume content and give resume improvement suggestions in clear numbered format (1., 2., 3., ...). 
Make sure each point is separated by a new line. No paragraph merging.\n\n${extractedText}`,
        });
        const suggestions = response.text;
        const { score, breakdown } = (0, utils_1.scoreResume)(extractedText);
        const saved = yield resume_model_1.default.create({
            userId: req.userId,
            extractedText,
            suggestions,
            score,
            breakdown,
        });
        res.status(200).json({
            message: "Resume analyzed and saved",
            resume: saved,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.analyzeResume = analyzeResume;
const downloadResumeReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || id === "undefined") {
            return res.status(400).json({ message: "Resume ID is missing or invalid" });
        }
        const resume = yield resume_model_1.default.findById(id).populate("userId");
        if (!resume)
            return res.status(404).json({ message: "Resume not found" });
        const name = "Harshit Rai";
        const email = "harshitrai331@gmail.com";
        const html = (0, reportTemplate_1.getResumeReportHTML)(name, email, resume.score, resume.breakdown, resume.suggestions);
        const pdf = yield (0, generatePdf_1.generatePDF)(html);
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="Resume-Report-${id}.pdf"`,
        });
        res.send(pdf);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error generating PDF" });
    }
});
exports.downloadResumeReport = downloadResumeReport;
const matchResumeWithJD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription)
            return res.status(400).json({ message: "Job description is required" });
        const resume = yield resume_model_1.default.findOne({ userId: req.userId });
        if (!resume)
            return res.status(404).json({ message: "No resume found for this user" });
        const normalize = (text) => text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
        const jdWords = [...new Set(normalize(jobDescription))];
        const resumeWords = new Set(normalize(resume.extractedText));
        const matchedWords = jdWords.filter(word => resumeWords.has(word));
        const matchPercentage = jdWords.length > 0
            ? Math.round((matchedWords.length / jdWords.length) * 100)
            : 0;
        res.status(200).json({
            message: "Word-based JD match calculated successfully",
            jdWords,
            matchedWords,
            matchPercentage,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.matchResumeWithJD = matchResumeWithJD;
