import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/lib/schema";
import { resolvers } from "@/lib/resolvers";

let server: ApolloServer | null = null;

async function getServer() {
  if (!server) {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
  }
  return server;
}

export async function POST(req: Request) {
  try {
    const apolloServer = await getServer();
    const body = await req.json();

    const result = await apolloServer.executeOperation({
      query: body.query,
      variables: body.variables,
    });

    if (result.body.kind === "single") {
      return Response.json(result.body.singleResult);
    }

    return Response.json(result);
  } catch (error) {
    console.error("GraphQL error:", error);
    return Response.json(
      { errors: [{ message: "Internal server error" }] },
      { status: 500 }
    );
  }
}