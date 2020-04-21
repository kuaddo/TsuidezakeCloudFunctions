import * as functions from 'firebase-functions';
import { ApolloServer, gql } from "apollo-server-cloud-functions";
import { getSakes, getSake } from "./db/sakes";


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
    tags: [Tag]
    brewer: String
    description: String
    isSuitAtHotTemp: Boolean
    isSuitAtWarmTemp: Boolean
    isSuitAtRoomTemp: Boolean
    isSuitAtColdTemp: Boolean
    isSuitOnTheRock: Boolean
    isGoodWithMeatProd: Boolean
    isGoodWithSeafoodProd: Boolean
    isGoodWithDairyProd: Boolean
    isGoodWithDryProd: Boolean
  }

  type Tag {
    id: Int
    name: String
  }

  type Query {
    sakeList: [Sake]
    sakes: [Sake]
    sake(id: Int!): Sake
  }
`;

const resolvers = {
  Query: {
    sakeList: () => getSakes(), // 互換性保持のために残す.
    sakes: () => getSakes(),
    sake: (parent: any, args: any, context: any, info: any) => getSake(args.id),
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
  ,introspection: true
});

exports.graphql = functions.https.onRequest(server.createHandler());

