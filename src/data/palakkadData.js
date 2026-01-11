// src/data/palakkadData.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./PlaceDetails.css";

// Import all images relative to this file
import silentValleyImg from "../../assets/palakkad/silentvally.jpg";
import malampuzhaImg from "../../assets/palakkad/malampuzha.jpg";
import nelliampathiImg from "../../assets/palakkad/nelliampathi.jpg";
import vadakkantharaImg from "../../assets/palakkad/vadakkanthara.jpg";
import kalpathyImg from "../../assets/palakkad/kalpathy.jpg";
import fortImg from "../../assets/palakkad/fort.jpg";

const places = [
  {
    slug: "silentvalley",
    name: "Silent Valley National Park",
    img: silentValleyImg,
    story: "Hidden deep within the Western Ghats, Silent Valley is said to be guarded by forest spirits.",
  },
  {
    slug: "malampuzha",
    name: "Malampuzha Dam & Gardens",
    img: malampuzhaImg,
    story: "Malampuzha is a land woven with ancient stories. Legends speak of the Yakshi spirit protecting the valley and the famous Malampuzha Yakshi statue by Kanayi Kunhiraman.",
  },
  {
    slug: "nelliampathi",
    name: "Nelliampathi Hills",
    img: nelliampathiImg,
    story: "Nelliampathi Hills are misty and beautiful. Folklore tells of legendary warriors hiding here.",
  },
  {
    slug: "vadakkanthara",
    name: "Vadakkanthara Bhagavathy Temple",
    img: vadakkantharaImg,
    story: "Famous for festivals and classical performances like Kathakali, with legends of divine intervention.",
  },
  {
    slug: "kalpathy",
    name: "Kalpathy Heritage Village",
    img: kalpathyImg,
    story: "Known for Ratholsavam festival, chariot procession guided by elephants believed to be sent by gods.",
  },
  {
    slug: "fort",
    name: "Palakkad Fort",
    img: fortImg,
    story: "Built by Hyder Ali, surrounded by tales of secret passages and hidden treasures.",
  },
];

export default function PlaceDetails() {
  const { slug } = useParams();

  // Find the place by slug
  const place = places.find((p) => p.slug === slug);

  if (!place) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Place not found</p>;
  }

  return (
    <div className="place-details-container">
      
      {/* Top Image */}
      <div className="place-details-banner">
        <img src={place.img} alt={place.name} />
      </div>

      {/* Title */}
      <h1 className="place-title">{place.name}</h1>

      {/* Story Section */}
      <div className="story-section">
        <p>{place.story}</p>
      </div>

      {/* Back Button */}
      <div className="back-btn-wrapper">
        <Link to="/districts/palakkad" className="back-btn">
          ← Back to Palakkad
        </Link>
      </div>
    </div>
  );
}
