import { query } from "./query";
import { mutations } from "./mutations";
import { SuitableTemperature, GoodFood } from "../types";

export const resolvers = {
  Query: query,
  Mutation: mutations,
  Sake: {
    suitableTemperatures: (parent: any) => {
      const suitTemps = [];

      if (parent.isSuitAtHotTemp) {
        suitTemps.push(SuitableTemperature.HOT);
      }
      if (parent.isSuitAtWarmTemp) {
        suitTemps.push(SuitableTemperature.WARM);
      }
      if (parent.isSuitAtRoomTemp) {
        suitTemps.push(SuitableTemperature.ROOM);
      }
      if (parent.isSuitAtColdTemp) {
        suitTemps.push(SuitableTemperature.COLD);
      }
      if (parent.isSuitOnTheRock) {
        suitTemps.push(SuitableTemperature.ROCK);
      }
      return suitTemps;
    },
    goodFoodCategories: (parent: any) => {
      const goodFoods = [];
      if (parent.isGoodWithMeatProd) {
        goodFoods.push(GoodFood.MEAT);
      }
      if (parent.isGoodWithSeafoodProd) {
        goodFoods.push(GoodFood.SEAFOOD);
      }
      if (parent.isGoodWithDairyProd) {
        goodFoods.push(GoodFood.DAIRY);
      }
      if (parent.isGoodWithDryProd) {
        goodFoods.push(GoodFood.SNACK);
      }
      return goodFoods;
    }
  },
}