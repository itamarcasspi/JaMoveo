import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // Adjust the path
import { useSocketContext } from "../context/SocketContext";

const ResultRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  const { sessionActive } = useSocketContext();

  if (!authUser) {
    return <Navigate to="/login" />;
  } else if (sessionActive) {
    return <Navigate to="/live-page" />;
  } 
  return children;
};

export default ResultRoute;
