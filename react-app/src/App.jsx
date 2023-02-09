import { useState, useRef, useEffect } from 'react'
import React from 'react'
import TodoList from './TodoList'
import { onSnapshot, query, where, getDocs } from 'firebase/firestore'

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
    const q = query(usersCollectionRef , where('completed', '!=', true));
    const dataSnap = await getDocs(q)
    dataSnap.docs.forEach(doc => {
      updateTask(doc.id, {completed: true})
    })
  }

  return (
    <>
    <h1 style={{textAlign: 'center'}}>Todo-app</h1>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <button onClick={addTask}>Add todo</button>
      <button onClick={toggleTodosDone}>Mark all as done</button>
      <button onClick={clearCompleted}>Clear completed</button>
    </div>
    <div style={{textAlign: 'center'}}>Todos left to do: {todos.filter(todo => !todo.completed).length}</div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <dialog className='input-dialog'>
        <div className='dialog-content'>
          <form className='input-form' ref={formRef} action="">
              <input className='title-input' placeholder='Title...' type="text" onChange={(event) => {setTitle(event.target.value)}}/>
              <textarea className='description-input' placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
          </form>
          <div className='input-button-wrapper'>
            <button className='cancel-btn' onClick={() => {inputDialog.close()}}>Cancel</button>
            <button className='add-btn' onClick={submitTask}>Add</button>
          </div>
        </div>
      </dialog>
    </div>
    <div className='todos-container'>
      <TodoList inputDialog={inputDialog} formRef={formRef} newTitle = {newTitle}newDescription={newDescription} setTitle={setTitle} setDescription={setDescription} todos={todos} />
    </div>
    </>
  )
}

export default App
