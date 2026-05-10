"use client";

import { useSession, signIn } from "next-auth/react";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  // useSession → reads the current login state
  // status = "loading" | "authenticated" | "unauthenticated"
  const { data: session, status } = useSession();

  // CASE 1: Still checking if user is logged in
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Checking login status...</p>
      </div>
    );
  }

  // CASE 2: User is NOT logged in → show login screen
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-950">
        <h1 className="text-4xl font-bold text-white">AI Chat Dashboard</h1>
        <p className="text-gray-400">Sign in</p>
        <button
          onClick={() => signIn("google")}
          // signIn("google") → triggers Google OIDC login flow
          className="bg-blue-600 hover:bg-blue-700 text-white 
                     px-8 py-3 rounded-xl font-medium transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // CASE 3: User IS logged in → show the chat
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 p-4">
      {/* Header bar */}
      <div className="flex justify-between items-center mb-4 max-w-3xl mx-auto w-full">
        <h1 className="text-xl font-bold text-white">AI Chat Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {session.user?.email}
            {/* shows logged-in user's email */}
          </span>
          <button
            onClick={() => signIn()}
            className="text-sm bg-gray-700 hover:bg-gray-600 
                       text-white px-3 py-1 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Chat UI — all the chat logic lives inside ChatBox */}
      <div className="flex-1 max-w-3xl mx-auto w-full">
        <ChatBox />
        {/* 
          ChatBox internally uses:
          - useChat() hook → handles messages, AI calls, GraphQL
          - MessageList   → displays messages
          - MessageInput  → captures user typing
        */}
      </div>
    </div>
  );
}