"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_MESSAGES } from "@/graphql/queries/getMessages";
import { SEND_MESSAGE } from "@/graphql/mutations/sendMessage";
import { Message } from "@/types";

// A custom hook is just a function that starts with "use"
// It packages up related logic so any component can use it
export function useChat() {
  const [aiMessages, setAiMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FETCH messages from GraphQL
  // useQuery runs automatically when component loads
  const { data: graphqlData } = useQuery(GET_MESSAGES);

  // SEND message via GraphQL mutation
  const [sendGraphQLMessage] = useMutation(SEND_MESSAGE);

  // SEND message to AI + store in GraphQL
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);

    // 1. Add user message to local state immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };
    setAiMessages((prev) => [...prev, userMessage]);

    try {
      // 2. Save to GraphQL
      await sendGraphQLMessage({ variables: { text } });

      // 3. Ask AI for response
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      const { reply } = data;

      // 4. Add AI response to state
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "ai",
        timestamp: Date.now(),
      };
      setAiMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(errorMessage);
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages: aiMessages,  
    loading,               
    error,                 
    sendMessage,         
  };
}
