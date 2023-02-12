import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { SignInSignOut } from '../navbar/navbarcss';

export default function Register() {
    
    const regEmailRef = useRef();
    const regPasswordRef = useRef();
    const [signedIn, setSignedIn] = useState(false)

    const register = async () => {
       try { 
       const user = await createUserWithEmailAndPassword(
        auth, 
        regEmailRef.current.value, 
        regPasswordRef.current.value)
       } catch (error) {
            console.log(error.message)
       }
       regEmailRef.current.value = ''
       regPasswordRef.current.value = ''
    }

    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {setSignedIn(true)}
        else {setSignedIn(false)};
        console.log(signedIn)
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
    </SignInSignOut>
    </>
  )
}
