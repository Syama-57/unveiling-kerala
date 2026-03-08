import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for the token to determine if the user is logged in
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // Show back arrow on story-specific pages
  const showBack = location.pathname.includes("/stories/") || location.pathname.includes("/story/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Adding a small delay or direct navigate to refresh the navbar state
    navigate("/login", {
      state: { message: "You have been logged out successfully." },
    });
  };

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="nav-content">
        <div className="nav-left">
          {showBack && (
            <button className="nav-back-arrow" onClick={() => navigate(-1)}>
              ←
            </button>
          )}
          <Link to="/" className="logo">Unveiling Kerala</Link>
        </div>

        <div className="links">
          <Link to="/" className={location.pathname === "/" || location.pathname === "/home" ? "active" : ""}>Home</Link>
          <Link to="/districts" className={location.pathname.includes("/districts") ? "active" : ""}>Districts</Link>
          <Link to="/myth" className={location.pathname === "/myth" ? "active" : ""}>Myths</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          
          {/* Only show these if logged in, or keep them visible but protected */}
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>My Stories</Link>
          <Link to="/submit" className={location.pathname === "/submit" ? "active" : ""}>Submit</Link>
              
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={location.pathname === "/login" ? "nav-login-btn active" : "nav-login-btn"}>Login</Link>
              <Link to="/signup" className={location.pathname === "/signup" ? "nav-signup-btn active" : "nav-signup-btn"}>Signup</Link>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}