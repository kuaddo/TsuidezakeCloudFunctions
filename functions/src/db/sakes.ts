// const functions = require('firebase-functions');
//import * as functions from 'firebase-functions';
// const admin = require('firebase-admin');
import * as admin from 'firebase-admin';
admin.initializeApp();
import { Sake, WishSakes } from '../types';

const fireStore = admin.firestore();

export async function getSakes(): Promise<Array<any>> {
  console.log("LOG: Entered getSakes().");
  const sakes = await fireStore
    .collection('sakes')
    .get();

  return sakes.docs.map(docs => docs.data()) as Array<any>;
}

export async function getSake(id: number): Promise<Sake> {
  console.log("LOG: Entered getSake(). With id: ", id);

  const result: any = await fireStore
    .collection('sakes')
    .doc(id.toString())
    .get()
    .then(doc => {
      if (!doc.exists) {
        return null;
      } else {
        return doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      return null;
    });

    return result;
}

export async function addSake(input: Sake): Promise<Sake> {
  console.log("LOG: Entered addSake().");

  const docRef: FirebaseFirestore.DocumentReference = fireStore
                  .collection('sakes')
                  .doc(input.id.toString());
  await docRef.set({
    input
  });

  return input;
}

export async function fetchWishSakes(currentUID: string): Promise<any> {
  // Note:
  //   N+1 問題は許容する.
  //   問題が顕在化した場合に JOIN ができるような DB に移行するとか考える.
  console.log(`LOG: Entered getWishSakes() with "${currentUID}"`);
  const wishSakes: Array<Sake> = await fireStore
    .collection('wishSakes')
    .doc(currentUID)
    .get()
    .then(async doc => {
      const sakes: Array<Sake> = [];
      if (!doc.exists) {
        return [];
      }
      const docData: WishSakes = doc.data() as WishSakes;
      console.log(docData);

      await Promise.all(docData.sakeIds.map(async (sakeId) => {
        const sake: Sake = await getSake(sakeId);
        sakes.push(sake);
      }));
      console.log(sakes);

      return sakes;
    });

  return wishSakes;
}

export async function addWishSake(currentUID: string, sakeId: number): Promise<any> {
  // 呑みたいリストに酒を追加する.
  console.log(`LOG: Entered addWishSake() with uid: "${currentUID}", sakeId: "${sakeId}"`);

  // ドキュメントの存在確認.
  const docRef: FirebaseFirestore.DocumentReference = fireStore
                        .collection('wishSakes')
                        .doc(currentUID);

  const doc: FirebaseFirestore.DocumentSnapshot = await docRef.get();

  if (doc.exists) {
    await docRef.update({
      sakeIds: admin.firestore.FieldValue.arrayUnion(sakeId)
    })
  } else {
    await docRef.set({
      sakeIds: [sakeId]
    })
  }

  return await fetchWishSakes(currentUID);
}

export async function removeWishSake(currentUID: string, sakeId: number): Promise<any> {
  // 呑みたいリストから酒を削除する.
  console.log(`LOG: Entered addWishSake() with uid: "${currentUID}", sakeId: "${sakeId}"`);

  // ドキュメントの存在確認.
  const docRef: FirebaseFirestore.DocumentReference = fireStore
                                                      .collection('wishSakes')
                                                      .doc(currentUID);

  const doc: FirebaseFirestore.DocumentSnapshot = await docRef.get();

  if (doc.exists) {
    await docRef.update({
      sakeIds: admin.firestore.FieldValue.arrayRemove(sakeId)
  })
  } else {
    await docRef.set({
      sakeIds: []
    })
  }

  return await fetchWishSakes(currentUID);
}
