import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuugqyMaiOcbNuT9weKiAtekUig-wSC5DQ",
  authDomain: "gogoal-c5a17.firebaseapp.com",
  projectId: "gogoal-c5a17",
  storageBucket: "gogoal-c5a17.firebasestorage.app",
  messagingSenderId: "660424463507",
  appId: "1:660424463507:web:98b64b4fe824ccdb41e966",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();