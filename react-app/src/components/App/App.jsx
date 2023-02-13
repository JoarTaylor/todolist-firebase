import { useState, useRef, useEffect } from 'react'
import React from 'react'
import TodoList from '../todolist/TodoList'
import { onSnapshot, query, where, getDocs, setDoc, doc, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore'
/* import Navbar from '../navbar/Navbar' */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserNav, StyledLink} from '../navbar/navbarcss';
import SignIn from '../signin/Signin';
import Register from '../Register/register';
import { auth } from '../../firebase.jsx'
import { signOut, getAuth, deleteUser, onAuthStateChanged  } from 'firebase/auth';
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


function App() {

  const [todos, setTodos] = useState([])
  const [newTitle, setTitle] = useState();
  const [newDescription, setDescription] = useState();
  const formRef = useRef();
  const inputDialog = document.querySelector('.input-dialog');
  const [allDone, setAlldone] = useState(false);
  const [user, setUser] = useState({})
  const [signedIn, setSignedIn] = useState(false);

  const signout = async () => {
    signOut(auth)
    setTodos([])
}

  const deleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const deleted = deleteUser(user)
    } catch (error) {
      console.log(error)
    }
    setTodos([])
  }


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if(currentUser) {setSignedIn(true)}
      else {setSignedIn(false)};
    })
  })

  const addTask = () => {
    if(signedIn) {
      inputDialog.showModal()
    }
  }
 
  const submitTask = () => {
    if(newTitle == null) {
      alert('Title must be filled out')
      return
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const newDate = Date.now();
    const subTodosCollection =  collection(db, 'users', user.uid, 'todos');
    addDoc(subTodosCollection, { title: newTitle, description: newDescription, completed: false, date: newDate });
    formRef.current.reset();
    setDescription(null)
    setTitle(null)
    inputDialog.close()
  } 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const auth = getAuth();
        const thisUser = auth.currentUser;
        onSnapshot(collection(db, 'users', thisUser.uid, 'todos'), (snapshot) => {
          setTodos(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
      }
    })
  }, [])


  const clearCompleted = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const q = query(collection(db, 'users', user.uid, 'todos'), where('completed', '==', true));
    console.log(q)
    const dataSnap = await getDocs(q)
    console.log(dataSnap)
    dataSnap.docs.forEach(thisDoc => deleteDoc(doc(db, 'users', user.uid, 'todos', thisDoc.id)))
  }

  const toggleTodosDone = async () => {
    setAlldone(!allDone);
    const auth = getAuth();
    const user = auth.currentUser;
    if(!allDone) {
    const q = query(collection(db, 'users', user.uid, 'todos') , where('completed', '!=', true));
    const dataSnap = await getDocs(q)
    console.log(dataSnap)
    dataSnap.docs.forEach(thisDoc => {
      updateDoc(doc(db, 'users', user.uid, 'todos', thisDoc.id), {completed: true})
    })
  }

  if (allDone) {
    const q = query(collection(db, 'users', user.uid, 'todos'), where('completed', '==', true));
    const dataSnap = await getDocs(q)
    dataSnap.docs.forEach(thisDoc => {
      updateDoc(doc(db, 'users', user.uid, 'todos', thisDoc.id), {completed: false})
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
          <div>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink signedIn={signedIn} to="/register">Register</StyledLink> 
            <StyledLink signedIn={signedIn} to="/signin">Sign in</StyledLink> 
            <StyledLink onClick={signout}>{user? 'SignOut': ''}</StyledLink>
            <StyledLink to="/" signedIn={!signedIn} onClick={deleteAccount}>Delete Account</StyledLink>
          </div>
        <Routes>
          <Route path="/" ></Route>
          <Route path="/register"  element={<Register />}></Route>
          <Route path="/signin"  element={<SignIn />}></Route>
        </Routes>
        <h4>{user?.email}</h4>
      </UserNav>
    </Router>
      <ButtonContainer signedIn={signedIn}>
        <button onClick={addTask}>Add todo</button>
        <button onClick={toggleTodosDone}>Mark all as done</button>
        <button onClick={clearCompleted}>Clear done Todos</button>
      </ButtonContainer>
      <TodosLeft signedIn={!signedIn}>Todos left to do: {todos.filter(todo => !todo.completed).length}</TodosLeft>
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
