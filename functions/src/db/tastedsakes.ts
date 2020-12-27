/**
 * tastedsakes.ts
 * 呑んだ酒を管理する testedSakes コレクションへの操作を定義する.
 */

import * as admin from 'firebase-admin';
import { Sake, SakeIds, TastedSake, UserSake } from '../types';
import { getSake, getUserSake } from './sakes';

const fireStore = admin.firestore();
const CollectionNameTastedSakes: string = 'tastedSakes';
const CollectionNameSakesStars: string = 'sakesstars';

async function createTastedSakesDocIfNotExists(currentUID: string): Promise<void> {
  /**
   * tastedSakes コレクションにリクエストされたユーザのドキュメントが存在するかを確認.
   */
  const docRef: FirebaseFirestore.DocumentReference = fireStore
                                                      .collection(CollectionNameTastedSakes)
                                                      .doc(currentUID);

  const doc: FirebaseFirestore.DocumentSnapshot = await docRef.get();

  if (!doc.exists) {
    await docRef.set({
      sakeIds: []
    });
  }
}

export async function fetchTastedSakes(currentUID: string): Promise<Array<Sake>> {
  /**
   * 呑んだリストを取得.
   * @param currentUID アクセスユーザの UID
   * @returns 酒のドキュメントのリスト
   */

  console.log(`LOG: Entered fetchTastedSakes() with "${currentUID}"`);

  await createTastedSakesDocIfNotExists(currentUID);

  const tastedSakes: Array<Sake> = await fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID)
    .get()
    .then(async doc => {
      const sakes: Array<Sake> = [];

      if (!doc.exists) {
        return [];
      }

      const docData: SakeIds = doc.data() as SakeIds;
      
      await Promise.all(docData.sakeIds.map(async sakeId => {
        const sake: Sake = await getSake(sakeId);
        sakes.push(sake);
      }));

      return sakes;
    });

  return tastedSakes;
}

export async function addTastedSake(currentUID: string, sakeId: number): Promise<Array<Sake>> {
  /**
   * 呑んだリストに酒を追加
   * @params currentUID アクセスしているユーザ ID
   * @params sakeID 呑んだリストに追加したい sakeId
   * @params 操作後の呑んだリスト
   */

  console.log(`LOG: Entered addTastedSake() with "${currentUID}"`);

  await createTastedSakesDocIfNotExists(currentUID);

  await fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID)
    .update({
      sakeIds: admin.firestore.FieldValue.arrayUnion(sakeId)
    });
  
  return await fetchTastedSakes(currentUID);
}

export async function removeTastedSake(currentUID: string, sakeId: number): Promise<UserSake|null> {
  /**
   * 呑んだリストから酒を削除
   * @params currentUID アクセスしているユーザ ID
   * @params 呑んだリストから削除したい sakeID
   * @params 操作後の呑んだリスト
   */

  console.log(`LOG: Entered removeTastedSake() with "${currentUID}"`);

  await createTastedSakesDocIfNotExists(currentUID);

  await fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID)
    .collection(CollectionNameSakesStars)
    .doc(sakeId.toString())
    .delete();

  return await getUserSake(sakeId, currentUID);
}

export async function addTastedSakeWithStars(currentUID: string, input: TastedSake): Promise<UserSake|null> {
  /**
   * 呑んだリストにその評価とともに酒を追加
   * @params currentUID {string}: API にアクセスしているユーザ ID
   * @params input {input}: 呑んだリストに追加したい酒 ID と評価の組
   * @params 操作後の呑んだリスト
   */

  console.log(`LOG: Entered addTastedSakes() with "${currentUID}".`);

  await fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID)
    .collection(CollectionNameSakesStars)
    .doc(input.sakeId.toString())
    .set(input);

  await fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID)
    .collection(CollectionNameSakesStars)
    .get();

  return getUserSake(input.sakeId, currentUID);
}