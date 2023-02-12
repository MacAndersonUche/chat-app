import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage";
import HomePage from "./components/HomePage";
import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:4400");
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />
    </Routes>
  );
}
