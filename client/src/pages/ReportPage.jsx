import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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
      } catch (err) {
        console.error("Error fetching report:", err);
      }
    };

    if (resumeId) fetchReport();
  }, [resumeId]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfURL;
    a.download = "resume-report.pdf";
    a.click();
  };

  return (
    <>
    
    <Box sx={{ textAlign: "center", mt: 6, px: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" sx={{width:400, mr:67}} onClick={() => navigate("/match")}>
          Match with JD
        </Button>
      </Box>

      <Typography variant="h5" mb={2}>
        Resume Report
      </Typography>

      {pdfURL && (
        <iframe
          src={pdfURL}
          title="PDF Preview"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "500px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        ></iframe>
      )}

      <br />

      <Button
        variant="contained"
        sx={{ mt: 2 ,mb:2, width:400 }}
        onClick={handleDownload}
        disabled={!pdfURL}
      >
        Download PDF
      </Button>
    </Box>
    </>
  );
}
