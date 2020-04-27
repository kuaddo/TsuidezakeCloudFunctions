import * as functions from 'firebase-functions';
import { ApolloServer } from "apollo-server-cloud-functions";
import { typeDefs } from "./typeDefs"; 
import { resolvers } from "./resolvers/index";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const server = new ApolloServer({
  typeDefs
  ,resolvers
  ,context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res
  })
  ,introspection: true
});

exports.graphql = functions.https.onRequest(server.createHandler());

