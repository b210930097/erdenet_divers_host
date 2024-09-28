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
  where,
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
  where,
}

export const logUserEvent = async (
  userId: string,
  email: string,
  event: 'Бүртгүүлсэн' | 'Нэвтэрсэн',
) => {
  try {
    const timestamp = new Date().toISOString()
    const docId = `${userId}_${timestamp}`
    await setDoc(doc(db, 'userInfo', docId), {
      userId,
      email,
      event,
      timestamp,
    })
  } catch (error) {
    console.error('Error logging user event:', error)
  }
}

export const logDestructionData = async (
  classIndex: number,
  className: string,
  timestamp: string,
  userEmail: string,
) => {
  try {
    const docId = `${userEmail}_${timestamp}`
    await setDoc(doc(db, 'detections', docId), {
      classIndex,
      className,
      userEmail,
      timestamp,
    })
  } catch (error) {
    console.error('Error logging destruction data:', error)
  }
}
