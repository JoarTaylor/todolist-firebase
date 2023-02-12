import React from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from '../../firebase.jsx'
import { FaTrash } from 'react-icons/fa';
import { MyDeleteButton } from './deleteTaskcss.js'
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';

export default function DeleteTask({todo}) {

    const handleDelete = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      await deleteDoc(doc(db, 'users', user.uid, 'todos', todo.id))
    }


  return (
    <div>
        <MyDeleteButton><FaTrash onClick={handleDelete} /></MyDeleteButton>
    </div>
  )
}
