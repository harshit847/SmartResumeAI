// src/pages/ReportPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import "../pages/styles/ReportPage.css";

export default function ReportPage() {
  const [pdfURL, setPdfURL] = useState("");
  const resumeId = localStorage.getItem("resumeId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await API.get(`/resume/download-report/${resumeId}`, {
          responseType: "blob",
        });
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setPdfURL(fileURL);
        toast.success("Report downloaded!");
      } catch (err) {
        toast.error("Failed to download report.");
        console.error("Error fetching report:", err);
      }
    };

    fetchReport();
  }, [resumeId]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfURL;
    a.download = "resume-report.pdf";
    a.click();
  };

  return (
    <div className="report-container">
      <button className="report-match-btn" onClick={() => navigate("/match")}>
        Match with JD
      </button>

      <h2 className="report-heading">Resume Report</h2>

      {pdfURL && (
        <iframe
          src={pdfURL}
          title="PDF Preview"
          className="report-pdf-viewer"
        ></iframe>
      )}

      <button
        className="report-download-btn"
        onClick={handleDownload}
        disabled={!pdfURL}
      >
        Download PDF
      </button>
    </div>
  );
}
