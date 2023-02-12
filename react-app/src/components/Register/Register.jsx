import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../../firebase';
import { SignInSignOut } from '../navbar/navbarcss';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Register() {
    
    const regEmailRef = useRef();
    const regPasswordRef = useRef();
    const [signedIn, setSignedIn] = useState(false)
    const [registerError, setError] = useState({});

    const register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, regEmailRef.current.value, regPasswordRef.current.value)
          .then((userCredential) => {
            // Signed in 
            setError('')
            const user = userCredential.user;
            console.log('id: ', user.uid)
            const docRef = doc(db, 'users', user.uid);
            const collectionRef = collection(docRef, 'todos');
            addDoc(collectionRef, {
              title: '', description: '', date: '', completed: false
            })
          })
          .catch((error) => {
            setError(error)
      });
    }

    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {setSignedIn(true)}
        else {setSignedIn(false)};
      })
    })

  return (
    <>
    <SignInSignOut signedIn={signedIn}>
    <form>
      <input ref={regEmailRef} type="text" placeholder='Email...'/>
      <input ref={regPasswordRef} type="password" placeholder='Password...' />
    </form>
    <button signedIn={signedIn} onClick={register}>Register</button>
    <div>{registerError?.message}</div>
    </SignInSignOut>
    </>
  )
}
