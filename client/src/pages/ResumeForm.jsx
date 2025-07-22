import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import "../pages/styles/ResumeForm.css";
import { TypeAnimation } from 'react-type-animation';


export default function ResumeForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);

    try {
      const res = await API.post("/resume/upload", formData);
      localStorage.setItem("resumeText", res.data.resume.extractedText);
      localStorage.setItem("resumeId", res.data.resume._id);
      localStorage.setItem("resumeSuggestions", res.data.resume.suggestions);
      toast.success("Resume uploaded and analyzed successfully! 🎉");
      navigate("/suggestions");
      console.log("Download resumeId:", id);
    } catch (err) {
      console.error("Upload failed.");
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TypeAnimation
        sequence={[
          "Upload Resume for Suggestions!✨",
          2500,
          "Get AI-powered Resume Insights!🔥",
          2500,
          "Make Your Resume Stand Out!🎯",
          2500,
          "",
        ]}
        wrapper="h2"
        cursor={true}
        repeat={Infinity}
        className="resume-type-heading"
      />
      <div className="resume-upload-container">

        <h2 className="resume-heading">Upload Resume</h2>

        <input
          type="file"
          className="resume-input"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept=".pdf,.doc,.docx"
        />

        <button
          className="resume-submit-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </>
  );
}
