import { create } from "zustand";
import { ticketAPI } from "../services/ticketApi";


export const useSupportStore = create((set, get) => ({
  tickets: [],
  selectedTicket: null,
  searchQuery: "",
  statusFilter: "all",

  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  setSearchQuery: (val) => set({ searchQuery: val }),
  setStatusFilter: (val) => set({ statusFilter: val }),

  // GET TICKETS
  getTickets: async () => {
    try {
      const res = await ticketAPI.getAll();
      set({ tickets: res.data.tickets || [] });
    } catch (err) {
      console.error("Get tickets error:", err);
    }
  },

  // CREATE TICKET
  createTicket: async (data) => {
    try {
      const res = await ticketAPI.create(data);

      const newTicket = res.data.ticket;

      // update UI instantly
      set((state) => ({
        tickets: [newTicket, ...state.tickets],
      }));

      return newTicket;
    } catch (err) {
      console.error("Create ticket error:", err);
      throw err;
    }
  },
  addMessage: async (ticketId, message) => {
  try {
    const res = await ticketAPI.addMessage(ticketId, {
      message,
    });

    const updatedTicket = res.data.ticket;

    set((state) => ({
      tickets: state.tickets.map((t) =>
        t._id === ticketId ? updatedTicket : t
      ),
    }));

    return updatedTicket;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
}));