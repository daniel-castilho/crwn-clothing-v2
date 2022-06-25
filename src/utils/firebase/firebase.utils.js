import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDnsES3RSX0KUtFOpVJ77EWN2ygOavQgKI",
  authDomain: "crwn-db-xr3.firebaseapp.com",
  projectId: "crwn-db-xr3",
  storageBucket: "crwn-db-xr3.appspot.com",
  messagingSenderId: "43741711192",
  appId: "1:43741711192:web:3a5d9f33a053c834cf732d",
  measurementId: "G-5VDSWHB6WT",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createAt })
      console.log('setou')
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }

  return userDocRef
}
