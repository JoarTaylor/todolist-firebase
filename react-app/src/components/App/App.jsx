import { useState, useRef, useEffect } from 'react'
import React from 'react'
import TodoList from '../todolist/TodoList'
import { onSnapshot, query, where, getDocs } from 'firebase/firestore'
/* import Navbar from '../navbar/Navbar' */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserNav, StyledLink } from '../navbar/navbarcss';
import SignIn from '../signin/Signin';
import Register from '../Register/register';
import { auth } from '../../firebase.jsx'
import { signOut, getAuth, deleteUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth'
import { 
  ButtonContainer,
   InputDialog, 
   PageTitle, 
   TodosLeft, 
   DialogContainer,
  AppContainer,
  TodoListContainer,
  GlobalStyle
 } from './appstyles.js'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from '../../firebase.jsx'
import { async } from '@firebase/util';


function App() {

  const [todos, setTodos] = useState([])
  const [newTitle, setTitle] = useState();
  const [newDescription, setDescription] = useState();
  const formRef = useRef();
  const inputDialog = document.querySelector('.input-dialog');
  const [allDone, setAlldone] = useState(false);
  const [user, setUser] = useState({})
  const [signedIn, setSignedIn] = useState(false)

  const signout = async () => {
    signOut(auth)
}

  const deleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const deleted = deleteUser(user)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if(currentUser) {setSignedIn(true)}
      else {setSignedIn(false)};
    })
  })

  const addTask = () => {
    inputDialog.showModal()
  }
 
  const submitTask = () => {
    if(newTitle == null) {
      alert('Title must be filled out')
      return
    }
    const newDate = Date.now();
    saveTask(newTitle, newDescription, false, newDate);
    setTodos(todos, {title: newTitle, description: newDescription, completed: false, date: newDate})
    formRef.current.reset();
    setDescription(null)
    setTitle(null)
    inputDialog.close()
  } 

  useEffect(() => {
    onSnapshot(usersCollectionRef, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
  }, [])

  const clearCompleted = async () => {
    const q = query(usersCollectionRef , where('completed', '==', true));
    const dataSnap = await getDocs(q)
    dataSnap.docs.forEach(doc => (deleteTask(doc.id)))
  }

  const toggleTodosDone = async () => {
      setAlldone(!allDone);

      if(!allDone) {

    const q = query(usersCollectionRef , where('completed', '!=', true));
    const dataSnap = await getDocs(q)
    dataSnap.docs.forEach(doc => {
      updateTask(doc.id, {completed: true})
    })

  }

  if (allDone) {
    const q = query(usersCollectionRef , where('completed', '==', true));
    const dataSnap = await getDocs(q)
    dataSnap.docs.forEach(doc => {
      updateTask(doc.id, {completed: false})
    })
  }
  }

 
  return (
    <>
    <GlobalStyle/>
    <AppContainer>
      <PageTitle>Your Todo-List</PageTitle>
    <Router>
      <UserNav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink signedIn={signedIn} to="/register">Register</StyledLink> 
          <StyledLink signedIn={signedIn} to="/signin">Sign in</StyledLink> 
          <StyledLink onClick={signout}>{user? 'SignOut': ''}</StyledLink>
        <Routes>
          <Route path="/" ></Route>
          <Route path="/register"  element={<Register />}></Route>
          <Route path="/signin"  element={<SignIn />}></Route>
        </Routes>
        <h4>{user?.email}</h4>
        <button signedIn={signedIn} onClick={deleteAccount}>Delete Account</button>
      </UserNav>
    </Router>
  
      <ButtonContainer>
        <button onClick={addTask}>Add todo</button>
        <button onClick={toggleTodosDone}>Mark all as done</button>
        <button onClick={clearCompleted}>Clear done Todos</button>
      </ButtonContainer>
      <TodosLeft>Todos left to do: {todos.filter(todo => !todo.completed).length}</TodosLeft>
      <DialogContainer>
        <InputDialog className='input-dialog'>
          <div>
            <form ref={formRef}>
                <input placeholder='Title...' type="text" onChange={(event) => {setTitle(event.target.value)}}/>
                <textarea placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
            </form>
            <div>
              <button onClick={submitTask}>Add</button>
              <button onClick={() => {inputDialog.close()}}>Cancel</button>
            </div>
          </div>
        </InputDialog>
      </DialogContainer>
      <TodoListContainer>
      <TodoList inputDialog={inputDialog} formRef={formRef} newTitle = {newTitle}newDescription={newDescription} setTitle={setTitle} setDescription={setDescription} todos={todos} />
      </TodoListContainer>
    </AppContainer>
    </>
  )
}

export default App
