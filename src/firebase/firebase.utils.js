import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAO2SxTR3a6vrNxnQFBsaF-Nkzbep2dWjg",
  authDomain: "crwn-db-5cd05.firebaseapp.com",
  databaseURL: "https://crwn-db-5cd05.firebaseio.com",
  projectId: "crwn-db-5cd05",
  storageBucket: "crwn-db-5cd05.appspot.com",
  messagingSenderId: "561812511756",
  appId: "1:561812511756:web:5d76be69c8da891e65a229",
  measurementId: "G-FC85M99G6W"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
