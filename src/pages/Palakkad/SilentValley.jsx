import React from "react";
import "./PlaceDetails.css";
import silentImg from "/src/assets/palakkad/silentvally.jpg";

export default function SilentValley() {
  return (
    <div className="place-container">

      <div className="place-hero">
        <img src={silentImg} alt="Silent Valley" className="place-hero-img" />
        <div className="place-hero-text">
          <h1>Silent Valley National Park</h1>
          <p>The untouched rainforest of Kerala.</p>
        </div>
      </div>

      <div className="place-content">

        <h2>📍 About the Place</h2>
        <p>
          Silent Valley is one of the last undisturbed tropical rainforests in India, 
          home to rare species such as the Lion-tailed Macaque. Its silence comes 
          from the absence of cicadas—making it truly unique.
        </p>

        <h2>🧚 Myth & Legends</h2>
        <p>
          Ancient tales link Silent Valley to the Pandavas’ exile. Locals believe 
          that the deep forests are guarded by spirits of nature who protect the land.
        </p>

        <h2>🎎 Cultural Importance</h2>
        <ul>
          <li>A biodiversity hotspot with global scientific importance.</li>
          <li>Home to tribal communities with rich forest knowledge.</li>
          <li>Symbol of Kerala’s biggest environmental movement.</li>
        </ul>

        <h2>✨ Why It Fits Our Project</h2>
        <p>
          Silent Valley represents the hidden natural wonders of Kerala — untouched,
          mysterious, and full of stories.
        </p>
      </div>
    </div>
  );
}
