import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDyPmjn8ukfDXTL49giyv8GwS3K_yNGbEk",
  authDomain: "crwn-db-22.firebaseapp.com",
  databaseURL: "https://crwn-db-22.firebaseio.com",
  projectId: "crwn-db-22",
  storageBucket: "crwn-db-22.appspot.com",
  messagingSenderId: "1045993976962",
  appId: "1:1045993976962:web:3fbb7326b6e25c5c0b709b",
  measurementId: "G-RN164GEC8V"
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
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
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
