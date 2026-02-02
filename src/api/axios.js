// src/api/axios.js
import axios from "axios";

export const API_URL = "https://api.marvelousmart.com/api/";
export const MEDIA_URL = "https://api.marvelousmart.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false, // JWT only
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    const guestId = localStorage.getItem("guest_id");

    // ✅ Auth header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    // ✅ Guest header
    if (guestId) {
      config.headers["X-GUEST-ID"] = guestId;
    }

    // ✅ Ensure JSON for POST/PUT/PATCH
    if (["post", "put", "patch"].includes(config.method)) {
      config.headers["Content-Type"] = "application/json";
    }

    // 🔥 Disable cache ONLY for GET dynamic APIs
    if (
      config.method === "get" &&
      (
        config.url?.includes("orders") ||
        config.url?.includes("cart") ||
        config.url?.includes("payments")
      )
    ) {
      config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      config.headers["Pragma"] = "no-cache";
      config.headers["Expires"] = "0";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
