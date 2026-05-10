"use client";

import { useState } from "react";

interface Props {
  onSend: (text: string) => void;  // parent tells it what to do on send
  disabled: boolean;                // disables while AI is thinking
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);    // hand off to parent (ChatBox → useChat → AI)
    setText("");     // clear input
  };

  return (
    <div className="flex gap-2 p-4 border-t border-gray-700">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 
                   outline-none focus:ring-2 focus:ring-blue-500
                   disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 
                   rounded-xl disabled:opacity-50 transition-colors"
      >
        {disabled ? "..." : "Send"}
      </button>
    </div>
  );
}