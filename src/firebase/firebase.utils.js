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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
