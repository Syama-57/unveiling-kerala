import React from "react";
import "./PlaceDetails.css";
import fortImg from "/src/assets/palakkad/fort.jpg";

export default function Fort() {
  return (
    <div className="place-container">

      <div className="place-hero">
        <img src={fortImg} alt="Palakkad Fort" className="place-hero-img" />
        <div className="place-hero-text">
          <h1>Palakkad Fort</h1>
          <p>The silent walls that watched centuries unfold.</p>
        </div>
      </div>

      <div className="place-content">

        <h2>📍 About the Place</h2>
        <p>
          Built by Hyder Ali in 1766, Palakkad Fort is one of the strongest forts 
          in Kerala. Surrounded by a moat, the fort stands as a reminder of old 
          battles and Kerala's connection to Mysore’s history.
        </p>

        <h2>🧚 Myth & Legends</h2>
        <p>
          Locals say hidden tunnels run beneath the fort, connecting to distant 
          mountains. Some believe the spirits of old warriors still guard the fort.
        </p>

        <h2>🎎 Cultural Importance</h2>
        <ul>
          <li>Architectural symbol of the Mysore kingdom.</li>
          <li>Used by the British as a major administrative center.</li>
          <li>Hosts cultural events and heritage festivals today.</li>
        </ul>

        <h2>✨ Why It Fits Our Project</h2>
        <p>
          Forts are silent storytellers—and Palakkad Fort holds history, mystery,
          and culture all in one place.
        </p>
      </div>
    </div>
  );
}
