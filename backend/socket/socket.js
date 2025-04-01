import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://jamoveo-qvvw.onrender.com"],
  },
});

//Admin socket list to end session in case of admin DC
const adminSocketList = [];



io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  const userId = socket.handshake.query.userId;
  const role = socket.handshake.query.role;
  if (userId != "undefined" && role == "admin") adminSocketList.push(socket.id);


  socket.on("sessionStart", (data) => {
    console.log("Session started by:", userId);
    io.emit("sessionStart",data);
  });

  socket.on("sessionEnd", () => {
    console.log("Session ended by:", userId);
    io.emit("sessionEnd");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
    if (adminSocketList.includes(socket.id)) {
      io.emit("sessionEnd");
    }
    
  });
});
export { app, io, server };
