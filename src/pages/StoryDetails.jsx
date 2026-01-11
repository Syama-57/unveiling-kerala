import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./StoryDetails.css";
import Navbar from "../components/Navbar";

export default function StoryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const isScrolling = useRef(false); // Prevents skipping multiple pages at once

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/stories/${slug}/`);
        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error("Story not found");
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [slug]);

  // The "Magic" Scroll Logic
  const handleWheel = (e) => {
    if (isScrolling.current) return; // Wait for animation to finish

    const paragraphs = story.full_story.split("\n").filter(p => p.trim() !== "");
    const totalPages = paragraphs.length + 2; // Hero + Paras + End

    if (e.deltaY > 0) {
      // Scroll Down -> Next Page
      if (currentPage < totalPages - 1) {
        lockScroll();
        setCurrentPage((prev) => prev + 1);
      }
    } else if (e.deltaY < 0) {
      // Scroll Up -> Previous Page
      if (currentPage > 0) {
        lockScroll();
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  const lockScroll = () => {
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 1000); // 1 second cooldown
  };

  if (loading) return <div className="mystic-loader">Awakening the shadows...</div>;
  if (!story) return <div className="mystic-loader">The story has vanished.</div>;

  const paragraphs = story.full_story.split("\n").filter(p => p.trim() !== "");
  const pages = [
    { type: "hero", title: story.title, district: story.district, image: story.image },
    ...paragraphs.map(p => ({ type: "content", text: p })),
    { type: "end" }
  ];

  return (
    <>
    <Navbar/>
    <div className="book-stage" onWheel={handleWheel}>
      <button className="nav-close" onClick={() => navigate(-1)}>✕</button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 100 }} // Pages slide UP like a book flip
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="page-frame"
        >
          {pages[currentPage].type === "hero" && (
            <div className="page-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), #000), url(${pages[currentPage].image})` }}>
              <div className="hero-inner">
                <span className="gold-accent">{pages[currentPage].district}</span>
                <h1>{pages[currentPage].title}</h1>
                <p className="scroll-hint">Scroll down to read</p>
              </div>
            </div>
          )}

          {pages[currentPage].type === "content" && (
            <div className="page-content">
              <p className="story-text">{pages[currentPage].text}</p>
            </div>
          )}

          {pages[currentPage].type === "end" && (
            <div className="page-end">
              <h2 className="gold-accent">Fin.</h2>
              <button className="lib-btn" onClick={() => navigate(-1)}>Return to Library</button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle Progress Line at the very bottom */}
      <div className="bottom-progress-bar">
        <motion.div 
          className="inner-bar" 
          animate={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
        />
      </div>
    </div>
  </>
  );
}