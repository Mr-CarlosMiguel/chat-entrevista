import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetAvatar from "./components/SetAvatar/SetAvatar";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./Auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/setAvatar" element={<PrivateRoute><SetAvatar /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
