import { getSakes, getSake, fetchWishSakes } from "../db/sakes"
import { UserContext } from "../types";

export const query = {
  sakeList: () => getSakes(),
  sakes: () => getSakes(),
  sake: (parent: any, args: any, context: any, info: any) => getSake(args.id),
  wishList: (parent: any, args: any, context: UserContext) => fetchWishSakes(context.currentUID),
  me: (parent: any, args: any, context: UserContext) => {
    if (context.currentUID) {
      return { uid: context.currentUID }
    } else {
      return null;
    }
  }
}