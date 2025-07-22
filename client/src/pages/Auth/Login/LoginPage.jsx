import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { toast } from "react-toastify";
import "./Login.css"; // custom CSS

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/resume-form");
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      if (err.response?.status === 404) {
        setError("User not found. Please register.");
      } else {
        setError("Login failed.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      {error && <p className="login-error">{error}</p>}

      <p className="login-footer">
        Not registered?{" "}
        <span className="login-link" onClick={() => navigate("/register-page")}>
          Sign up
        </span>
      </p>
    </div>
  );
}
