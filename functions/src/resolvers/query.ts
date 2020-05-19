import { getSakes, getSake, fetchWishSakes } from "../db/sakes"

export const query = {
  sakeList: () => getSakes(),
  sakes: () => getSakes(),
  sake: (parent: any, args: any, context: any, info: any) => getSake(args.id),
  testWishList: () => fetchWishSakes("67Wz8kJzf1Tjbc2S7VUgmW1wSCN2"),
}