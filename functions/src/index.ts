import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ApolloServer } from "apollo-server-cloud-functions";
import { readFileSync } from 'fs';
import * as path from 'path';
import { resolvers } from "./resolvers/index";

const typeDefs = [readFileSync(path.join(__dirname, "schemata/typeDefs.graphql"), "utf8")];

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

