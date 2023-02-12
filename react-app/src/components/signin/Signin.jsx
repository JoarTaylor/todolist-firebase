import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { auth} from '../../firebase';
import { SignInSignOut } from '../navbar/navbarcss';
import { onAuthStateChanged } from 'firebase/auth';

export default function SignIn() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState({});
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {setSignedIn(true)}
      else {setSignedIn(false)};
      console.log(signedIn)
    })
  })


  const signIn = async () => {
    try { 
      const user = await signInWithEmailAndPassword(
       auth, 
       emailRef.current.value, 
      passwordRef.current.value)
      } catch (error) {
        setError(error)
           console.log(error.message)
      }
      emailRef.current.value = ''
      passwordRef.current.value = ''
  }

  return (
    <>
    <SignInSignOut signedIn={signedIn}>
    <form>
    <input ref={emailRef} type="text" placeholder='Email...'/>
    <input ref={passwordRef} type="password" placeholder='Password...' />
    </form>
    <button signedIn={signedIn} onClick={signIn}>Sign in</button>
    <div>{error?.message}</div>
    </SignInSignOut>
    </>
  )
}
