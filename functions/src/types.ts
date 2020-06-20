export interface UserContext {
  currentUID: string;
}

export interface Sake {
  id: number,
  name: string,
  tags: [string],
  brewer: string,
  description: string,
  imgPath: string,
  isSuitAtHotTemp: boolean,
  isSuitAtWarmTemp: boolean,
  isSuitAtRoomTemp: boolean,
  isSuitAtColdTemp: boolean,
  isSuitOnTheRock: boolean,
  isGoodWithMeatProd: boolean,
  isGoodWithSeafoodProd: boolean,
  isGoodWithDairyProd: boolean,
  isGoodWithDryProd: boolean,
  region: string
}

export interface WishSakes {
  sakeIds: [number];
}

export interface SakeIds {
  sakeIds: [number];
}
