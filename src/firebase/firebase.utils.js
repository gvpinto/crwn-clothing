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

    try {
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();

        if (!snapShot.exists) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }

        return userRef;

    } catch (error) {
        console.log("Error creating user", error.message);
    }

};

export const convertCollectionsSnapshotToMap = (collections) => {

    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title).toLowerCase(),
            id: doc.id,
            title,
            items
        }

    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});

}

// export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();

//   objectsToAdd.forEach(obj => {
//     const newDocRef  = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
