import { useState, useRef, useEffect } from 'react'
import React from 'react'
import TodoList from './TodoList'

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
    saveTask(newTitle, newDescription, false);
    setTodos(todos, {title: newTitle, description: newDescription, completed: false})
  } 


  useEffect(() => {
    const getData = async () => {
      const data = await getTasks(usersCollectionRef);
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };
    getData();
  }, [todos]);
 

  return (
    <>
      <TodoList todos={todos} />
      <input placeholder='Title...' type="text" onChange={(event) => {setTitle(event.target.value)}}/>
      <input placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
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
