import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
