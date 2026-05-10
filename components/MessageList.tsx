"use client";

import { Message } from "@/types";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
      {messages.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No messages yet. Say something!
        </p>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
              message.sender === "user"
                ? "bg-blue-600 text-white rounded-br-none"   // user = right, blue
                : "bg-gray-700 text-white rounded-bl-none"   // ai = left, gray
            }`}
          >
            <span className="text-xs opacity-60 block mb-1">
              {message.sender === "user" ? "You" : "AI"}
            </span>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}