import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// ─── TOKEN HELPERS ───
// ─── Token helpers ───
export const setTokens = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
};
// ─── Attach token automatically ───
// Add this to your api.js after the request interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Details:", {
      status: error?.response?.status,
      url: error?.config?.url,
      serverMessage: error?.response?.data,  // ← THIS is what your backend is returning
    });
    return Promise.reject(error);
  }
);

// ─── AUTH API ───
export const authApi = {
  signup: (data) => api.post("/api/auth/signup", data).then((r) => r.data),
  login: (data) => api.post("/api/auth/login", data).then((r) => r.data),
  getMe: () => api.get("/api/auth/me").then((r) => r.data),
};

export default api;