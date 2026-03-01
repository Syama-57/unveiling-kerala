import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SubmitContent.css";
import { districts } from "../data/districts";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default icon issue in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to animate map movement
function MapViewHandler({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

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
  
  // Coordinate and Map states
  const [latitude, setLatitude] = useState(10.8505);
  const [longitude, setLongitude] = useState(76.2711);
  const [mapZoom, setMapZoom] = useState(7);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Search function to find coordinates based on Title + District
  const searchLocation = async (query) => {
    if (!query || query.length < 3) return;
    try {
      const searchQuery = `${query}, ${district || ""}, Kerala, India`;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await res.json();
      
      if (data && data.length > 0) {
        setLatitude(parseFloat(data[0].lat));
        setLongitude(parseFloat(data[0].lon));
        setMapZoom(16); // Close-up view
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  // Manual pin-drop listener
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });
    return <Marker position={[latitude, longitude]} />;
  }

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
            if (data.latitude && data.longitude) {
                setLatitude(parseFloat(data.latitude));
                setLongitude(parseFloat(data.longitude));
                setMapZoom(15);
            }
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
    formData.append("latitude", latitude.toFixed(6));
    formData.append("longitude", longitude.toFixed(6));
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
        setMessage(isEditMode ? "Legend updated." : "Legend submitted!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError("Failed to save.");
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
            <div className="mystic-row" style={{ alignItems: 'flex-end', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  className="mystic-input" 
                  placeholder="Title of the Legend" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              <button 
                type="button" 
                className="submit-btn-gold" 
                style={{ height: '50px', width: 'auto', padding: '0 20px', marginBottom: '15px' }}
                onClick={() => searchLocation(title)}
              >
                Locate
              </button>
            </div>

            <div className="mystic-row">
              <select className="mystic-select" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                <option value="" disabled>District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="mystic-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="" disabled>Category</option>
                <option value="ghost">Ghost Story</option>
                <option value="temple">Temple Legend</option>
                <option value="tribe">Tribal Story</option>
                <option value="nature">Nature & Mountain</option>
                <option value="folklore">Local Folklore</option>
              </select>
            </div>

            {/* --- THE PROFESSIONAL AUTO-MAP --- */}
            <div className="map-picker-container" style={{ margin: "10px 0 20px 0" }}>
              <div style={{ height: "300px", borderRadius: "12px", border: "1px solid #d4af37", overflow: "hidden" }}>
                <MapContainer center={[latitude, longitude]} zoom={mapZoom} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  <LocationMarker />
                  <MapViewHandler center={[latitude, longitude]} zoom={mapZoom} />
                </MapContainer>
              </div>
              <p style={{ fontSize: "11px", color: "#d4af37", marginTop: "8px", textAlign: "center", opacity: 0.8 }}>
                Location pinned at {latitude.toFixed(4)}, {longitude.toFixed(4)}. Drag map or tap to adjust.
              </p>
            </div>

            <input type="text" className="mystic-input" placeholder="The Hook (Short Summary)" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
            <textarea className="mystic-textarea" placeholder="The full legend..." value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required />
            
            <div className="file-box">
               <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
            
            <button type="submit" className="submit-btn-gold">{isEditMode ? "Update Legend" : "Submit to Chronicles"}</button>
          </form>
          
          {error && <div className="mystic-error">{error}</div>}
          {message && <div className="mystic-success">{message}</div>}
        </div>
      </div>
    </>
  );
}