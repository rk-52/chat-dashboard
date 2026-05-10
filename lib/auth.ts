import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import GoogleProvider from "next-auth/providers/google";

// This is your NextAuth config — reusable across the whole app
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.OIDC_CLIENT_ID!,
      clientSecret: process.env.OIDC_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // This runs every time a session is checked
    async session({ session, token }: any) {
      // Attach user ID to session so you can use it in your app
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

// Helper function: call this in any server component or API route
// to check "is someone logged in?"
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null; // returns user or null
}

// Helper function: protects API routes
// If not logged in → throws error
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated. Please sign in.");
  }
  return user;
}