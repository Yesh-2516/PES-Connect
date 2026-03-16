import React, { useState } from "react";
import "./Login.css";
import pesLogo from "../assets/pes_logo_1.png";
import campusBg from "../assets/campus_bg.svg";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // state for form fields and loading
  const [srn, setSrn] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!srn || !password) {
      alert("Please enter both SRN and password.");
      return;
    }

    try {
      setLoading(true);

      // 🌐 backend login API call (change URL if needed)
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        srn,
        password,
      });

      if (res.data && res.data.token) {
  // ✅ Login success
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  // <-- ADD THIS LINE to store userId used by Interests page
  if (res.data.user && res.data.user._id) {
    localStorage.setItem("userId", res.data.user._id);
  }

  alert("Login successful!");
  navigate("/dashboard");
}
 else {
        // unexpected response
        alert("Unexpected server response.");
      }
    } catch (err) {
      // ❌ wrong credentials
      if (err.response && err.response.status === 400) {
        alert("Incorrect SRN or password.");
      } else if (err.response && err.response.status === 404) {
        alert("User not found. Please check your SRN.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Header (Top bar) */}
      <div className="top-bar">
        <div className="logo-section">
          <img src={pesLogo} alt="PES University" className="pes-logo" />
          <h3>PES UNIVERSITY</h3>
        </div>
        <div className="icons-section">
          <Bell className="icon" />
          <User className="icon" />
        </div>
      </div>

      {/* Main content area */}
      <div className="main-container">
        {/* Left section */}
        <div className="left-section">
          <img src={campusBg} alt="Campus" className="campus-image" />

          <div className="text-overlay">
            <h1>Welcome to PES Connect</h1>
            <p>Your gateway to campus and community engagement</p>
            <button className="discover-btn" onClick={() => navigate("/about")}>
              Discover More
            </button>
          </div>
        </div>

        {/* Right section (Login Card) */}
        <div className="right-section">
          <div className="login-card">
            <div className="login-header">
              <img src={pesLogo} alt="PES Logo" className="card-logo" />
              <h2>PES Connect</h2>
            </div>
            <p>Log in using your official PES SRN</p>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="SRN"
                className="input-field"
                value={srn}
                onChange={(e) => setSrn(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
