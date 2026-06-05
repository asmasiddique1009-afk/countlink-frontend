const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required:true,
    },
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    type: { type: String, enum: ["MESSAGE_RECEIVED", "order"], default: "message" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", notificationSchema);
