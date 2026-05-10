"use client"; // ← this file is a client component

import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/apolloClient";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {/* SessionProvider → makes useSession() work anywhere */}
      <ApolloProvider client={client}>
        {/* ApolloProvider → makes useQuery/useMutation work anywhere */}
        {children}
        {/* children = every page in your app */}
      </ApolloProvider>
    </SessionProvider>
  );
}