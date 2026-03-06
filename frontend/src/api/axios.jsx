import axios from "axios";

const api = axios.create({
  // This line is the most important!
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Force redirect to login
    }
    return Promise.reject(error);
  }
);