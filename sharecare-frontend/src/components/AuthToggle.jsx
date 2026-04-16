import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AuthToggle.css";

const AuthToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="auth-toggle">
      <button
        className={`toggle-btn ${location.pathname === "/login" ? "active" : ""}`}
        onClick={() => navigate("/login")}
      >
        Login
      </button>

      <button
        className={`toggle-btn ${location.pathname === "/register" ? "active" : ""}`}
        onClick={() => navigate("/register")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthToggle;