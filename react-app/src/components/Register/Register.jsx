import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Register() {
    
    const regEmailRef = useRef();
    const regPasswordRef = useRef();

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

  return (
    <>
    <form>
    <input ref={regEmailRef} type="text" placeholder='Email...'/>
    <input ref={regPasswordRef} type="password" placeholder='Password...' />
    </form>
    <button onClick={register}>Register</button>
    </>
  )
}
