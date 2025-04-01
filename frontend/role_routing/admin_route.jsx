import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // Adjust the path
import { useSocketContext } from "../context/SocketContext";

const AdminProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  const { sessionActive } = useSocketContext();

  if (!authUser) {
    return <Navigate to="/login" />;
  } else if (sessionActive) {
    return <Navigate to="/live-page" />;
  } else if (authUser.role === "player") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;
