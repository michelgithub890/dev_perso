import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCRJpiCpr6VTIWY29rp7Rtb1yyIRn4LGyA",
    authDomain: "my-rules-282dd.firebaseapp.com",
    databaseURL: "https://my-rules-282dd.firebaseio.com",
    projectId: "my-rules-282dd",
    storageBucket: "my-rules-282dd.appspot.com",
    messagingSenderId: "504589227963",
    appId: "1:504589227963:web:e8d5944009e8516096569e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export const auth = getAuth(app)

export default database

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRJpiCpr6VTIWY29rp7Rtb1yyIRn4LGyA",
  authDomain: "my-rules-282dd.firebaseapp.com",
  databaseURL: "https://my-rules-282dd.firebaseio.com",
  projectId: "my-rules-282dd",
  storageBucket: "my-rules-282dd.appspot.com",
  messagingSenderId: "504589227963",
  appId: "1:504589227963:web:e8d5944009e8516096569e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

*/