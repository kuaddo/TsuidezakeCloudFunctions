import { getSakes, getSake, fetchWishSakes } from "../db/sakes"

export const query = {
  sakeList: () => getSakes(),
  sakes: () => getSakes(),
  sake: (parent: any, args: any, context: any, info: any) => getSake(args.id),
  wishList: (parent: any, args: any, context: UserContext) => fetchWishSakes(context.currentUID),
}

interface UserContext {
  currentUID: string;
}