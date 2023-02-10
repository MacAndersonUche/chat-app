import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage";
import HomePage from "./components/HomePage";

export function App() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage setUserName={setUserName} setRoomName={setRoomName} />
        }
      />
      <Route path="/chats" element={<ChatPage />} />
    </Routes>
  );
}
