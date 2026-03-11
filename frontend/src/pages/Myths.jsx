import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import mythsData from "../data/mythsData";
import "./Myth.css";
import Navbar from "../components/Navbar";
// --- 1. Import your custom api instance ---
import api from "../api/api"; 

export default function Myths() {
  const navigate = useNavigate();
  const [sections, setSections] = useState(mythsData);

  // --- 2. Simplified Image Resolution ---
  // If the image is a relative path from Django (starts with /media), 
  // we prepended the base Render URL.
  const resolveImage = (img) => {
    if (img.startsWith("/media")) {
       return `https://unveiling-kerala.onrender.com${img}`;
    }
    return img;
  };

  useEffect(() => {
    // --- 3. Use the api instance instead of fetch ---
    api.get("stories/")
      .then(res => {
        const data = res.data;
        if (!Array.isArray(data)) return;

        const updatedSections = mythsData.map(section => ({
          ...section,
          items: [...section.items],
        }));

        let communitySection = updatedSections.find(sec => sec.key === "community");

        if (!communitySection) {
          communitySection = {
            key: "community",
            title: "Community Submissions",
            items: []
          };
          updatedSections.push(communitySection);
        }

        data.forEach(story => {
          const exists = updatedSections.some(sec =>
            sec.items.some(item => item.slug === story.slug)
          );

          if (!exists) {
            communitySection.items.push({
              slug: story.slug,
              title: story.title,
              short: story.short || story.short_description,
              district: story.district,
              img: story.image || "/placeholder.jpg",
              submittedByUser: true,
            });
          }
        });

        setSections(updatedSections);
      })
      .catch(err => console.error("Could not fetch community stories:", err));
  }, []);

  // ... (rest of your return statement remains the same)
  return (
    <>
      <Navbar />

      <div className="myths-page">

        <header className="myths-hero">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="myths-hero-inner"
          >
            <h1>Myths & Legends of Kerala</h1>
            <p className="hero-sub">Where history meets the supernatural</p>
          </motion.div>

        </header>

        <main className="myths-container">

          {sections.map((section) => (

            <section key={section.key} className="myth-category">

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="category-title"
              >
                {section.title}
              </motion.h2>

              <div className="category-grid">

                {section.items.map((item, iIdx) => (

                  <motion.div
                    key={item.slug}
                    className="card-wrap"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: iIdx * 0.1, duration: 0.6 }}
                  >

                    <div className="card">

                      <div className="card-img-container">
                        <img src={resolveImage(item.img)} alt={item.title} />
                        <div className="card-overlay"></div>
                      </div>

                      {item.submittedByUser && (
                        <span className="user-badge">User Submission</span>
                      )}

                      <div className="card-body">

                        <h3>{item.title}</h3>
                        <p className="card-short">{item.short}</p>

                        <div className="card-meta">

                          <span className="district">
                            {item.district}
                          </span>

                          <button
                            className="read-more-btn-alt"
                            onClick={() => navigate(`/story/${item.slug}`)}
                          >
                            Discover →
                          </button>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </div>

            </section>

          ))}

        </main>

      </div>
    </>
  );
}