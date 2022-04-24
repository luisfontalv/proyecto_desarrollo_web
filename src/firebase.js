// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_ftzyzkUbltcDbFstpKN6PnVE62beY2c",
  authDomain: "proyecto-desarrollo-web-7bae6.firebaseapp.com",
  projectId: "proyecto-desarrollo-web-7bae6",
  storageBucket: "proyecto-desarrollo-web-7bae6.appspot.com",
  messagingSenderId: "108325287981",
  appId: "1:108325287981:web:a15a51936457c9921820a4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}