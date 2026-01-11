import React from "react";
import "./PlaceDetails.css";
import nelliImg from "/src/assets/palakkad/nelliampathi.jpg";

export default function Nelliyampathi() {
  return (
    <div className="place-container">

      <div className="place-hero">
        <img src={nelliImg} alt="Nelliyampathi" className="place-hero-img" />
        <div className="place-hero-text">
          <h1>Nelliyampathy Hills</h1>
          <p>The Ooty of Kerala.</p>
        </div>
      </div>

      <div className="place-content">

        <h2>📍 About the Place</h2>
        <p>
          Nelliyampathy is known for its cool climate, tea estates, wildlife, and 
          stunning valley views. The road with 27 hairpin bends makes the journey thrilling.
        </p>

        <h2>🧚 Myth & Legends</h2>
        <p>
          Local legends speak of ancient sages who meditated in the hills, turning 
          Nelliyampathy into a land of divine energy and peaceful vibrations.
        </p>

        <h2>🎎 Cultural Importance</h2>
        <ul>
          <li>Important farming region for oranges and tea.</li>
          <li>Home to tribal communities like Malasar and Mudugar.</li>
          <li>A location tied to ancient spiritual practices.</li>
        </ul>

        <h2>✨ Why It Fits Our Project</h2>
        <p>
          The combination of nature, history, and folklore makes Nelliyampathy 
          perfect for your Kerala storytelling project.
        </p>
      </div>
    </div>
  );
}
