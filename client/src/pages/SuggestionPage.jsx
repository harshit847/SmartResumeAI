// src/pages/SuggestionPage.tsx
import { useNavigate } from "react-router-dom";
import "../pages/styles/Suggestions.css";
import { TypeAnimation } from "react-type-animation";

export default function SuggestionPage() {
  const navigate = useNavigate();

  return (
    <>
      <TypeAnimation
        sequence={[
          "Suggestions Generated!✨",
          2500,
          "Your report is being ready!🔥",
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
      <div className="suggestion-box">
        <h2 className="suggestion-title">Resume Suggestions</h2>
        <p className="suggestion-subtext">Your resume has been analyzed.</p>

        <button
          className="suggestion-report-btn"
          onClick={() => navigate("/report")}
        >
          View Report
        </button>
      </div>
    </>
  );
}
