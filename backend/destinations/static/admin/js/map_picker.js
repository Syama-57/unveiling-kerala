window.addEventListener('load', function() {
    const latInput = document.getElementById('id_latitude');
    const lngInput = document.getElementById('id_longitude');

    if (latInput && lngInput) {
        // Create a div for the map
        const mapDiv = document.createElement('div');
        mapDiv.id = 'admin-map';
        mapDiv.style.height = '400px';
        mapDiv.style.margin = '20px 0';
        mapDiv.style.borderRadius = '8px';
        mapDiv.style.border = '2px solid #ccc';
        
        // Insert it after the longitude input
        lngInput.closest('.form-row').after(mapDiv);

        // Initialize Map (Centered on Kerala)
        const map = L.map('admin-map').setView([10.8505, 76.2711], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        let marker;

        // If coordinates already exist, place the marker
        if (latInput.value && lngInput.value) {
            const lat = parseFloat(latInput.value);
            const lng = parseFloat(lngInput.value);
            marker = L.marker([lat, lng]).addTo(map);
            map.setView([lat, lng], 12);
        }

        // Click event to move marker and update text boxes
        map.on('click', function(e) {
            const { lat, lng } = e.latlng;
            if (marker) {
                marker.setLatLng([lat, lng]);
            } else {
                marker = L.marker([lat, lng]).addTo(map);
            }
            latInput.value = lat.toFixed(6);
            lngInput.value = lng.toFixed(6);
        });
    }
});