import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // Adjust the path
import { useSocketContext } from "../context/SocketContext";

const PlayerProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  const {sessionActive} = useSocketContext();
  if (sessionActive) {
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  } else if (sessionActive) {
    return <Navigate to="/live-page" />;
  } else if (authUser.role === "admin") {
    return <Navigate to="/admin-home" />;
  }

  return children;
};

export default PlayerProtectedRoute;
