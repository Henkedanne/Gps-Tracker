import firebase from 'firebase/app';
import 'firebase-firestore';

export function loadDB() {
    const firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        databaseURL: process.env.DATABASEURL,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    return firebase;
}  
