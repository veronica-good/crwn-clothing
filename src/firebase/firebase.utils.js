import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBLJC1IWOtkhFYpSw_aWFO7_WK3ha7Wd4w",
    authDomain: "crwn-db-76c22.firebaseapp.com",
    projectId: "crwn-db-76c22",
    storageBucket: "crwn-db-76c22.appspot.com",
    messagingSenderId: "968298805184",
    appId: "1:968298805184:web:54ebf3f441e9836fe07a25",
    measurementId: "G-XXBHR0SF93"
};

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;