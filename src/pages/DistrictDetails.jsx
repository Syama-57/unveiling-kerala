import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Add this
import StoryCard from "../components/StoryCard";
import mythsData from "../data/mythsData";
import "./DistrictDetails.css";
import Navbar from "../components/Navbar";

export default function DistrictDetails() {
  const { district } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const staticStories = mythsData.flatMap(sec =>
      sec.items.map(item => ({
        ...item,
        submittedByUser: false,
      }))
    );

    fetch("http://127.0.0.1:8000/api/stories/")
      .then(res => res.json())
      .then(data => {
        const backendStories = Array.isArray(data)
          ? data.map(s => ({
              slug: s.slug,
              title: s.title,
              short: s.short || s.short_description,
              district: s.district,
              img: s.image ? `http://127.0.0.1:8000${s.image}` : null,
              submittedByUser: true,
            }))
          : [];

        const merged = [...staticStories];
        backendStories.forEach(bs => {
          if (!merged.some(s => s.slug === bs.slug)) {
            merged.push(bs);
          }
        });

        const normalize = str => str?.toLowerCase().trim();
        setStories(
          merged.filter(s => normalize(s.district) === normalize(district))
        );
      });
  }, [district]);

  return (
    <>
     <Navbar/>
    <div className="district-details-page">
      {/* Background Parallax Layer */}
      <div className="mystic-overlay"></div>

      <motion.h1 
        initial={{ opacity: 0, letterSpacing: "10px" }}
        animate={{ opacity: 1, letterSpacing: "4px" }}
        transition={{ duration: 1.5 }}
        className="district-heading"
      >
        {district} Stories
      </motion.h1>

      {stories.length === 0 ? (
        <p className="no-stories">The stories are hidden in the shadows...</p>
      ) : (
        <div className="stories-list">
          {stories.map((story, index) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <StoryCard
                story={story}
                reverse={index % 2 !== 0}
                onReadMore={() => navigate(`/story/${story.slug}`)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </>  
);
}
