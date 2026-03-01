import { useLocation } from "react-router-dom";

export default function ExploreMap() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchTerm = queryParams.get("search") || "";

    const [map, setMap] = useState(null);
    const [legends, setLegends] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        // Fetch stories from backend
        axios.get("http://127.0.0.1:8000/api/map-legends/").then(res => {
            const data = res.data;
            setLegends(data);
            
            // Filter based on Navbar search
            if (searchTerm) {
                const results = data.filter(l => 
                    l.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFiltered(results);

                // If exactly one result is found, fly to it!
                if (results.length === 1 && map) {
                    map.flyTo([results[0].latitude, results[0].longitude], 14);
                }
            } else {
                setFiltered(data);
            }
        });
    }, [searchTerm, map]); // Re-run when search term or map changes

    return (
        <div className="explore-page">
            <Navbar />
            <div className="map-wrapper">
                <MapContainer ref={setMap} center={[10.8505, 76.2711]} zoom={7}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    {filtered.map(story => (
                        <Marker key={story.id} position={[story.latitude, story.longitude]}>
                            <Popup>
                                <strong>{story.title}</strong><br/>
                                <button onClick={() => navigate(`/story/${story.slug}`)}>Read</button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}