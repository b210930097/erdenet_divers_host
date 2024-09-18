import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDOACmuAO5NKLWFv0VAd97MjLogwzLsSvQ',
  authDomain: 'erdenet-divers.firebaseapp.com',
  projectId: 'erdenet-divers',
  storageBucket: 'erdenet-divers.appspot.com',
  messagingSenderId: '941154206174',
  appId: '1:941154206174:web:7108dd38696af54783dd4f',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
