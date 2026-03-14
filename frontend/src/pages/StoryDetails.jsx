import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./StoryDetails.css";
import Navbar from "../components/Navbar";
import api from "../api/api"; 
import mythsData from "../data/mythsData";
import MythMap from "../components/MythMap";
import "leaflet/dist/leaflet.css";

export default function StoryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const isScrolling = useRef(false);
  const touchStart = useRef(null); // --- FIXED: Added missing ref ---
  const synth = window.speechSynthesis;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://unveiling-kerala.onrender.com/api/stories/${slug}/`);
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
        const data = await response.json();

        const local = mythsData
          .flatMap(section => section.items)
          .find(item => item.slug === slug);

        const mergedStory = { ...local, ...data };

        if (mergedStory.image && mergedStory.image.startsWith("/media")) {
          mergedStory.image = `https://unveiling-kerala.onrender.com${mergedStory.image}`;
        } else {
          mergedStory.image = local?.img || "/myth/hero.jpg";
        }

        setStory(mergedStory);

        const token = localStorage.getItem("accessToken");
        if (token && data.id) {
           try {
             const statusRes = await api.get(`bookmark/${data.id}/`);
             setIsBookmarked(statusRes.data.bookmarked);
           } catch (bkErr) { console.warn(bkErr); }
        }
      } catch (err) {
        console.error(err);
        const localOnly = mythsData.flatMap(s => s.items).find(i => i.slug === slug);
        if (localOnly) setStory({ ...localOnly, image: localOnly.img });
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [slug]);

  useEffect(() => {
    return () => synth.cancel();
  }, []);

  if (loading) return <div className="mystic-loader">Seeking the legend...</div>;
  if (!story) return <div className="mystic-loader">Story not available.</div>;

  const fullText = story.full_story || story.description || "No text available.";
  const paragraphs = fullText.split("\n").filter((p) => p.trim() !== "");

  const pages = [
    { type: "hero", title: story.title, district: story.district, image: story.image },
    ...paragraphs.map((p) => ({ type: "content", text: p })),
    { type: "map" }, 
    { type: "end" },
  ];

  const handleWheel = (e) => {
    if (isScrolling.current) return;
    if (e.deltaY > 0 && currentPage < pages.length - 1) {
      lockScroll();
      setCurrentPage((p) => p + 1);
    } else if (e.deltaY < 0 && currentPage > 0) {
      lockScroll();
      setCurrentPage((p) => p - 1);
    }
  };

  // --- TOUCH HANDLERS ---
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isScrolling.current || !touchStart.current) return;
    const touchEnd = e.touches[0].clientY;
    const deltaY = touchStart.current - touchEnd;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentPage < pages.length - 1) {
        lockScroll();
        setCurrentPage((p) => p + 1);
      } else if (deltaY < 0 && currentPage > 0) {
        lockScroll();
        setCurrentPage((p) => p - 1);
      }
      touchStart.current = null;
    }
  };

  const lockScroll = () => {
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 900);
  };

  const toggleBookmark = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) { navigate("/login"); return; }
    try {
      const res = await api.post(`bookmark/${story.id}/`);
      setIsBookmarked(res.data.bookmarked); 
    } catch (err) { console.error(err); }
  };

  const toggleAudioNarrative = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(paragraphs.join(" "));
      const voices = synth.getVoices();
      utterance.voice = voices.find(v => v.name.includes("India")) || voices[0];
      utterance.onend = () => setIsSpeaking(false);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <>
      <Navbar />
      {/* --- FIXED: Added onTouch listeners here --- */}
      <div 
        className="book-stage" 
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button className="nav-close" onClick={() => navigate(-1)}>✕</button>
        <div className="story-controls-overlay">
          <button className={`bookmark-btn-floating ${isBookmarked ? 'active' : ''}`} onClick={toggleBookmark}>
            {isBookmarked ? "❤️" : "🤍"}
          </button>
          <button className={`audio-narrator-btn ${isSpeaking ? 'speaking' : ''}`} onClick={toggleAudioNarrative}>
            {isSpeaking ? "🔊 Pause" : "🔈 Listen"}
          </button>
        </div>

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
            
            {pages[currentPage].type === "map" && (
              <div className="page-content" style={{ padding: '20px', textAlign: 'center' }}>
                <h2 className="gold-accent mb-4">THE SACRED GEOGRAPHY</h2>
                <div style={{ width: '100%', height: '300px', borderRadius: '12px', border: '1px solid #d4af37', overflow: 'hidden' }}>
                  {story.latitude && story.longitude ? (
                     <MythMap stories={[story]} center={[parseFloat(story.latitude), parseFloat(story.longitude)]} zoom={14} />
                  ) : (
                     <p>Map location not available.</p>
                  )}
                </div>
              </div>
            )}

            {pages[currentPage].type === "end" && (
              <div className="page-content text-center">
                <h2 className="gold-accent">The End</h2>
                <button className="submit-btn-gold mt-4" onClick={() => navigate("/myth")}>Return to Archive</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}