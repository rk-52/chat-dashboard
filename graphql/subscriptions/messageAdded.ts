import { gql } from "@apollo/client";

export const MESSAGE_ADDED = gql`
  subscription OnMessageAdded {
    messageAdded {
      id
      text
    }
  }
`;