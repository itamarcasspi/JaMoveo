import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import connectToMongoDB from "./db/mongodb.connector.js";

import authRoutes from "./routes/auth.routes.js"
import scraperRoutes from "./routes/scraper.routes.js"

import { app, server } from "./socket/socket.js";

dotenv.config();

connectToMongoDB();

const PORT = process.env.PORT;





app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
}));
app.use("/api/auth",authRoutes);
app.use("/api/search",scraperRoutes);


server.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})