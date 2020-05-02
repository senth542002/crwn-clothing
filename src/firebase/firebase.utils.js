import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBHCDaOzgHXoKJPzUTaN-1lvCvoT-_Xi8c",
    authDomain: "crwn-db-3de20.firebaseapp.com",
    databaseURL: "https://crwn-db-3de20.firebaseio.com",
    projectId: "crwn-db-3de20",
    storageBucket: "crwn-db-3de20.appspot.com",
    messagingSenderId: "157213300801",
    appId: "1:157213300801:web:59a073960086ee0a2dcec0",
    measurementId: "G-T3XGH11Q01"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) { return; }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName , email } = userAuth;
        const craetedAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                craetedAt,
                ...additionalData
            })
        }catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default  firebase;