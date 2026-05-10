import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/lib/schema";
import { resolvers } from "@/lib/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export async function POST(req: Request) {
  const body = await req.json();

  const result = await server.executeOperation({
    query: body.query,
    variables: body.variables,
  });

  return Response.json(result);
}