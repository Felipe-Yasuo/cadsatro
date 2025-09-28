import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTDfAq-T4187uftjuKQOlD9wi4NMAEqyA",
    authDomain: "cadastro-web-d1b28.firebaseapp.com",
    projectId: "cadastro-web-d1b28",
    storageBucket: "cadastro-web-d1b28.appspot.com",
    messagingSenderId: "472723269927",
    appId: "1:472723269927:web:db7cbf5d76b4c7a711a102"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
