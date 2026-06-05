const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const { io, getReceiverSocketId, onlineUsers } = require("../config/socket");
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate("participants", "fullName avatar role status")
      // Yahan lastMessage ko populate karein
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Error fetching conversations" });
  }
};

// 2. Get messages for a specific conversation
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Verify if user is part of this conversation
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id,
    });

    if (!conversation) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    }); // Oldest messages first

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};
const startConversation = async (req, res) => {
  const { receiverId, orderId } = req.body; // Frontend se orderId receive karein
  const senderId = req.user.id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
    orderId: orderId, // Sirf wahi chat uthao jo is order ki ho
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      orderId: orderId, // Nayi chat mein orderId save karein
    });
  }
  res.json(conversation);
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId, receiverId, text } = req.body;
    const senderId = req.user.id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation)
      return res.status(404).json({ error: "Conversation not found" });

    const newMessage = await Message.create({ conversationId, senderId, text });

    const notification = await Notification.create({
      userId: receiverId,
      senderId: senderId,
      messageId: newMessage._id,
      type: "MESSAGE_RECEIVED", // Standardize type
      message: `You have received a new message from the publisher. Click to view and respond.`,
    });

    // 3. Conversation update karein
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id,
      $inc: { unreadCount: 1 }, // Ye feature zaroori hai unread count ke liye
    });

    // 4. Socket ke zariye bhej dein
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("Looking for:", receiverId);
    console.log("Available map:", onlineUsers);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", newMessage);

      // Notification ko complete object ke saath bhejein
      io.to(receiverSocketId).emit("new_notification", {
        ...notification.toObject(),
        conversationId: conversationId, // Ye navigation ke liye zaroori hai
        senderName: req.user.name,
      });
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  startConversation,
  sendMessage,
  getConversations,
  getMessages,
};
