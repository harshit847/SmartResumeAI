import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import API from "../services/api";
import { toast } from "react-toastify";


export default function JDMatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [match, setMatch] = useState(null);

  const handleMatch = async () => {
    try{
    const res = await API.post("/resume/match-jd", { jobDescription });
    setMatch(res.data.matchPercentage);
    toast.success("JD match calculated!");
    }catch(err){
      toast.err("Failed to calculate JD Match")
    }
  };

  

  return (
    <>
      <Box sx={{ width: 500, mx: "auto", mt: 10, p: 4, boxShadow: 3, bgcolor: "#fff", borderRadius: "8px" }}>
        <Typography variant="h5" mb={2}>Match Resume with Job</Typography>
        <TextField
          label="Paste Job Description"
          multiline
          rows={6}
          fullWidth
          value={jobDescription}
          placeholder="e.g. React, Node.js, MongoDB, Express"
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
