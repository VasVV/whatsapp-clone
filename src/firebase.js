import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBboiHYG5f2DjK11ZgD4Z6GUpjBuznbYs4",
    authDomain: "whatsapp-clone-11ab9.firebaseapp.com",
    projectId: "whatsapp-clone-11ab9",
    storageBucket: "whatsapp-clone-11ab9.appspot.com",
    messagingSenderId: "556597777400",
    appId: "1:556597777400:web:0354b4854739124d3c3c0d"
  };
  
  const fb = firebase.initializeApp(firebaseConfig);


  const db = fb.firestore();

  const store = fb.storage();

  const auth = fb.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, store, provider}