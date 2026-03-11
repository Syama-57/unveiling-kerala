import axios from "axios";

// This ensures that even if the URL is missing a trailing slash or the /api/ suffix, it gets fixed.
const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  
  // 1. Remove any trailing slash first to avoid double slashes
  url = url.replace(/\/$/, "");
  
  // 2. Ensure it ends with /api/
  return `${url}/api/`;
};

const api = axios.create({
  // 1. Ensure the domain ends with /api/
  // 2. Use a fallback for local development
  baseURL: (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "") + "/api/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error.response exists before accessing status
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      // Prevent redirect loop if already on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;