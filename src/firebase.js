import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch} from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyC01kFvuoJfEfy6GUIxwZiyP-FsfVvEPeQ",
    authDomain: "proyecto-react-coderhous-10be3.firebaseapp.com",
    projectId: "proyecto-react-coderhous-10be3",
    storageBucket: "proyecto-react-coderhous-10be3.appspot.com",
    messagingSenderId: "709230430318",
    appId: "1:709230430318:web:d94c2ef1d8741d4bb87e7f",
    measurementId: "G-EVQHJBKZNF"
};


const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase)
export const batch = writeBatch(db);


