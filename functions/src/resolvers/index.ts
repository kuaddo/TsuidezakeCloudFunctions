import { query } from "./query"

export const resolvers = {
  Query: query,
  Sake: {
    suitableTemperatures: (parent: any) => {
      const suitTemps = [];

      if (parent.isSuitAtHotTemp) {
        suitTemps.push("HOT");
      }
      if (parent.isSuitAtWarmTemp) {
        suitTemps.push("WARM");
      }
      if (parent.isSuitAtRoomTemp) {
        suitTemps.push("ROOM");
      }
      if (parent.isSuitAtColdTemp) {
        suitTemps.push("COLD");
      }
      if (parent.isSuitOnTheRock) {
        suitTemps.push("ROCK");
      }
      return suitTemps;
    },
    goodFoodCategories: (parent: any) => {
      const goodFoods = [];
      if (parent.isGoodWithMeatProd) {
        goodFoods.push("MEAT");
      }
      if (parent.isGoodWithSeafoodProd) {
        goodFoods.push("SEAFOOD");
      }
      if (parent.isGoodWithDairyProd) {
        goodFoods.push("DAIRY");
      }
      if (parent.isGoodWithDryProd) {
        goodFoods.push("SNACK");
      }
      return goodFoods;
    }
  },
}