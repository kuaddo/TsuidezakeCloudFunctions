/**
 * tastedsakes.ts
 * 呑んだ酒を管理する testedSakes コレクションへの操作を定義する.
 */

import * as admin from 'firebase-admin';
import { Sake, SakeIds } from '../types';
import { getSake } from './sakes';

const fireStore = admin.firestore();
const CollectionNameTastedSakes: string = 'tastedSakes';

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
   */

  console.log(`LOG: Entered addTastedSake() with "${currentUID}"`);

  await createTastedSakesDocIfNotExists(currentUID);

  const docRef: FirebaseFirestore.DocumentReference = await 
    fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID);

  await docRef.get()
    .then(async doc => {
      const sakeIdDoc: SakeIds = doc.data() as SakeIds;
      if (!sakeIdDoc.sakeIds.some(currentObject => {
        return currentObject === sakeId; 
      })) {
        await docRef.update({
          sakeIds: admin.firestore.FieldValue.arrayUnion(sakeId)
        });
      }
    });
  
  return await fetchTastedSakes(currentUID);
}

export async function removeTastedSake(currentUID: string, sakeId: number): Promise<Array<Sake>> {
  /**
   * 呑んだリストから酒を削除
   */

  console.log(`LOG: Entered removeTastedSake() with "${currentUID}"`);

  await createTastedSakesDocIfNotExists(currentUID);

  await fireStore
    .collection(CollectionNameTastedSakes)
    .doc(currentUID)
    .update({
      sakeIds: admin.firestore.FieldValue.arrayRemove(sakeId)
    });

  return await fetchTastedSakes(currentUID);
}