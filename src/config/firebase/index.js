import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBiH1mi5cK9gKcg9t6G6-Jbd6M4waSQNL8",
  authDomain: "simple-notepad-app.firebaseapp.com",
  projectId: "simple-notepad-app",
  storageBucket: "simple-notepad-app.appspot.com",
  messagingSenderId: "617109329570",
  appId: "1:617109329570:web:32a464c6a0ac7771d869fb",
  measurementId: "G-50S7XQ3FJK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export var database = firebase.database();

export default firebase;
