import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing({ onFinish }) {
  const navigate = useNavigate();

  const handleStart = () => {
    onFinish();        // hide landing
    navigate("/home"); // go to home
  };

  return (
    <div className="landing-container">
      <video className="landing-video" autoPlay muted loop>
        <source src="/src/assets/landing/bg.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="landing-content">
        <h1 className="landing-title">Unveiling Kerala</h1>
        <p className="landing-sub">Where every shadow holds a story</p>

        <button className="enter-btn" onClick={handleStart}>
          Begin Exploration
        </button>
      </div>
    </div>
  );
}
