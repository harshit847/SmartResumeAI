import { Request, Response } from "express";
import pdfParse from "pdf-parse";
import ResumeModel from "../models/resume.model";
import dotenv from "dotenv";
import { generatePDF } from "../utils/generatePdf";
import { getResumeReportHTML } from "../utils/reportTemplate";
import { scoreResume } from "../utils";
import { CohereClient } from "cohere-ai";

dotenv.config();

/* -------- INIT COHERE -------- */
let cohere: CohereClient | null = null;

if (process.env.COHERE_API_KEY) {
  cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
  });
  console.log("✅ Cohere Initialized");
} else {
  console.log("⚠️ Cohere API Key Missing");
}

/* -------- FALLBACK SUGGESTIONS -------- */
const getFallbackSuggestions = () => {
  const tips = [
    "Improve your resume summary to be more role-specific.",
    "Add measurable achievements in your projects.",
    "Highlight your strongest technical skills first.",
    "Include links to GitHub and portfolio projects.",
    "Optimize your resume using job description keywords.",
    "Improve formatting for better ATS readability.",
    "Remove unnecessary personal information.",
    "Focus more on impact and results.",
    "Tailor your resume for each job role.",
    "Add relevant internships or certifications.",
  ];

  return tips.map((t, i) => `${i + 1}. ${t}`).join("\n");
};

/* -------- ANALYZE RESUME -------- */
export const analyzeResume = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const fileBuffer = req.file?.buffer;

    if (!fileBuffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    /* -------- PARSE PDF -------- */
    let extractedText = "";

    try {
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;

      if (!extractedText || extractedText.trim().length < 50) {
        return res.status(400).json({
          message: "Resume content too short or unreadable",
        });
      }
    } catch (err) {
      console.error("PDF Parse Error:", err);
      return res.status(400).json({ message: "Invalid PDF file" });
    }

    await ResumeModel.findOneAndDelete({ userId: req.userId });

    /* -------- AI + FALLBACK -------- */
    let suggestions = "";

    try {
      if (!cohere) {
        throw new Error("Cohere not initialized");
      }

      const trimmedText = extractedText.substring(0, 4000);

      const response = await cohere.chat({
        model: "command-a-03-2025",
        message: `You are an ATS resume expert.

Analyze this resume and give improvement suggestions
in numbered format.

${trimmedText}`,
        temperature: 0.7,
        maxTokens: 700,
      });

      console.log("RAW COHERE RESPONSE:", response);

      suggestions = response.text?.trim() || "";

      if (!suggestions) {
        throw new Error("Empty AI response");
      }

      console.log("✅ Cohere AI Used Successfully");

    } catch (aiErr) {
      console.error("AI ERROR:", aiErr);
      suggestions = getFallbackSuggestions();
    }

    /* -------- SCORE -------- */
    const { score, breakdown } = scoreResume(extractedText);

    /* -------- SAVE -------- */
    const savedResume = await ResumeModel.create({
      userId: req.userId,
      extractedText,
      suggestions,
      score,
      breakdown,
    });

    return res.status(200).json({
      message: "Resume analyzed successfully",
      resume: savedResume,
    });

  } catch (err) {
    console.error("Analyze Error:", err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/* -------- DOWNLOAD REPORT -------- */
export const downloadResumeReport = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const resume = await ResumeModel.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const name = "Harshit Rai";
    const email = "harshitrai331@gmail.com";

    const html = getResumeReportHTML(
      name,
      email,
      resume.score,
      resume.breakdown,
      resume.suggestions
    );

    const pdf = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume-${id}.pdf`,
    });

    res.send(pdf);

  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ message: "PDF error" });
  }
};

/* -------- MATCH JD -------- */
export const matchResumeWithJD = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "JD required" });
    }

    const resume = await ResumeModel.findOne({ userId: req.userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const normalize = (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    const jdWords = [...new Set(normalize(jobDescription))];
    const resumeWords = new Set(normalize(resume.extractedText));

    const matched = jdWords.filter((w) => resumeWords.has(w));

    const matchPercentage =
      jdWords.length > 0
        ? Math.round((matched.length / jdWords.length) * 100)
        : 0;

    return res.json({
      matchPercentage,
      matched,
    });

  } catch (err) {
    console.error("Match ERROR:", err);
    res.status(500).json({ message: "Match error" });
  }
};