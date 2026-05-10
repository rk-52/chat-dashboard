"use client";

import { useChat } from "@/hooks/useChat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";


export default function ChatBox() {
  const { messages, loading, error, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden">
      
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-white font-semibold">AI Chat</h2>
      </div>

      <MessageList messages={messages} />

      {error && (
        <p className="text-red-400 text-sm px-4 pb-2">{error}</p>
      )}

      {loading && (
        <p className="text-gray-500 text-sm px-4 pb-2 italic">
          AI is thinking...
        </p>
      )}

      <MessageInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}