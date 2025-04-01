import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const useSession = () => {
  const { sessionActive, setSessionActive, socket } = useSocketContext();
  const useQuit = () => {
    if (socket) {
      socket.emit("sessionEnd");
    }
  };

  const useStart = (data) => {
    if (socket) {
      socket.emit("sessionStart",data);
    }
  };
  return { useQuit, useStart };
};

export default useSession;
