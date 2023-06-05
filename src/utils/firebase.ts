import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD-PbFyTOYmUpkPYifBV3mItE975SNsDF8',
  authDomain: 'graphiql-app-d188e.firebaseapp.com',
  projectId: 'graphiql-app-d188e',
  storageBucket: 'graphiql-app-d188e.appspot.com',
  messagingSenderId: '56444109273',
  appId: '1:56444109273:web:513d495126c672bb0459c8',
  measurementId: 'G-ZCTZS2KMTP',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  signOut(auth);
};

export { auth, db, logout };
