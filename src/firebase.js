import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCzZdShMapDD9S0MLAgKqQweEw79E3kiOU",
    authDomain: "crud-udemy-react-34d29.firebaseapp.com",
    projectId: "crud-udemy-react-34d29",
    storageBucket: "crud-udemy-react-34d29.appspot.com",
    messagingSenderId: "14697121898",
    appId: "1:14697121898:web:670ed781a61e35046c2213"
};

firebase.initializeApp(firebaseConfig);

export {firebase}