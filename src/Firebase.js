import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCvdg9LgvO5j5oVSvFB3xJYPsa1EMmaFMM",
    authDomain: "memorymate-c8ac2.firebaseapp.com",
    projectId: "memorymate-c8ac2",
    storageBucket: "memorymate-c8ac2.appspot.com",
    messagingSenderId: "472305381228",
    appId: "1:472305381228:web:8c64a6830880657eefcd49",
    measurementId: "G-HEC9FZ0ZVW"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;