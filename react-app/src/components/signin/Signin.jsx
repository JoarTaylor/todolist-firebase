import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { auth } from '../../firebase';

export default function SignIn() {

  const emailRef = useRef();
  const passwordRef = useRef();


  const signIn = async () => {
    try { 
      const user = await signInWithEmailAndPassword(
       auth, 
       emailRef.current.value, 
      passwordRef.current.value)
      } catch (error) {
           console.log(error.message)
      }
      emailRef.current.value = ''
      passwordRef.current.value = ''
  }

  return (
    <>
    <form>
    <input ref={emailRef} type="text" placeholder='Email...'/>
    <input ref={passwordRef} type="password" placeholder='Password...' />
    </form>
    <button onClick={signIn}>Sign in</button>
    </>
  )
}
