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



