import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./StoryDetails.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import mythsData from "../data/mythsData";
import MythMap from "../components/MythMap";
import "leaflet/dist/leaflet.css";


export default function StoryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- 1. ALL HOOKS MUST BE AT THE VERY TOP ---
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isScrolling = useRef(false);
  const synth = window.speechSynthesis;

  // --- 2. FETCHING LOGIC ---
  useEffect(() => {
    const fetchStory = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}stories/${slug}/`);
        
        // Find local data for images/slugs
        const local = mythsData
          .flatMap(section => section.items)
          .find(item => item.slug === slug);

        setStory({ ...local, ...res.data });

        // Optional: Check bookmark status on load
        if (token && res.data.id) {
           const statusRes = await fetch(`${import.meta.env.VITE_API_URL}bookmark/${res.data.id}/`, {
             headers: { "Authorization": `Bearer ${token}` }
           });
           const statusData = await statusRes.json();
           setIsBookmarked(statusData.bookmarked);
        }
      } catch (err) {
        console.error("Story not found", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [slug]);

  // Cleanup for audio
  useEffect(() => {
    return () => synth.cancel();
  }, []);

  // --- 3. EVENT HANDLERS ---
  const toggleBookmark = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) { navigate("/login"); return; }

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}bookmark/${story.id}/`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setIsBookmarked(data.bookmarked); 
    } catch (err) { console.error("Bookmark failed", err); }
  };

  const toggleAudioNarrative = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const paragraphs = story.full_story.split("\n").filter((p) => p.trim() !== "");
      const fullText = paragraphs.join(" ");
      const utterance = new SpeechSynthesisUtterance(fullText);
      const voices = synth.getVoices();
      utterance.voice = voices.find(v => v.name.includes("India")) || voices[0];
      utterance.pitch = 0.9;
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleWheel = (e) => {
    if (!story?.full_story || isScrolling.current) return;
    const paragraphs = story.full_story.split("\n").filter((p) => p.trim() !== "");
    const totalPages = paragraphs.length + 3; 

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
    setTimeout(() => { isScrolling.current = false; }, 900);
  };

  // --- 4. EARLY RETURNS (AFTER ALL HOOKS) ---
  if (loading) return <div className="mystic-loader">Loading story…</div>;
  if (!story) return <div className="mystic-loader">Story not available.</div>;

  const paragraphs = story.full_story.split("\n").filter((p) => p.trim() !== "");
  const pages = [
    { type: "hero", title: story.title, district: story.district, image: story.image },
    ...paragraphs.map((p) => ({ type: "content", text: p })),
    { type: "map" }, 
    { type: "end" },
  ];

  return (
    <>
      <Navbar />
      <div className="book-stage" onWheel={handleWheel}>
        <button className="nav-close" onClick={() => navigate(-1)}>✕</button>

        <div className="story-controls-overlay">
          <button 
            className={`bookmark-btn-floating ${isBookmarked ? 'active' : ''}`} 
            onClick={toggleBookmark}
          >
            {isBookmarked ? "❤️" : "🤍"}
          </button>

          <button 
            className={`audio-narrator-btn ${isSpeaking ? 'speaking' : ''}`} 
            onClick={toggleAudioNarrative}
          >
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
            
            {pages[currentPage].type === "map" && (
              <div className="page-content" style={{ padding: '20px', textAlign: 'center' }}>
                <h2 className="gold-accent mb-4">THE SACRED GEOGRAPHY</h2>
                <div style={{ width: '100%', height: '400px', borderRadius: '12px', border: '1px solid #d4af37', overflow: 'hidden' }}>
                  <MythMap 
                    stories={[story]} 
                    center={[parseFloat(story.latitude), parseFloat(story.longitude)]} 
                    zoom={14} 
                  />
                </div>
              </div>
            )}

            {pages[currentPage].type === "end" && (
              <div className="page-content text-center">
                <h2 className="gold-accent">The End</h2>
                <p className="story-text">The legend of {story.title} is now part of your journey.</p>
                <button className="submit-btn-gold mt-4" onClick={() => navigate("/myth")}>
                  Return to Archive
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}