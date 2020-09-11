import { getSakes, getSake, fetchWishSakes } from "../db/sakes";
import { fetchTastedSakes } from "../db/tastedsakes";
import { getDummyRanking, getDummyForYou } from "../ranking";
import { UserContext } from "../types";

export const query = {
  sakeList: () => getSakes(),
  sakes: () => getSakes(),
  sake: (parent: any, args: any, context: any, info: any) => getSake(args.id),
  wishList: (parent: any, args: any, context: UserContext) => fetchWishSakes(context.currentUID),
  tastedList: (parent: any, args: any, context: UserContext) => fetchTastedSakes(context.currentUID),
  getRankings: () => getDummyRanking(),
  getRecommendedSakes: () => getDummyForYou(),
  me: (parent: any, args: any, context: UserContext) => {
    if (context.currentUID) {
      return { uid: context.currentUID }
    } else {
      return null;
    }
  }
}