import React from 'react'
import { UserNav, StyledLink} from './navbarcss'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import SignIn from '../signin/Signin';
import App from '../App/App';
import Register from '../Register/register';


export default function Navbar() {
  
  const signout = async () => {
    signOut(auth)
}
   
  return (
    <Router>
    <UserNav>
       {/*  <StyledLink to="/App">Home</StyledLink> */}
        <StyledLink to="/register">Register</StyledLink> 
        <StyledLink to="/signin">Sign in</StyledLink> 
        <div onClick={signout}>Sign out</div>
      <Routes>
        <Route path="/register"  element={<Register />}></Route>
        <Route path="/signin"  element={<SignIn />}></Route>
       {/*  <Route path="/App"  element={<App />}></Route> */}
      </Routes>
    </UserNav>
    </Router>
    
  )
}
