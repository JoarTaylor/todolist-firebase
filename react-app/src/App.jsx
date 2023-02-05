import { useState, useRef, useEffect } from 'react'
import React from 'react'
import TodoList from './TodoList'
import { onSnapshot } from 'firebase/firestore'

import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'
import SayHello from './sayHello'
import Person from './person'
import './style.css'
import ReactDOM from "react-dom";




function App() {


  
  const [todos, setTodos] = useState([])
  const [newTitle, setTitle] = useState();
  const [newDescription, setDescription] = useState();
 
  const addTask = () => {
    if(newTitle === '') return
    const newDate = Date.now();
    saveTask(newTitle, newDescription, false, newDate);
    setTodos(todos, {title: newTitle, description: newDescription, completed: false, date: newDate})
  } 

  useEffect(() => {
    onSnapshot(usersCollectionRef, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
  }, [])

 
  return (
    <>
      <TodoList newTitle={newTitle} newDescription={newDescription} setTitle={setTitle} setDescription={setDescription} todos={todos} />
      <form action="">
        <input placeholder='Title...' type="text" onChange={(event) => {setTitle(event.target.value)}}/>
        <input placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
      </form>
      {<button onClick={addTask}>Add</button>}
      <button>Clear Completed</button>
      <div>0 left to do</div>
      <SayHello />
      <div className='personContainer'>
        <Person name='harry' age={20}></Person>
        <Person name='kleop' age={24}></Person>
        <Person name='fanny' age={30}></Person>
      </div>      
    </>
  )
}

export default App
