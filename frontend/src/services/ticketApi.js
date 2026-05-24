
import api from "../lib/api";

export const ticketAPI = {
    create: (data) => api.post("/api/tickets/create", data),

    getAll: () => api.get("/api/tickets"),

    getById: (id) => api.get(`/api/tickets/${id}`),

    addMessage: (id, data) =>
        api.post(`/api/tickets/${id}/message`, data),
};