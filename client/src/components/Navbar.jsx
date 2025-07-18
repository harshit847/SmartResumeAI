// src/components/Navbar.tsx
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"; // ⬅️ Import your logo image
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 👇 LOGO as Title */}
        <Box
          component="img"
          src={Logo}
          alt="SmartResumeAI"
          sx={{
            height: 40,
            cursor: "pointer",
          }}
          onClick={() => navigate("/resume-form")}
        />

        {/* Buttons */}
        <Box>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
