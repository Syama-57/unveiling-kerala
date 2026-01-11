import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/kerala-hero.jpg";

export default function About() {
  const navigate = useNavigate();

  return (
    // 'vh-100' and 'container-fluid' are Bootstrap classes
    <div className="about-wrapper container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${bgImg})` }}>
      
      {/* Custom glass card with Bootstrap padding and text alignment */}
      <div className="about-glass-card p-5 text-center">
        <h1 className="display-4 mb-2">Discover Our Purpose</h1>
        <h3 className="gold-accent mb-4">Keep Exploring</h3>

        <p className="about-description mx-auto">
          Kerala is more than backwaters and beaches — it is a land of stories hidden in its mountains,
          forests, villages, and culture that often go unnoticed. Unveiling Kerala brings you a carefully
          curated collection of lesser-known destinations, forgotten traditions, local narratives, and
          immersive experiences that reveal the true soul of Kerala.
        </p>

        <button className="about-btn-mystic mt-3" onClick={() => navigate("/home")}>
          Discover Places
        </button>
      </div>
    </div>
  );
}