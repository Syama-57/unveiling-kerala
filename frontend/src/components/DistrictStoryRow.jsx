import React from "react";
import { Link } from "react-router-dom";
import "./DistrictStoryRow.css";

const API_BASE = import.meta.env.VITE_API_URL || "https://unveiling-kerala.onrender.com/api/";
const BACKEND_URL = API_BASE.replace(/\/api\/?$/, "");

const resolveImage = (img) => {
  if (!img) return "/bg.jpg";
  if (img.startsWith("/media")) return `${BACKEND_URL}${img}`;
  
  let cleanPath = img.replace("/src/assets", "");
  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
};

export default function DistrictStoryRow({ story, reverse = false }) {
  if (!story) return null;

  return (
    <div className={`district-story ${reverse ? "reverse" : ""}`}>
      <div className="district-image">
        <img 
          src={resolveImage(story.image || story.img)} 
          alt={story.title} 
          onError={(e) => { e.target.src = "/bg.jpg"; }}
        />
      </div>
      <div className="district-content">
        <h2>{story.title}</h2>
        <p>{story.short || story.short_description}</p>
        <Link to={`/story/${story.slug}`} className="read-more">Read More</Link>
      </div>
    </div>
  );
}