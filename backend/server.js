import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongoDB from "./db/mongodb.connector.js";

import authRoutes from "./routes/auth.routes.js";
import searchRoutes from "./routes/search.routes.js";

import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();

dotenv.config();

connectToMongoDB();

const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
