import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./SubmitContent.css"; 

export default function UserDashboard() {
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState("my-stories"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dynamic API Base URL
  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        // FIXED: Replaced 127.0.0.1 with API_BASE
        const myStoriesRes = await fetch(`${API_BASE}my-stories/`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        // FIXED: Replaced 127.0.0.1 with API_BASE
        const bookmarksRes = await fetch(`${API_BASE}my-bookmarks/`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (myStoriesRes.ok && bookmarksRes.ok) {
          const myData = await myStoriesRes.json();
          const bookmarkData = await bookmarksRes.json();
          setStories(myData);
          setBookmarks(bookmarkData);
        } else {
          setError("Failed to reach the archives.");
        }
      } catch (err) {
        setError("Server error. Check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, API_BASE]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this legend?")) return;
    const token = localStorage.getItem("accessToken");
    try {
      // FIXED: Replaced 127.0.0.1 with API_BASE
      const res = await fetch(`${API_BASE}stories-manage/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStories(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert("Could not delete the story.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="submit-container">
        <div className="submit-glass-card">
          <h2 className="mystic-title">Journal of Chronicles</h2>
          
          <div className="dashboard-tabs">
            <button 
              className={activeTab === "my-stories" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("my-stories")}
            >
              My Contributions
            </button>
            <button 
              className={activeTab === "bookmarks" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("bookmarks")}
            >
              Saved Legends
            </button>
          </div>

          {loading ? (
            <p className="mystic-subtitle text-center">Consulting the scrolls...</p>
          ) : (
            <div className="dashboard-grid">
              {activeTab === "my-stories" ? (
                stories.length === 0 ? (
                  <p className="mystic-subtitle text-center">Your ink has not yet met the parchment.</p>
                ) : (
                  stories.map((story) => (
                    <div key={story.id} className="story-item-card">
                      <div className="story-info">
                        <h4>{story.title}</h4>
                        <span className="category-badge">{story.category}</span>
                      </div>
                      <div className="dashboard-actions">
                        <button onClick={() => navigate(`/edit/${story.id}`)} className="btn-edit-small">Edit</button>
                        <button onClick={() => handleDelete(story.id)} className="btn-delete-small">Delete</button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                bookmarks.length === 0 ? (
                  <p className="mystic-subtitle text-center">No legends saved in your personal library.</p>
                ) : (
                  bookmarks.map((story) => (
                    <div key={story.id} className="story-item-card bookmark-card">
                      <div className="story-info">
                        <h4>{story.title}</h4>
                        <p className="district-text">{story.district}</p>
                      </div>
                      <div className="dashboard-actions">
                        <button onClick={() => navigate(`/story/${story.slug}`)} className="btn-view-small">Read</button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          )}
          {error && <div className="mystic-error">{error}</div>}
        </div>
      </div>
    </>
  );
}