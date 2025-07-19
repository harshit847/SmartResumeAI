import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Input,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

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
    } catch (err) {
      console.log("Upload failed.");
      toast.error("Upload failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <Box
      sx={{
        width: 400,
        margin: "auto",
        marginTop: 10,
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" mb={2}>
        Upload Resume
      </Typography>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
      </Button>
    </Box>
    </>
  );
}
