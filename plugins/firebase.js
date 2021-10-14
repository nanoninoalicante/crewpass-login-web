import firebase from "firebase/app";
import "firebase/auth";
export default function ({ store, route }, inject) {
  const firebaseConfig = {
    apiKey: "AIzaSyCFyNGa4mklgJedPPv9lsyMv5SlG35FC8M",
    authDomain: "crewpass-development.firebaseapp.com",
  };
  firebase.initializeApp(firebaseConfig);
  inject("firebase", firebase);
}
