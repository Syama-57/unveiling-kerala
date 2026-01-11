import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import Navbar from "../components/Navbar";
export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const logoutMessage = location.state?.message;
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = isLogin
      ? "http://127.0.0.1:8000/api/login/"
      : "http://127.0.0.1:8000/api/signup/";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError({ message: data.error || "Invalid credentials" });
        return;
      }

      if (isLogin) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate(from, { replace: true });
      } else {
        const loginRes = await fetch("http://127.0.0.1:8000/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!loginRes.ok) {
          setError({ message: "Signup succeeded. Please login manually." });
          return;
        }

        const loginData = await loginRes.json();
        localStorage.setItem("accessToken", loginData.access);
        localStorage.setItem("refreshToken", loginData.refresh);
        navigate("/", { replace: true });
      }
    } catch {
      setError({ message: "Server error. Try again later." });
    }
  };

  return (
    <>
    <Navbar/>
    <div className="auth-page">
      <div className="auth-overlay"></div>
      <div className="auth-card-mystic">
        <h2 className="auth-title">{isLogin ? "Login" : "Join the Archive"}</h2>
        <p className="auth-subtitle">{isLogin ? "Welcome back, seeker" : "Begin your journey into the unknown"}</p>

        {logoutMessage && <div className="auth-success-msg">{logoutMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="auth-error-msg">{error.message}</div>}

          <button type="submit" className="auth-main-btn">
            {isLogin ? "Enter" : "Create Account"}
          </button>
        </form>

        <div className="auth-toggle">
          <span>{isLogin ? "New to the unveiling?" : "Already a member?"}</span>
          <button
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername("");
              setPassword("");
              setError(null);
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </div>

        <button className="btn-back-mystic" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  </>
  );
}