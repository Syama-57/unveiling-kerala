import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StoryCard from "../components/StoryCard";
import mythsData from "../data/mythsData";
import "./DistrictDetails.css";
import Navbar from "../components/Navbar";
// --- FIX 1: Import your custom api instance ---
import api from "../api/api"; 

export default function DistrictDetails() {
  const { district } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  // --- FIX 2: Define the District Background Path ---
  // If your images in public are like public/hero.jpg or public/images/district-bg.jpg
  const districtBg = "/hero.jpg"; 

  useEffect(() => {
    const staticStories = mythsData.flatMap(sec =>
      sec.items.map(item => ({
        ...item,
        submittedByUser: false,
      }))
    );

    // --- FIX 3: Use api.get instead of fetch ---
    api.get("stories/")
      .then(res => {
        const data = res.data;
        const backendStories = Array.isArray(data)
          ? data.map(s => ({
              slug: s.slug,
              title: s.title,
              short: s.short_description || s.short,
              district: s.district,
              // Use story.image from backend if it exists
              img: s.image || s.img || null,
              submittedByUser: true,
              latitude: s.latitude,
              longitude: s.longitude
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
      })
      .catch(err => {
        console.error("Failed to load district stories:", err);
        // Still show static stories even if backend fails
        const normalize = str => str?.toLowerCase().trim();
        setStories(staticStories.filter(s => normalize(s.district) === normalize(district)));
      });
  }, [district]);

  return (
    <>
      <Navbar/>
      <div 
        className="district-details-page"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${districtBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
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