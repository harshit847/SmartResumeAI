import { Box, Typography, Link } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box className="footer-wrapper">
      {/* 👇 Back to Top */}
      <Box className="back-to-top" onClick={scrollToTop}>
        <ArrowUpwardIcon fontSize="small" />
        <span>Back to Top</span>
      </Box>

      {/* 👇 Main Footer */}
      <Box className="footer-main">
        <Box className="footer-columns">
          <Box className="footer-col">
            <Typography className="footer-title">Get to Know Me</Typography>
            <Link href="#about">About</Link>
            <Link href="#projects">Projects</Link>
            <Link href="#resume">Resume</Link>
          </Box>

          <Box className="footer-col">
            <Typography className="footer-title">Connect with Me</Typography>
            <Link href="https://github.com/harshit847" target="_blank">GitHub</Link>
            <Link href="mailto:harshitrai331@gmail.com">Gmail</Link>
            <Link href="https://linkedin.com/in/harshit-rai-576617274" target="_blank">LinkedIn</Link>
            <Link href="https://instagram.com/your-id" target="_blank">Instagram</Link>
            <Link href="https://facebook.com/your-id" target="_blank">Facebook</Link>
          </Box>

          <Box className="footer-col">
            <Typography className="footer-title">Made By</Typography>
            <Typography className="footer-name">Harshit Rai</Typography>
            <Typography variant="body2" mt={1}>© {new Date().getFullYear()}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
