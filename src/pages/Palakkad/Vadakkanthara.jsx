import React from "react";
import "./PlaceDetails.css";
import vadakkanImg from "/src/assets/palakkad/vadakkanthara.jpg";

export default function Vadakkanthara() {
  return (
    <div className="place-container">

      <div className="place-hero">
        <img src={vadakkanImg} alt="Vadakkanthara" className="place-hero-img" />
        <div className="place-hero-text">
          <h1>Vadakkanthara Temple</h1>
          <p>The sacred home of Bhagavathy.</p>
        </div>
      </div>

      <div className="place-content">

        <h2>📍 About the Place</h2>
        <p>
          The Vadakkanthara Bhagavathy Temple is one of the most powerful and 
          culturally significant temples in Palakkad, known for its festivals 
          and ancient rituals.
        </p>

        <h2>🧚 Myth & Legends</h2>
        <p>
          The temple’s main deity is believed to be a fierce yet protective goddess 
          who guards the land. Legends say she watches over every devotee who enters 
          the sacred courtyard.
        </p>

        <h2>🎎 Cultural Importance</h2>
        <ul>
          <li>Known for grand annual Pooram festivals.</li>
          <li>Traditional art forms like Poothan & Thira are performed here.</li>
          <li>One of the oldest spiritual centers of Palakkad.</li>
        </ul>

        <h2>✨ Why It Fits Our Project</h2>
        <p>
          The temple preserves ancient rituals and stories—key themes of 
          “Unveiling Kerala,” making this place an essential part of the project.
        </p>
      </div>
    </div>
  );
}
