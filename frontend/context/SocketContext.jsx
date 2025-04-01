import React, { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  //On active session all users will be redirected to the live-page
  const [sessionActive, setSessionActive] = useState(false);

  //SessionData is the song link from the crawler.
  const [sessionData,setSessionData] = useState([null,null]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://jamoveo-qvvw.onrender.com", {
        query: {
          userId: authUser._id,
          role: authUser.role
        },
      });

      setSocket(socket);
      
      socket.on("sessionStart", (data) => {
        setSessionActive(true);
        setSessionData(data);
        console.log("Admin initiated session: ",sessionData);        
      });

      socket.on("sessionEnd", () => {
        setSessionActive(false);
        setSessionData([null,null]);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider
      value={{ socket, sessionActive, setSessionActive,sessionData}}
    >
      {children}
    </SocketContext.Provider>
  );
};
