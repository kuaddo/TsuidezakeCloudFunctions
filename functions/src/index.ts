import * as functions from 'firebase-functions';
import { ApolloServer, gql } from "apollo-server-cloud-functions";


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
  }
`;

const sakes = [
  {
    id: 1
    ,name: "sake1"
  },
  {
    id: 2
    ,name: "sake2"
  },
  {
    id: 3
    ,name: "sake3"
  }
]

const resolvers = {
  Query: {
    sakeList: () => sakes,
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

