import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
  ,context: async ({ req, res }) => {
    const firebaseAuthToken = req.headers.authorization;
    const currentUID = await admin.auth().verifyIdToken(firebaseAuthToken)
      .then(decodedToken => {
        return decodedToken.uid;
      }).catch(err => {
        console.error(err);
      });
    return { currentUID };
  }
  ,introspection: true
});

exports.graphql = functions.https.onRequest(server.createHandler());

