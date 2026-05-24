import api from "../lib/api";


export const websiteApi = {
  create: (data) => api.post("/api/website/create", data).then(res => res.data),

  getAll: () => api.get("/api/website/").then(res => res.data),

  getStats: (id) => api.get(`/api/website/${id}/stats`).then(res => res.data),

  getDashboard: () => api.get("/api/website/dashboard").then(res => res.data),

  update: (id, data) => api.put(`/api/website/${id}`, data).then(res => res.data),

  delete: (id) => api.delete(`/api/website/${id}`).then(res => res.data),
};