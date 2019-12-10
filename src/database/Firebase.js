import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
   apiKey: "AIzaSyCMxkoK1w-loi4Aibj8gg0yZGVPy640lMk",
    authDomain: "catcare-ab397.firebaseapp.com",
    databaseURL: "https://catcare-ab397.firebaseio.com",
    projectId: "catcare-ab397",
    storageBucket: "catcare-ab397.appspot.com",
    messagingSenderId: "1091831548054",
  };
  firebase.initializeApp(config);

  export default firebase;