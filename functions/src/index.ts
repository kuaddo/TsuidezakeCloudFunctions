import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ApolloServer, AuthenticationError } from "apollo-server-cloud-functions";
import { readFileSync } from 'fs';
import * as path from 'path';
import { resolvers } from "./resolvers/index";

const typeDefs = [readFileSync(path.join(__dirname, "schemata/typeDefs.graphql"), "utf8")];

const server = new ApolloServer({
  typeDefs
  ,resolvers
  ,context: async ({ req, res }) => {
    const firebaseAuthToken = req.headers.authorization;
    // Authorization ヘッダが存在しない場合, もしくは空白の場合にはエラーを返す.
    if (!firebaseAuthToken) {
      throw new AuthenticationError("Authorization header is not found.");
    }

    if (firebaseAuthToken == "") {
      throw new AuthenticationError("Authorization header must not be blank");
    }

    const currentUID = await admin.auth().verifyIdToken(firebaseAuthToken)
      .then(decodedToken => {
        return decodedToken.uid;
      }).catch(err => {
        console.error(err);
      });

    // currentUID が null の場合には, 正しくないトークンが Authorization に渡されたのでエラーを返す.
    if (!currentUID) {
      throw new AuthenticationError("Authorization failed. Check id token.");
    }

    return { currentUID };
  }
  ,introspection: true
});

exports.graphql = functions.https.onRequest(server.createHandler());

