import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCtCzMnAI82pJTHv0w3AOTaBDZG4OQZHg0",
    authDomain: "crown-db-6bc6b.firebaseapp.com",
    databaseURL: "https://crown-db-6bc6b.firebaseio.com",
    projectId: "crown-db-6bc6b",
    storageBucket: "crown-db-6bc6b.appspot.com",
    messagingSenderId: "633879615441",
    appId: "1:633879615441:web:bd9627d381ad177e9af2f0",
    measurementId: "G-7ZZ1BE319E"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();
 
  if(!snapShot.exists)  {
    const {displayName,email} = userAuth
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    }

    catch(error) {
      console.log('error creating user',error.message);
    }
    
  }
  return userRef;

} 


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
//   export const signInWithGoogle = () =>  
//       auth.signInWithPopup(provider)
//       .then(function (result) { var token = result.credential.accessToken; console.log(token)})
//       .catch(function (error) { console.log("--------sign in with popup error ----", error.message); });
    

  export default firebase;