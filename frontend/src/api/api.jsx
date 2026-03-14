import axios from "axios";

const api = axios.create({
  // Adding /api/ here and ensuring no trailing slash issues
  baseURL: "https://unveiling-kerala.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to log exactly where the app is looking
api.interceptors.request.use((config) => {
  console.log("Fetching from:", config.baseURL + "/" + config.url);
  return config;
});

export default api;