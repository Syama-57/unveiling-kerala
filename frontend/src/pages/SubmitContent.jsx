import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SubmitContent.css";
import { districts } from "../data/districts";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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

  const [latitude, setLatitude] = useState(10.8505);
  const [longitude, setLongitude] = useState(76.2711);
  const [mapZoom, setMapZoom] = useState(7);

  const [suggestions, setSuggestions] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

  // -----------------------------
  // SEARCH LOCATION (LOCATE BUTTON)
  // -----------------------------

  const searchLocation = async (query) => {

    if (!query || query.length < 3) return;

    try {

      const searchQuery = `${query}, ${district || ""}, Kerala, India`;

      const url =
        "https://corsproxy.io/?https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(searchQuery) +
        "&limit=1";

      const res = await fetch(url);

      const data = await res.json();

      if (data && data.length > 0) {

        setLatitude(parseFloat(data[0].lat));
        setLongitude(parseFloat(data[0].lon));
        setMapZoom(16);

      } else {

        setError("Location not found");

      }

    } catch (err) {

      console.error("Geocoding error:", err);
      setError("Failed to locate place");

    }

  };

  // -----------------------------
  // AUTOCOMPLETE SUGGESTIONS
  // -----------------------------

  const fetchSuggestions = async (value) => {

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {

      const url =
        "https://corsproxy.io/?https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(value + ", Kerala, India") +
        "&limit=5";

      const res = await fetch(url);
      const data = await res.json();

      setSuggestions(data);

    } catch {
      setSuggestions([]);
    }

  };

  const selectSuggestion = (place) => {

    setTitle(place.display_name);

    setLatitude(parseFloat(place.lat));
    setLongitude(parseFloat(place.lon));

    setMapZoom(16);

    setSuggestions([]);

  };

  function LocationMarker() {

    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return <Marker position={[latitude, longitude]} />;

  }

  // -----------------------------
  // LOAD STORY IF EDIT MODE
  // -----------------------------

  useEffect(() => {

    if (isEditMode) {

      const fetchStoryData = async () => {

        const token = localStorage.getItem("accessToken");

        try {

          const res = await fetch(`${API_BASE}/stories-manage/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

        } catch {

          setError("Server error while fetching story.");

        }

      };

      fetchStoryData();

    }

  }, [id, isEditMode, API_BASE]);

  // -----------------------------
  // SUBMIT STORY
  // -----------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("short", shortDesc);
    formData.append("full_story", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("category", category);
    formData.append("district", district);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {

      const res = await fetch(`${API_BASE}/submit/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 200 || res.status === 201) {

        setMessage("Legend submitted successfully!");
        setError("");

        setTimeout(() => navigate("/dashboard"), 2000);

      } else {

        setError(data.detail || "Failed to save.");

      }

    } catch {

      setError("Network error.");

    }

  };

  return (
    <>
      <Navbar />

      <div className="submit-container">

        <div className="submit-glass-card">

          <button className="btn-back-mystic" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h2 className="mystic-title">
            {isEditMode ? "Revise Legend" : "Share Tale"}
          </h2>

          <form className="submit-form" onSubmit={handleSubmit}>

            {/* TITLE + LOCATE */}

            <div className="mystic-row" style={{ alignItems: "flex-end", gap: "10px" }}>

              <div style={{ flex: 1, position: "relative" }}>

                <input
                  type="text"
                  className="mystic-input"
                  placeholder="Title of the Legend"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    fetchSuggestions(e.target.value);
                  }}
                  required
                />

                {/* AUTOCOMPLETE DROPDOWN */}

                {suggestions.length > 0 && (

                  <div className="location-suggestions">

                    {suggestions.map((s, index) => (

                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => selectSuggestion(s)}
                      >
                        {s.display_name}
                      </div>

                    ))}

                  </div>

                )}

              </div>

              <button
                type="button"
                className="submit-btn-gold"
                style={{
                  height: "50px",
                  padding: "0 20px",
                  marginBottom: "15px",
                }}
                onClick={() => searchLocation(title + " " + district)}
              >
                Locate
              </button>

            </div>

            {/* DISTRICT + CATEGORY */}

            <div className="mystic-row">

              <select
                className="mystic-select"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <option value="" disabled>District</option>

                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}

              </select>

              <select
                className="mystic-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Category</option>
                <option value="ghost">Ghost Story</option>
                <option value="temple">Temple Legend</option>
                <option value="tribe">Tribal Story</option>
                <option value="nature">Nature & Mountain</option>
                <option value="folklore">Local Folklore</option>
              </select>

            </div>

            {/* MAP */}

            <div className="map-picker-container">

              <MapContainer
                center={[latitude, longitude]}
                zoom={mapZoom}
                style={{ height: "300px", width: "100%" }}
              >

                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

                <LocationMarker />

                <MapViewHandler center={[latitude, longitude]} zoom={mapZoom} />

              </MapContainer>

            </div>

            {/* REST OF FORM */}

            <input
              type="text"
              className="mystic-input"
              placeholder="The Hook (Short Summary)"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              required
            />

            <textarea
              className="mystic-textarea"
              placeholder="The full legend..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />

            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

            <button type="submit" className="submit-btn-gold">
              {isEditMode ? "Update Legend" : "Submit to Chronicles"}
            </button>

          </form>

          {error && <div className="mystic-error">{error}</div>}
          {message && <div className="mystic-success">{message}</div>}

        </div>

      </div>
    </>
  );

}