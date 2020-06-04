import { addWishSake, removeWishSake } from "../db/sakes";
import { UserContext } from "../types";

export const mutations = {
  addWishSake: (parent: any, args: any, context: UserContext) => addWishSake(context.currentUID, args.id), 
  removeWishSake: (parent: any, args: any, context: UserContext) => removeWishSake(context.currentUID, args.id), 
}