import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
apiKey: "AIzaSyDl94jos3mRxvT_1Mr6jlf1EKlhk37lSp0",
authDomain: "crwn-db-f4d7e.firebaseapp.com",
databaseURL: "https://crwn-db-f4d7e.firebaseio.com",
projectId: "crwn-db-f4d7e",
storageBucket: "crwn-db-f4d7e.appspot.com",
messagingSenderId: "86030205219",
appId: "1:86030205219:web:c53a651aabc307ab4d8c96",
measurementId: "G-0RGQYJ0HQL"
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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
