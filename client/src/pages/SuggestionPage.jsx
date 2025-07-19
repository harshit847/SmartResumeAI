import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SuggestionPage() {
  const navigate = useNavigate();
  return (
    <>
    
    <Box
      sx={{
        width: 500,
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
        Resume Suggestions
      </Typography>
      <Typography variant="body1" mb={4}>
        Your resume has been analyzed.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/report")}>
        View Report
      </Button>
    </Box>
    </>
  );
}
