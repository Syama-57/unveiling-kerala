import React from "react";
import { Link } from "react-router-dom";
import "./StoryCard.css";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "https://unveiling-kerala.onrender.com/api/";
const BACKEND_URL = API_BASE.replace(/\/api\/?$/, "");

const resolveImage = (img) => {
  if (!img) return "/placeholder.jpg"; // Path in your public folder

  if (img.startsWith("/media")) {
    return `${BACKEND_URL}${img}`;
  }
  
  // If data still has old src paths, clean them
  return img.replace("/src/assets", "");
};

export default function StoryCard({ story, reverse = false }) {
  if (!story) return null;

  return (
    <motion.div
      className={`story-card ${reverse ? "reverse" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="story-image">
        <img 
          src={resolveImage(story.image || story.img)} 
          alt={story.title} 
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
        />
      </div>

      <div className="story-body">
        <h3>{story.title}</h3>
        <p className="story-short">{story.short || story.short_description}</p>
        <Link to={`/story/${story.slug}`} className="read-more">Read More</Link>
      </div>
    </motion.div>
  );
}