import React from "react";
import { Link } from "react-router-dom";
import "./StoryCard.css";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "https://unveiling-kerala.onrender.com/api/";
const BACKEND_URL = API_BASE.replace(/\/api\/?$/, "");

const resolveImage = (img) => {
  // If no image is provided, return an empty string or a 1x1 transparent pixel
  // This prevents the build from crashing while you decide on a placeholder
  if (!img) return ""; 

  if (img.startsWith("/media")) {
    return `${BACKEND_URL}${img}`;
  }

  return img;
};

export default function StoryCard({ story, reverse = false }) {
  // Safe-guard to prevent crashing if 'story' is undefined
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
          alt={story.title || "Story Image"} 
          // Handle cases where the image itself fails to load
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <div className="story-body">
        <h3>{story.title}</h3>
        <p className="story-short">{story.short || story.short_description}</p>

        <Link to={`/story/${story.slug}`} className="read-more">
          Read More
        </Link>
      </div>
    </motion.div>
  );
}