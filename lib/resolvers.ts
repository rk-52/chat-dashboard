let messages: any[] = [];

export const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_: any, { text }: any) => {
      const msg = { id: Date.now().toString(), text };
      messages.push(msg);
      return msg;
    },
  },
};