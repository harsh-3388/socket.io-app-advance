"use client";

import { useState, useEffect, useRef } from "react";
import useSocket from "./hooks/useSocket";
import "./globals.css";

export default function Home() {
  const { messages, sendMessage } = useSocket();
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="container">
      <div className="header">Chat with AI</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isServer ? "server" : "client"}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
        />
        <button onClick={handleSend} className="button">
          Send
        </button>
      </div>
    </div>
  );
}
