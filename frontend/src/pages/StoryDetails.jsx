import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./StoryDetails.css";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import mythsData from "../data/mythsData";

export default function StoryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const isScrolling = useRef(false);

  // frontend story (short description, fallback image)
  const localStory = mythsData
  .flatMap(section => section.items)
  .find(item => item.slug === slug);


  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.get(`stories/${slug}/`);

        setStory({
          ...localStory,   // title, short_description
          ...res.data,     // full_story, district, image
        });
      } catch (err) {
        console.error("Story not found", err);

        // fallback: allow frontend-only preview
        if (localStory) {
          setStory(localStory);
        } else {
          setStory(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  // Scroll logic (safe)
  const handleWheel = (e) => {
    if (!story?.full_story || isScrolling.current) return;

    const paragraphs = story.full_story
      .split("\n")
      .filter((p) => p.trim() !== "");

    const totalPages = paragraphs.length + 2;

    if (e.deltaY > 0 && currentPage < totalPages - 1) {
      lockScroll();
      setCurrentPage((p) => p + 1);
    } else if (e.deltaY < 0 && currentPage > 0) {
      lockScroll();
      setCurrentPage((p) => p - 1);
    }
  };

  const lockScroll = () => {
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 900);
  };

  if (loading) return <div className="mystic-loader">Loading story…</div>;
  if (!story) return <div className="mystic-loader">Story not available.</div>;

  const paragraphs = story.full_story
    ? story.full_story.split("\n").filter((p) => p.trim() !== "")
    : [];

  const pages = [
    {
      type: "hero",
      title: story.title,
      district: story.district,
      image: story.image,
    },
    ...paragraphs.map((p) => ({ type: "content", text: p })),
    { type: "end" },
  ];

  return (
    <>
      <Navbar />

      <div className="book-stage" onWheel={handleWheel}>
        <button className="nav-close" onClick={() => navigate(-1)}>✕</button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="page-frame"
          >
            {pages[currentPage].type === "hero" && (
              <div
                className="page-hero"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), #000), url(${pages[currentPage].image})`,
                }}
              >
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
                <button className="lib-btn" onClick={() => navigate(-1)}>
                  Return to Library
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

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
