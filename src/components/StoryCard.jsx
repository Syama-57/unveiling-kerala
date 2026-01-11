import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/myth/placeholder.jpg";
import "./StoryCard.css";
import { motion } from "framer-motion";
const BACKEND_URL = "http://127.0.0.1:8000";

const resolveImage = (img) => {
  if (!img) return placeholder;
  if (img.startsWith("/media")) return `${BACKEND_URL}${img}`;
  return img;
};

export default function StoryCard({ story, reverse = false }) {
  return (
    <div className={`story-card ${reverse ? "reverse" : ""}`}>
      <div className="story-image">
        <img src={resolveImage(story.img)} alt={story.title} />
      </div>

      <div className="story-body">
        <h3>{story.title}</h3>
        <p className="story-short">{story.short}</p>

        <Link to={`/story/${story.slug}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
}
