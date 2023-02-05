import React from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'

export default function UpdateTask({newTitle, newDescription, setTitle, setDescription, todo, formRef}) {

    const handleUpdate = () => {
        let title = '';
        let desc = '';
        console.log(newTitle, newDescription)
        if(newTitle == null && newDescription != null) {
            title = todo.title;
            updateTask(todo.id, {title: title, description: newDescription, completed: false})
        } else if (newDescription == null && newTitle != null) {
            desc = todo.description; 
            updateTask(todo.id, {title: newTitle, description: desc, completed: false})
        } else {
            updateTask(todo.id, {title: newTitle, description: newDescription, completed: false})
        }
        formRef.current.reset();
    }

  return (
    <>
    <button onClick={handleUpdate}>Update</button>
    </>
  )
}
