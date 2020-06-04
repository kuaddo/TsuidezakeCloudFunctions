import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
enum SuitableTemparature {
  HOT
  WARM
  ROOM
  COLD
  ROCK
}

enum FoodCategory {
  MEAT
  SEAFOOD
  DAIRY
  SNACK
}

type Sake {
  id: Int!
  name: String!
  tags: [Tag!]!
  brewer: String
  description: String
  imgPath: String
  isSuitAtHotTemp: Boolean!
  isSuitAtWarmTemp: Boolean!
  isSuitAtRoomTemp: Boolean!
  isSuitAtColdTemp: Boolean!
  isSuitOnTheRock: Boolean!
  isGoodWithMeatProd: Boolean!
  isGoodWithSeafoodProd: Boolean!
  isGoodWithDairyProd: Boolean!
  isGoodWithDryProd: Boolean!
  suitableTemperatures: [SuitableTemparature!]!
  goodFoodCategories: [FoodCategory!]!
  region: String!
}

type Tag {
  id: Int
  name: String
}

type User {
  uid: String!
}

type Query {
  sakeList: [Sake]
  sakes: [Sake]
  sake(id: Int!): Sake
  wishList: [Sake]!
  me: User
}

type Mutation {
  addWishSake(id: Int!): [Sake]!
}
`;