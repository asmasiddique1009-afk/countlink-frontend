const mongoose = require('mongoose');

// models/Conversation.js
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Ye field lazmi hai
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);