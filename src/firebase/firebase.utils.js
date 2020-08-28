import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBlTN7iF2La282lcmO2G3D6dhIJJvpbGMY",
  authDomain: "crwnreact.firebaseapp.com",
  databaseURL: "https://crwnreact.firebaseio.com",
  projectId: "crwnreact",
  storageBucket: "crwnreact.appspot.com",
  messagingSenderId: "907776615406",
  appId: "1:907776615406:web:d0cb97ce010f9baa54a4ff",
  measurementId: "G-SVERJ5QTDK",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const createNewItem = (newItem) => {
  const collectionRef = firestore.collection("collections");
  // console.log();
  // console.log(newItem);
  const docId = (type) => {
    switch (type) {
      case "sneakers":
        return "5PYb2tPZxQON4f9bJh5u";
      case "jackets":
        return "sXDIWhNzgAhMBajrk0aB";
      case "hats":
        return "eYNiSob8Z7QipK7bWHBG";
      case "mens":
        return "IDKcfLCdyDyY7U2g5aEr";
      case "womens":
        return "JEDxiFosRjzbLIX9RAGA";
      case "test":
        return "wkF41CrOWnbpT2CYiOmr";
      default:
        break;
    }
  };
  // console.log();
  // const timeStamp

  collectionRef.doc(docId(newItem.type)).update({
    items: firebase.firestore.FieldValue.arrayUnion({
      id: new Date().getTime(),
      name: newItem.name,
      imageUrl: newItem.imageUrl,
      price: newItem.price,
    }),
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
