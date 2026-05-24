const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { subject, category, priority, relatedUrl, message } = req.body;

    const ticket = await Ticket.create({
      userId: req.user.id,
      subject,
      category,
      priority,
      relatedUrl,
      messages: [
        {
          sender: req.user.role,
          senderId: req.user.id,
          senderName: req.user.name,
          message,
        },
      ],
    });

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const addMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    ticket.messages.push({
      sender: req.user.role,
      senderId: req.user.id,
      senderName: req.user.name,
      message,
    });

    // update status automatically
    if (req.user.role === "admin") {
      ticket.status = "pending";
    } else {
      ticket.status = "open";
    }

    await ticket.save();

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = { createTicket, getTickets, addMessage, getTicketById };