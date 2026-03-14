import axios from "axios";

// This logic ensures that if the environment variable fails, it defaults to your live site
const API_BASE = import.meta.env.VITE_API_URL || "https://unveiling-kerala.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export default api;