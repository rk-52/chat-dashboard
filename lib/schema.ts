import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Message {
    id: ID!
    text: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    sendMessage(text: String!): Message
  }

  type Subscription {
    messageAdded: Message
  }
`;