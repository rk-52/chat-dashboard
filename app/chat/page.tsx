"use client";

import { useState } from "react";
import { askAI } from "../lib/ai";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    const aiResponse = await askAI(input);

    setMessages((prev) => [
      ...prev,
      "You: " + input,
      "AI: " + aiResponse,
    ]);

    setInput("");
  };

  return (
    <div>
      <h2>AI Chat</h2>

      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}