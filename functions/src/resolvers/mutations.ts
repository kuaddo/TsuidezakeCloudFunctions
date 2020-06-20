import { addWishSake, removeWishSake } from "../db/sakes";
import { UserContext } from "../types";
import { addTastedSake, removeTastedSake } from "../db/tastedsakes";

export const mutations = {
  addWishSake: (parent: any, args: any, context: UserContext) => addWishSake(context.currentUID, args.id), 
  removeWishSake: (parent: any, args: any, context: UserContext) => removeWishSake(context.currentUID, args.id), 
  addTastedSake: (parent: any, args: any, context: UserContext) => addTastedSake(context.currentUID, args.id),
  removeTastedSake: (parent: any, args: any, context: UserContext) => removeTastedSake(context.currentUID, args.id)
}