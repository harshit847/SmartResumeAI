import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeForm from "./pages/ResumeForm";
import SuggestionPage from "./pages/SuggestionPage";
import ReportPage from "./pages/ReportPage";
import JDMatchPage from "./pages/JDMatchPage";
import LoginPage from "./pages/Auth/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/Auth/Register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register-page" element={<RegisterPage />} />

          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div style={{ flex: 1 }}>
                  <Routes>
                    <Route
                      path="/resume-form"
                      element={
                        <ProtectedRoute>
                          <ResumeForm />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/suggestions"
                      element={
                        <ProtectedRoute>
                          <SuggestionPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/report"
                      element={
                        <ProtectedRoute>
                          <ReportPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/match"
                      element={
                        <ProtectedRoute>
                          <JDMatchPage />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
