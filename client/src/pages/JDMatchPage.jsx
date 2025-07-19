import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import API from "../services/api";


export default function JDMatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [match, setMatch] = useState(null);

  const handleMatch = async () => {
    const res = await API.post("/resume/match-jd", { jobDescription });
    setMatch(res.data.matchPercentage);
  };

  return (
    <>
    <Box sx={{ width: 500, mx: "auto", mt: 10, p: 4, boxShadow: 3,bgcolor: "#fff" }}>
      <Typography variant="h5" mb={2}>Match Resume with Job</Typography>
      <TextField
        label="Paste Job Description"
        multiline
        rows={6}
        fullWidth
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleMatch}>
        Check Match
      </Button>
      {match !== null && (
        <Typography mt={2}>
          Match Score: <strong>{match}%</strong>
        </Typography>
      )}
    </Box>
    </>
  );
}
