import * as firebase from "firebase/compat";
import 'firebase/storage';

// for firebase v6

// import firebase from 'firebase/app'; // for firebase v8
// import 'firebase/database'; // for database

const firebaseConfig = {
    apiKey: "AIzaSyBr2602HuCOdtrOtUzSdqqd2vBTYnBoQzo",
    authDomain: "jelogo-dc808.firebaseapp.com",
    databaseURL: "https://jelogo-dc808-default-rtdb.firebaseio.com",
    projectId: "jelogo-dc808",
    storageBucket: "jelogo-dc808.appspot.com",
    messagingSenderId: "771660808446",
    appId: "1:771660808446:web:b84ca18e40a38befe9a5af",
    measurementId: "G-NLQYC3VW67"
};

// Initialisez Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Utilisation de la base de données Firebase
export const dataBases = firebase.database();
export const storages = firebase.storage;
export const fireBases = firebase;
