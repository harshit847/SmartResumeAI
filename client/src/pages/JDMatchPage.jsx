import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import "../pages/styles/JDMatchPage.css";

export default function JDMatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [match, setMatch] = useState(null);

  const handleMatch = async () => {
    try {
      const res = await API.post("/resume/match-jd", { jobDescription });
      setMatch(res.data.matchPercentage);
      toast.success("JD match calculated!");
    } catch (err) {
      toast.error("Failed to calculate JD Match");
    }
  };

  return (
    <div className="jdmatch-container">
      <h2 className="jdmatch-heading">Match Resume with Job</h2>

      <textarea
        className="jdmatch-textarea"
        placeholder="Paste job description, e.g. React, Node.js, MongoDB..."
        value={jobDescription}
        rows={6}
        onChange={(e) => setJobDescription(e.target.value)}
      ></textarea>

      <button className="jdmatch-btn" onClick={handleMatch}>
        Check Match
      </button>

      {match !== null && (
        <p className="jdmatch-result">
          Match Score: <strong>{match}%</strong>
        </p>
      )}
    </div>
  );
}
