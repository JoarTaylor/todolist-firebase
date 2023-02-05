import React from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'

export default function UpdateTask({newTitle, newDescription, setTitle, setDescription, todo}) {

    const handleUpdate = () => {
        if(newTitle === '') return
        updateTask(todo.id, {title: newTitle, description: newDescription, completed: false})
    }

  return (
    <>
    <button onClick={handleUpdate}>Update</button>
    </>
  )
}
