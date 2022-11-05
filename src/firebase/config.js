import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'APIKEY',
  authDomain: 'DOMAIN',
  projectId: 'PROJECTNAME',
  storageBucket: 'STORAGEBUCKET',
  messagingSenderId: 'SENDERID',
  appId: 'APPID',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { db, auth, timestamp };
