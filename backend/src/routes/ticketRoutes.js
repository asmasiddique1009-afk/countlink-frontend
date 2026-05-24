const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  getTicketById,
  addMessage,

} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// user
router.post("/create", protect, createTicket);
router.get("/", protect, getTickets);
router.get("/:id", protect, getTicketById);
router.post("/:id/message", protect, addMessage);



module.exports = router;