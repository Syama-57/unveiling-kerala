import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SubmitContent.css";
import { districts } from "../data/districts";
import Navbar from "../components/Navbar";

export default function SubmitContent() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const fetchStoryData = async () => {
        const token = localStorage.getItem("accessToken");
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/stories-manage/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const data = await res.json();
            setTitle(data.title || "");
            setDistrict(data.district || "");
            setCategory(data.category || "");
            setShortDesc(data.short || ""); 
            setDescription(data.full_story || "");
          } else {
            setError("Could not retrieve the legend.");
          }
        } catch (err) {
          setError("Server error while fetching story.");
        }
      };
      fetchStoryData();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
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
      const url = isEditMode 
        ? `http://127.0.0.1:8000/api/stories-manage/${id}/` 
        : "http://127.0.0.1:8000/api/submit/";
      
      const res = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setMessage(isEditMode ? "The legend has been updated." : "Story submitted!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError("Failed to save changes.");
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="submit-container">
        <div className="submit-glass-card">
          <button className="btn-back-mystic" onClick={() => navigate(-1)}>← Back</button>
          <h2 className="mystic-title">{isEditMode ? "Revise Legend" : "Share Tale"}</h2>
          <form className="submit-form" onSubmit={handleSubmit}>
            <input type="text" className="mystic-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div className="mystic-row">
              <select className="mystic-select" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                <option value="" disabled>District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="mystic-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="" disabled>Select Category</option>
                <option value="ghost">Ghost Story</option>
                <option value="temple">Temple Legend</option>
                <option value="tribe">Tribal Story</option>
                <option value="nature">Nature & Mountain Legends</option>
                <option value="folklore">Local Folklore</option>
              </select>
            </div>
            <input type="text" className="mystic-input" placeholder="Hook" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
            <textarea className="mystic-textarea" placeholder="Full Story" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required />
            <div className="file-box">
               <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
            <button type="submit" className="submit-btn-gold">{isEditMode ? "Update" : "Submit"}</button>
          </form>
          {error && <div className="mystic-error">{error}</div>}
          {message && <div className="mystic-success">{message}</div>}
        </div>
      </div>
    </>
  );
}