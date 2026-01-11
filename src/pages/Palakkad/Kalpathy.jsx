import React from "react";
import "./PlaceDetails.css";   // common CSS for all place pages
import malampuzhaImg from "/src/assets/palakkad/malampuzha.jpg";

export default function Malampuzha() {
  return (
    <div className="place-container">

      {/* HERO SECTION */}
      <div className="place-hero">
        <img src={malampuzhaImg} alt="Malampuzha" className="place-hero-img" />
        <div className="place-hero-text">
          <h1>Malampuzha Dam & Gardens</h1>
          <p>The land where legends flow with the river.</p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="place-content">

        <h2>📍 About the Place</h2>
        <p>
          Malampuzha is one of Palakkad’s most iconic destinations — a blend of 
          engineering marvel, lush gardens, and calm waters surrounded by Western 
          Ghats. Built in 1955, the dam has supported irrigation, agriculture, and 
          life across the Palakkad district.
        </p>

        <h2>🧚 Myth & Legends</h2>
        <p>
          Local villagers believe that the river is watched over by 
          <strong> “Paathala Yakshis” </strong> — guardian spirits who protect the water 
          and the surrounding forests. Traditional stories say that during heavy rains 
          or droughts, the spirits appear in dreams of elders, warning them about 
          future events.
        </p>
        <p>
          Another legend tells that the river goddess <strong>“Malampuzha Devi”</strong> 
          blesses the land with fertility. Farmers still say their harvest depends 
          on the goddess’s mood, and before the Onam season, rituals are performed 
          to honor her.
        </p>

        <h2>🎎 Cultural Importance</h2>
        <ul>
          <li>Onam boat races were once held in the reservoir.</li>
          <li>Classical arts such as Kathakali and Chenda Melam were performed during festivals.</li>
          <li>The famous Yakshi statue by Kanayi Kunhiraman symbolizes the ancient guardian myths.</li>
        </ul>

        <h2>✨ Why This Place Fits Our Project</h2>
        <p>
          Malampuzha is not just a tourist spot — it is a place where 
          <strong>nature, myth, culture, and human life</strong> flow together.  
          These hidden stories are exactly what “Unveiling Kerala” brings out.
        </p>

      </div>
    </div>
  );
}
