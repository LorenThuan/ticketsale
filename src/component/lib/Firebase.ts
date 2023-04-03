import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDjvrrwr74saUNrPq-neP_PAUYVCZPXO6A",
  authDomain: "ticketsale-144d2.firebaseapp.com",
  databaseURL: "https://ticketsale-144d2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ticketsale-144d2",
  storageBucket: "ticketsale-144d2.appspot.com",
  messagingSenderId: "1035497142292",
  appId: "1:1035497142292:web:de89ada84f7a4df0050f01",
  measurementId: "G-5HRT9ZTQGM"
};

firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase;
