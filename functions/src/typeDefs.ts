import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
type Sake {
  id: Int!
  name: String!
  tags: [Tag]
  brewer: String
  description: String
  imgPath: String
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