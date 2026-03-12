import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import mythsData from "../data/mythsData";
import "./Myth.css";
import Navbar from "../components/Navbar";
import api from "../api/api"; // Import our synced api instance

export default function Myths() {
  const navigate = useNavigate();
  const [sections, setSections] = useState(mythsData);

  const resolveImage = (img) => {
    if (!img) return "/bg.jpg";
    if (img.startsWith("/media")) {
       return `https://unveiling-kerala.onrender.com${img}`;
    }
    // Remove old src/assets prefixes if they exist in the local data
    return img.replace("/src/assets", "");
  };

  useEffect(() => {
    // Use the api instance to hit /api/stories/
    api.get("stories/")
      .then(res => {
        const backendStories = res.data;
        if (!Array.isArray(backendStories)) return;

        // Clone mythsData to avoid mutating state directly
        const updatedSections = JSON.parse(JSON.stringify(mythsData));

        let communitySection = updatedSections.find(sec => sec.key === "community");
        if (!communitySection) {
          communitySection = { key: "community", title: "Community Submissions", items: [] };
          updatedSections.push(communitySection);
        }

        backendStories.forEach(story => {
          const exists = updatedSections.some(sec =>
            sec.items.some(item => item.slug === story.slug)
          );

          if (!exists) {
            communitySection.items.push({
              slug: story.slug,
              title: story.title,
              // Backend uses 'short_description', fallback to 'short'
              short: story.short_description || story.short,
              district: story.district,
              // Backend uses 'image', fallback to 'img'
              img: story.image || story.img || "/bg.jpg",
              submittedByUser: true,
            });
          }
        });

        setSections(updatedSections);
      })
      .catch(err => console.error("Backend fetch failed:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="myths-page">
        <header className="myths-hero">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="myths-hero-inner">
            <h1>Myths & Legends of Kerala</h1>
          </motion.div>
        </header>
        <main className="myths-container">
          {sections.map((section) => (
            <section key={section.key} className="myth-category">
              <h2 className="category-title">{section.title}</h2>
              <div className="category-grid">
                {section.items.map((item) => (
                  <div key={item.slug} className="card">
                    <img src={resolveImage(item.img)} alt={item.title} />
                    <div className="card-body">
                      <h3>{item.title}</h3>
                      <p>{item.short}</p>
                      <button onClick={() => navigate(`/story/${item.slug}`)}>Discover →</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}