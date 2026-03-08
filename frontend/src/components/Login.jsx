import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dynamic API Base URL
  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const cleanBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Replaced hardcoded localhost with the environment variable
      const response = await axios.post(`${cleanBase}/token/`, {
        username: username,
        password: password,
      });

      // Save JWT tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      alert("Login successful!");
      navigate("/dashboard"); // Redirecting to your dashboard
    } catch (err) {
      // Check if it's a network error or a credential error
      if (!err.response) {
        setError("Network error. Please check if the server is running.");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className="auth-card-mystic" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 className="mystic-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="input-group">
          <label className="mystic-label">Username</label>
          <input
            type="text"
            className="mystic-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group" style={{ marginTop: "10px" }}>
          <label className="mystic-label">Password</label>
          <input
            type="password"
            className="mystic-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-main-btn" style={{ marginTop: "20px" }}>
          Enter the Archive
        </button>

        {error && <p className="auth-error-msg" style={{ marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}