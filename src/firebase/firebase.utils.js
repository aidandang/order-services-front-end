import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDlM4gz456QBwwCFpu6gt7h-uVR-jMcKJI",
  authDomain: "order-services-a33dc.firebaseapp.com",
  databaseURL: "https://order-services-a33dc.firebaseio.com",
  projectId: "order-services-a33dc",
  storageBucket: "order-services-a33dc.appspot.com",
  messagingSenderId: "739633064481",
  appId: "1:739633064481:web:8dcef3bb5003351b039160",
  measurementId: "G-VTRSWLX6JX"
};

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
      })
    } catch (error) {
      console.log('error creating user', error.message);
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