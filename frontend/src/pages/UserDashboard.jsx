import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./SubmitContent.css";

export default function UserDashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyStories = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/my-stories/", {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("accessToken"); // Clear invalid token
          navigate("/login");
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setStories(data);
        } else {
          setError("Failed to reach the archives.");
        }
      } catch (err) {
        setError("Server error. Check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyStories();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this legend?")) return;
    
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/stories-manage/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setStories(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      alert("Could not delete the story.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="submit-container">
        <div className="submit-glass-card">
          <h2 className="mystic-title">My Archived Legends</h2>
          
          {loading ? (
            <p className="mystic-subtitle text-center">Consulting the scrolls...</p>
          ) : (
            <div className="dashboard-grid">
              {stories.length === 0 ? (
                <p className="mystic-subtitle text-center">No stories found in your archives.</p>
              ) : (
                stories.map((story) => (
                  <div key={story.id} className="story-item-card">
                    <div className="story-info">
                      <h4>{story.title}</h4>
                      <span className="category-badge">{story.category}</span>
                    </div>
                    <div className="dashboard-actions">
                      <button 
                        onClick={() => navigate(`/edit/${story.id}`)} 
                        className="btn-edit-small"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(story.id)} 
                        className="btn-delete-small"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {error && <div className="mystic-error">{error}</div>}
        </div>
      </div>
    </>
  );
}