import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/myth/placeholder.jpg";
import "./DistrictStoryRow.css";

const BACKEND_URL = "http://127.0.0.1:8000";

const resolveImage = (img) => {
  if (!img) return placeholder;
  if (img.startsWith("/media")) return `${BACKEND_URL}${img}`;
  return img;
};

export default function DistrictStoryRow({ story, reverse = false }) {
  return (
    <div className={`district-story ${reverse ? "reverse" : ""}`}>
      <div className="district-image">
        <img src={resolveImage(story.img)} alt={story.title} />
      </div>

      <div className="district-content">
        <h2>{story.title}</h2>
        <p>{story.short}</p>
        <Link to={`/story/${story.slug}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
}
