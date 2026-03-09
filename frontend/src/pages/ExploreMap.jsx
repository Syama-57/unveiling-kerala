import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar";

export default function ExploreMap() {

    const { search } = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(search);
    const searchTerm = queryParams.get("search") || "";

    const [map, setMap] = useState(null);
    const [legends, setLegends] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const API_BASE = import.meta.env.VITE_API_URL;

    useEffect(() => {

        axios.get(`${API_BASE}map-legends/`)
        .then(res => {

            const data = res.data;

            setLegends(data);

            if (searchTerm) {

                const results = data.filter(l =>
                    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    l.district.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setFiltered(results);

                if (results.length === 1 && map) {

                    map.flyTo(
                        [results[0].latitude, results[0].longitude],
                        14
                    );

                }

            } else {

                setFiltered(data);

            }

        })
        .catch(err => {
            console.error("Failed to load legends", err);
        });

    }, [searchTerm, map, API_BASE]);

    return (

        <div className="explore-page">

            <Navbar />

            <div className="map-wrapper">

                <MapContainer
                    whenCreated={setMap}
                    center={[10.8505, 76.2711]}
                    zoom={7}
                    style={{ height: "100vh", width: "100%" }}
                >

                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {filtered.map(story => (

                        <Marker
                            key={story.id}
                            position={[story.latitude, story.longitude]}
                        >

                            <Popup>

                                <strong>{story.title}</strong>

                                <br/>

                                <button
                                    onClick={() =>
                                        navigate(`/story/${story.slug}`)
                                    }
                                >
                                    Read
                                </button>

                            </Popup>

                        </Marker>

                    ))}

                </MapContainer>

            </div>

        </div>

    );

}