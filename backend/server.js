import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

// ✅ Add explicit CORS middleware for normal REST routes
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://chat-app-mern-s97e.onrender.com", // your frontend URL on Render
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = http.createServer(app);

// ✅ Allow WebSocket + credentials
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chat-app-mern-s97e.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true, // 🔥 must be here for socket auth & cookies
  },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  console.log(`🟢 User connected: ${userId}`);

  userSocketMap[userId] = socket.id;

  // Notify all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${userId}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Always listen with the same HTTP server used by Socket.IO
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export { app, io, server };
