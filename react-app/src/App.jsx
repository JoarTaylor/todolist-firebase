import { useState, useRef, useEffect } from 'react'
import React from 'react'
import TodoList from './TodoList'
import { onSnapshot, query, where, getDocs } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons'

import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'
import './style.css'





function App() {

  const [todos, setTodos] = useState([])
  const [newTitle, setTitle] = useState();
  const [newDescription, setDescription] = useState();
  const formRef = useRef();
  const inputDialog = document.querySelector('.input-dialog');

  const addTask = () => {
    inputDialog.showModal()
  }
 
  const submitTask = () => {
    if(newTitle == null || newDescription == null) return
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
 
 
  return (
    <>
    <h1 style={{textAlign: 'center'}}>Todo-app</h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <dialog className='input-dialog'>
          <form ref={formRef} action="">
              <input placeholder='Title...' type="text" onChange={(event) => {setTitle(event.target.value)}}/>
              <input placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
          </form>
          <button onClick={submitTask}>Submit</button>
          <FontAwesomeIcon icon={faClose} onClick={() => {inputDialog.close()}}></FontAwesomeIcon>
        </dialog>
        <FontAwesomeIcon icon={faPlus} onClick={addTask}>Add</FontAwesomeIcon>
      </div>
      <TodoList inputDialog={inputDialog} formRef={formRef} newTitle = {newTitle}newDescription={newDescription} setTitle={setTitle} setDescription={setDescription} todos={todos} />
      <div>Todos left to do: {todos.filter(todo => !todo.completed).length}</div>
      
    
       {<button onClick={clearCompleted}>Clear completed</button> }
    </>
  )
}

export default App
