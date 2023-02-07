import React from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './style.css'


export default function DeleteTask({todo}) {

    const handleDelete = async () => {
        deleteTask(todo.id)
    }


  return (
    <div>
        <FontAwesomeIcon className='delete-todo-btn' onClick={handleDelete} icon={faTrashCan} />
    </div>
  )
}
