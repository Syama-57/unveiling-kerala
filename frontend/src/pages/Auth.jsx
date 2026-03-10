import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";
import Navbar from "../components/Navbar";

export default function Auth() {

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  const logoutMessage = location.state?.message;
  const from = location.state?.from || "/";

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  const handleToggle = () => {
    setError(null);
    setUsername("");
    setPassword("");

    if (isLogin) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {

      if (isLogin) {

        const res = await api.post("/login/", {
          username,
          password,
        });

        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);

        navigate(from, { replace: true });

      } else {

        await api.post("/signup/", {
          username,
          password,
        });

        const loginRes = await api.post("/login/", {
          username,
          password,
        });

        localStorage.setItem("accessToken", loginRes.data.access);
        localStorage.setItem("refreshToken", loginRes.data.refresh);

        navigate("/", { replace: true });

      }

    } catch (err) {

      if (err.response) {
        setError({ message: JSON.stringify(err.response.data) });
      } else {
        setError({ message: "Server error. Try again later." });
      }

    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">

        <div className="auth-overlay"></div>

        <div className="auth-card-mystic">

          <h2 className="auth-title">
            {isLogin ? "Login" : "Join the Archive"}
          </h2>

          <p className="auth-subtitle">
            {isLogin
              ? "Welcome back, seeker"
              : "Begin your journey into the unknown"}
          </p>

          {logoutMessage && (
            <div className="auth-success-msg">{logoutMessage}</div>
          )}

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

            {error && (
              <div className="auth-error-msg">
                {error.message}
              </div>
            )}

            <button type="submit" className="auth-main-btn">
              {isLogin ? "Enter" : "Create Account"}
            </button>

          </form>

          <div className="auth-toggle">

            <span>
              {isLogin
                ? "New to the unveiling?"
                : "Already a member?"}
            </span>

            <button
              className="toggle-btn"
              onClick={handleToggle}
            >
              {isLogin ? "Signup" : "Login"}
            </button>

          </div>

          <button
            className="btn-back-mystic"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>
    </>
  );
}