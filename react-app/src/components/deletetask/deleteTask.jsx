import React from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from '../../firebase.jsx'
import { FaTrash } from 'react-icons/fa';
import { MyDeleteButton } from './deleteTaskcss.js'

export default function DeleteTask({todo}) {

    const handleDelete = async () => {
        deleteTask(todo.id)
    }


  return (
    <div>
        <MyDeleteButton><FaTrash onClick={handleDelete} /></MyDeleteButton>
    </div>
  )
}
