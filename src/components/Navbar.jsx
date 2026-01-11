import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("accessToken");

  // Determine if we should show a back button instead of the logo
  // (Optional: useful for mobile or deep detail pages)
  const showBack = location.pathname.includes("/stories/") || location.pathname.includes("/story/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/districts" className={location.pathname.includes("/districts") ? "active" : ""}>Districts</Link>
          <Link to="/myth" className={location.pathname === "/myth" ? "active" : ""}>Myths</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          <Link to="/dashboard">My Stories</Link>
          {!isLoggedIn ? (
            <Link to="/login" className="nav-login-btn">Login</Link>
          ) : (
            <>
              <Link to="/submit">Submit</Link>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}