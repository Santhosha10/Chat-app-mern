import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import connectToMongoDB, { getMongoHealth } from "./DB/mongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server, getOnlineUserIds } from "./socket/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const allowedOrigins = [process.env.CLIENT_ORIGIN, "http://localhost:3000"]
  .filter(Boolean)
  .join(",")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    if (
      process.env.NODE_ENV === "production" &&
      hostname.endsWith(".onrender.com")
    )
      return true;
  } catch {
    return false;
  }

  return false;
};

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isOriginAllowed(origin)) {
    res.header("Access-Control-Allow-Origin", origin || allowedOrigins[0]);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/api/health", async (req, res) => {
  const database = await getMongoHealth();
  const isHealthy = database.status === "ok";

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    service: "chatway-api",
    uptime: process.uptime(),
    database,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/socket-health", (req, res) => {
  res.status(200).json({
    status: "ok",
    onlineUsers: getOnlineUserIds().length,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

await connectToMongoDB();

server.listen(PORT, () => {
  console.log(`ChatWay API running on port ${PORT}`);
});
