import React from 'react'
import DeleteTask from './deleteTask'
import UpdateTask from './updateTask'
import { useState, useRef, useEffect } from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'

export default function Todo({inputDialog, todo, newTitle, newDescription, setTitle, setDescription, formRef}) {

  const [taskCompleted, setCompleted] = useState(true);
  const myCheckbox = useRef()


  const handleCheck = () => {
    taskCompleted ? setCompleted(false) : setCompleted(true);
    updateTask(todo.id, {title: todo.title, description: todo.description, completed: taskCompleted});
  }


  return (
    <div className='todo' style={{display: 'flex', margin: '5vh', justifyContent: 'center'}}>
        <input ref={myCheckbox} type="checkbox" checked={todo.completed} onChange={handleCheck}/>
        <DeleteTask todo={todo}/>
        <UpdateTask inputDialog={inputDialog} formRef={formRef} newTitle = {newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription}/>
        <div>Title: {todo.title}</div>
        <div>Description: {todo.description}</div>
    </div>
  )
}