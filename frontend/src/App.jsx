import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";

import PlayerHome from "./pages/PlayerHome.jsx";
import AdminHome from "./pages/AdminHome.jsx";

import { Background } from "./assets/index.js";
import { AuthContext, useAuthContext } from "../context/AuthContext.jsx";
import AdminProtectedRoute from "../role_routing/admin_route.jsx";
import PlayerProtectedRoute from "../role_routing/player_route.jsx";
import AdminResults from "./pages/AdminResult.jsx";
import LivePage from "./pages/LivePage.jsx";
import LiveRoute from "../role_routing/live_route.jsx";
import ResultRoute from "../role_routing/admin_result_route.jsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div
      className="bg-cover h-full"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <PlayerProtectedRoute>
              <PlayerHome />{" "}
            </PlayerProtectedRoute>
          }
        />
        <Route
          path="/admin-home"
          element=<AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/admin-signup"
          element={authUser ? <Navigate to="/" /> : <AdminSignup></AdminSignup>}
        />
        <Route path="/admin-result" element={<ResultRoute><AdminResults/></ResultRoute> } />
        <Route
          path="/live-page"
          element={
            <LiveRoute>
              <LivePage />
            </LiveRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
