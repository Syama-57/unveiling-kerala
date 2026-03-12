import axios from "axios";

// This ensures we hit the live backend in production
const API_BASE = import.meta.env.VITE_API_URL || "https://unveiling-kerala.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export default api;