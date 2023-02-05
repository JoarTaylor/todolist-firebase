import React from 'react'
import DeleteTask from './deleteTask'
import UpdateTask from './updateTask'
import { useState, useRef, useEffect } from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'
import { async } from '@firebase/util'

export default function Todo({todo, newTitle, newDescription, setTitle, setDescription}) {

  const [taskCompleted, setCompleted] = useState(true);
  const myCheckbox = useRef()

 

  const handleCheck = (e) => {
    taskCompleted ? setCompleted(false) : setCompleted(true);
    updateTask(todo.id, {title: todo.title, description: todo.description, completed: taskCompleted});
  }


  return (
    <div>
      <label>
        <input ref={myCheckbox} type="checkbox" checked={todo.completed} onChange={handleCheck}/>
         {todo.title + ' ' + todo.description}
        </label>
        <DeleteTask todo={todo}/>
        <UpdateTask newTitle = {newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription} />
    </div>
  )
}