import { addWishSake, removeWishSake, addSake } from "../db/sakes";
import { UserContext } from "../types";
import { addTastedSake, removeTastedSake, addTastedSakeWithStars } from "../db/tastedsakes";

export const mutations = {
  addWishSake: (parent: any, args: any, context: UserContext) => addWishSake(context.currentUID, args.id), 
  removeWishSake: (parent: any, args: any, context: UserContext) => removeWishSake(context.currentUID, args.id), 
  addTastedSake: (parent: any, args: any, context: UserContext) => addTastedSake(context.currentUID, args.id),
  addTastedSakeWithStars: (parent: any, args: any, context: UserContext) => addTastedSakeWithStars(context.currentUID, args.input),
  removeTastedSake: (parent: any, args: any, context: UserContext) => removeTastedSake(context.currentUID, args.id),
  addSake: (parent: any, args: any, context: UserContext) => addSake(args.input)
}