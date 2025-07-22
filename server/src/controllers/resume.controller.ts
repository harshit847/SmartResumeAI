import { CohereClient } from "cohere-ai";
import { Request, Response } from "express";
import pdfParse from "pdf-parse";
import ResumeModel from "../models/resume.model";
import dotenv from "dotenv";
import { generatePDF } from "../utils/generatePdf";
import { getResumeReportHTML } from "../utils/reportTemplate";
import { scoreResume } from "../utils";
import similarity from "string-similarity";
dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "",
});

export const analyzeResume = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const fileBuffer = req.file?.buffer;
    if (!fileBuffer) return res.status(400).json({ message: "No file uploaded" });
    let extractedText = "";

    try {
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;
    } catch (err) {
      if (err instanceof Error) {
        console.error("PDF parse error:", err.message);
      } else {
        console.error("PDF parse error:", err);
      }

      return res.status(400).json({ message: "Invalid or corrupted PDF file" });
    }

    await ResumeModel.findOneAndDelete({ userId: req.userId });

    const response = await cohere.chat({
      model: "command-r",
      message: `You are an expert resume reviewer. Analyze the following resume content and give resume improvement suggestions in clear numbered format (1., 2., 3., ...). 
Make sure each point is separated by a new line. No paragraph merging.\n\n${extractedText}`,
    });

    const suggestions = response.text;

    const { score, breakdown } = scoreResume(extractedText);

    const saved = await ResumeModel.create({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const downloadResumeReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Resume ID is missing or invalid" });
    }

    const resume = await ResumeModel.findById(id).populate("userId");

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    
    const name = "Harshit Rai";
    const email = "harshitrai331@gmail.com";
    const html = getResumeReportHTML(name, email, resume.score, resume.breakdown, resume.suggestions);
    const pdf = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Resume-Report-${id}.pdf"`,
    });

    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};
export const matchResumeWithJD = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription)
      return res.status(400).json({ message: "Job description is required" });

    const resume = await ResumeModel.findOne({ userId: req.userId });
    if (!resume)
      return res.status(404).json({ message: "No resume found for this user" });

    const normalize = (text: string) =>
      text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);

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

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
