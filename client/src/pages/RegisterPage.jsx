import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function RegisterPage() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        userName,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      setError("Registration failed.");
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "auto",
        marginTop: 10,
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Register
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        value={userName}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleRegister}
      >
        Register
      </Button>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Typography variant="body2" mt={2} textAlign="center">
        Already registered?{" "}
        <Link href="/" underline="hover">
          Login
        </Link>
      </Typography>
    </Box>
  );
}
