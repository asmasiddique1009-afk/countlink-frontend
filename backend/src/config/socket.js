const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
// Backend server.js
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Exact match hona chahiye
    methods: ["GET", "POST"],
    credentials: true, // Agar sessions/cookies use kar rahe hain
  },
});
const getReceiverSocketId = (userId) => {
  return onlineUsers[userId];
};
const onlineUsers = {};

// Backend: server.js
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
console.log(userId)
  if (userId) {
    onlineUsers[userId] = socket.id;
    console.log(`✅ User ${userId} connected. Socket: ${socket.id}`);
    // Yahan log karwayein
    console.log("Current Online Users Object:", onlineUsers);
  }

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    const disconnectedUserId = socket.handshake.auth.userId;
    if (disconnectedUserId) {
      delete onlineUsers[disconnectedUserId];
      io.emit("getOnlineUsers", Object.keys(onlineUsers));
      console.log(`❌ User ${disconnectedUserId} disconnected`);
      // Yahan disconnect ke baad ka state log karwayein
      console.log("Updated Online Users Object after disconnect:", onlineUsers);
    }
  });

  socket.on("connect_error", (err) => {
    console.log("❌ Connection Error Details:", err.message);
  });
});

module.exports = { app, server, io, onlineUsers, getReceiverSocketId };
