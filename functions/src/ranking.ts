import { Ranking, Sake, RankingContent } from './types';
import { getSake } from './db/sakes';

export async function getDummyRanking(): Promise<Ranking[]> {
  console.log("LOG: Entered getDummyRanking");
  const sakes: Sake[] = [];

  for (let i = 0; i < 10; i++) {
    const sake = await getSake(i+1);
    sakes.push(sake);
  }

  const contents1: RankingContent[] = sakes.map((sake, i) => {
    return {
      "rank": i+1,
      "sake": sake
    }
  });

  const contents2: RankingContent[] = sakes.reverse().map((sake, i) => {
    return {
      "rank": i+1,
      "sake": sake
    }
  })

  return [
    {
      "displayOrder": 1,
      "category": "Total",
      "contents": contents1
    },
    {
      "displayOrder": 2,
      "category": "ForYou",
      "contents": contents2
    }
  ]
}