import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
} from 'firebase/firestore'

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
const db = getFirestore(app)

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
}

export const logUserEvent = async (
  userId: string,
  email: string,
  event: 'signUp' | 'login',
) => {
  try {
    const timestamp = new Date().toISOString()
    const docId = `${userId}_${timestamp}`
    await setDoc(doc(db, 'userEvents', docId), {
      userId,
      email,
      event,
      timestamp,
    })
  } catch (error) {
    console.error('Error logging user event:', error)
  }
}
