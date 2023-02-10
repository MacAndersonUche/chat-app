import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage";
import HomePage from "./components/HomePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chats" element={<ChatPage />} />
    </Routes>
  );
}
