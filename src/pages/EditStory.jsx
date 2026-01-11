import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { districts } from "../data/districts";
import Navbar from "../components/Navbar";
import "./SubmitContent.css"; // Reuse your existing styles

export default function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch data on mount
  useEffect(() => {
    const fetchStory = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/stories-manage/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setDistrict(data.district || "");
          setCategory(data.category || "");
          // Mapping "short" from Serializer to your "shortDesc" state
          setShortDesc(data.short || "");
          setDescription(data.full_story || "");
        } else {
          setError("Story not found.");
        }
      } catch (err) {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id, navigate]);

  // 2. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("district", district);
    formData.append("category", category);
    formData.append("short", shortDesc);
    formData.append("full_story", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/stories-manage/${id}/`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Update failed.");
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  if (loading) return <div className="text-center mt-5 mystic-title">Consulting the scrolls...</div>;

  return (
    <>
      <Navbar />
      <div className="submit-container">
        <div className="submit-glass-card">
          <button className="btn-back-mystic" onClick={() => navigate(-1)}>← Back</button>
          
          <h2 className="mystic-title mt-3">Revise the Legend</h2>
          <p className="mystic-subtitle">Updating history for ID: {id}</p>

          <form className="submit-form" onSubmit={handleUpdate}>
            <input
              type="text"
              className="mystic-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />

            <div className="mystic-row">
              <select className="mystic-select" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                <option value="" disabled>Select District</option>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>

              <select className="mystic-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="" disabled>Select Category</option>
                <option value="ghost">Ghost Story</option>
                <option value="temple">Temple Legend</option>
                <option value="tribe">Tribal Story</option>
                <option value="nature">Nature & Mountain</option>
                <option value="folklore">Local Folklore</option>
              </select>
            </div>

            <input
              type="text"
              className="mystic-input"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Hook"
              required
            />

            <textarea
              className="mystic-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Full Story"
              rows="5"
              required
            />

            <div className="file-box">
              <label>Update Image (Optional)</label>
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>

            <button type="submit" className="submit-btn-gold">Apply Changes</button>
          </form>

          {error && <div className="mystic-error text-center mt-3">{error}</div>}
        </div>
      </div>
    </>
  );
}