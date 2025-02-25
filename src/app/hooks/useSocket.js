"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function useSocket() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3001", { path: "/socket.io" });

      socket.on("newMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("connect", () => console.log("Connected to server!"));
      socket.on("disconnect", () => console.log("Disconnected from server!"));
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  const sendMessage = (text) => {
    if (!socket) {
      console.error("Socket is not connected!");
      return;
    }

    setMessages((prev) => [...prev, { text, isServer: false }]);
    socket.emit("sendMessage", text);
  };

  return { messages, sendMessage };
}
