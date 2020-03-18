import * as functions from 'firebase-functions';
import { ApolloServer, gql } from "apollo-server-cloud-functions";
import { getSakes } from "./db/sakes";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const typeDefs = gql`
  type Sake {
    id: Int
    name: String
  }

  type Query {
    sakeList: [Sake]
    sakes: [Sake]
  }
`;

const resolvers = {
  Query: {
    sakeList: () => getSakes(), // 互換性保持のために残す.
    sakes: () => getSakes(),
  },
};

const server = new ApolloServer({
  typeDefs
  ,resolvers
  ,context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res
  })
});

exports.graphql = functions.https.onRequest(server.createHandler());

