import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeForm from "./pages/ResumeForm";
import SuggestionPage from "./pages/SuggestionPage";
import ReportPage from "./pages/ReportPage";
import JDMatchPage from "./pages/JDMatchPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          {/* Public Route: Login (No Navbar or Footer) */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Layout Routes */}
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
