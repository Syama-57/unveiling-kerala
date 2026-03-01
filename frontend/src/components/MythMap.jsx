import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MythMap = ({ stories, center = [10.8505, 76.2711], zoom = 7 }) => {
  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {stories.map(story => (
          story.latitude && story.longitude && (
            <Marker key={story.id || story.slug} position={[story.latitude, story.longitude]}>
              <Popup>
                <div style={{ textAlign: 'center', fontFamily: 'serif' }}>
                  <strong style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
                    {story.title}
                  </strong>
                  {/* Direct Link to Google Maps App/Web */}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${story.latitude},${story.longitude}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: '#d4af37',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}
                  >
                    📍 Open in Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MythMap;