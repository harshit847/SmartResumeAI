import { Box, Typography, IconButton, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#000000",
        color: "#a5e1d2", // Sky blue
        textAlign: "center",
        borderTop: "1px solid #111",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
        © {new Date().getFullYear()} SmartResumeAI. All rights reserved.
      </Typography>

      <Box>
        <IconButton
          component={Link}
          href="https://instagram.com/your_id"
          target="_blank"
          sx={{ color: "#a5e1d2" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://github.com/your_id"
          target="_blank"
          sx={{ color: "#a5e1d2" }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="mailto:your_email@gmail.com"
          target="_blank"
          sx={{ color: "#a5e1d2" }}
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://facebook.com/your_id"
          target="_blank"
          sx={{ color: "#a5e1d2" }}
        >
          <FacebookIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
