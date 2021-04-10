// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD8CAWk_40oCxPeeK9K5_0IEEu-KCyaWxU",
    authDomain: "clone-a2f80.firebaseapp.com",
    projectId: "clone-a2f80",
    storageBucket: "clone-a2f80.appspot.com",
    messagingSenderId: "775704273527",
    appId: "1:775704273527:web:84615273dbf6a8a13bdc72",
    measurementId: "G-DRGC66WCEP"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
  const auth =firebase.auth();
  export {db,auth};