import firebase from "firebase/app";
import "firebase/auth";
export default function ({ $config }, inject) {
  const firebaseConfig = {
    apiKey: $config.firebaseApiKey || "",
    authDomain: $config.firebaseAuthDomain || "",
  };
  console.log("firebaseConfig: ", firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  inject("firebase", firebase);
}
