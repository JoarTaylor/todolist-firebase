import React from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'

export default function DeleteTask({todo}) {

    const handleDelete = async () => {
        deleteTask(todo.id)
    }


  return (
    <div>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
