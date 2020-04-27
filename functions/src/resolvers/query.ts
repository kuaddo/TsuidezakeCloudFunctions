import { getSakes, getSake } from "../db/sakes"

export const query = {
  sakeList: () => getSakes(),
  sakes: () => getSakes(),
  sake: (parent: any, args: any, context: any, info: any) => getSake(args.id),
}