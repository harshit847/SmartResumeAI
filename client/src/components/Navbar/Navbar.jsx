import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left" onClick={() => navigate("/resume-form")}>
        <img src={Logo} alt="SmartResumeAI" className="navbar-logo" />
        <span className="navbar-brand">SmartResumeAI</span>
      </div>

      <div className="navbar-right">
        <button className="navbar-btn" onClick={handleLogout}>
          <span className="navbar-icon">🔓</span> Logout
        </button>
      </div>
    </nav>
  );
}
