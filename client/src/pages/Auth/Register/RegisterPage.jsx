// src/pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { toast } from "react-toastify";
import "./Register.css"; // 👈 import CSS

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
      toast.success("Registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed. Try again.");
      setError("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="register-input"
        value={userName}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="register-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>

      {error && <p className="register-error">{error}</p>}

      <p className="register-footer">
        Already registered?{" "}
        <span className="register-link" onClick={() => navigate("/")}>
          Login
        </span>
      </p>
    </div>
  );
}
