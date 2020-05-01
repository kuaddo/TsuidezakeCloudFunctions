// const functions = require('firebase-functions');
//import * as functions from 'firebase-functions';
// const admin = require('firebase-admin');
import * as admin from 'firebase-admin';
admin.initializeApp();

const fireStore = admin.firestore();

export async function getSakes(): Promise<Array<any>> {
  console.log("LOG: Entered getSakes().");
  const sakes = await fireStore
    .collection('sakes')
    .get();

  return sakes.docs.map(docs => docs.data()) as Array<any>;
}

export async function getSake(id: number): Promise<any> {
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



