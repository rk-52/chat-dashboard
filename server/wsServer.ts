import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@/lib/schema";
import { resolvers } from "@/lib/resolvers";
import { EventEmitter } from "events";

export const pubsub = new EventEmitter();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wss = new WebSocketServer({ port: 4000 });

useServer({ schema }, wss);

console.log("WebSocket server running on ws://localhost:4000");
