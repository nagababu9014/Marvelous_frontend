// src/api/axios.js
import axios from "axios";

export const API_URL = "https://api.marvelousmart.com/api/";
export const MEDIA_URL = "https://api.marvelousmart.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false, // ✅ JWT ONLY
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    const guestId = localStorage.getItem("guest_id");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    if (guestId) {
      config.headers["X-GUEST-ID"] = guestId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
