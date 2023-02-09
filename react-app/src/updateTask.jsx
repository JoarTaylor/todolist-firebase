import React, { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from './firebase.jsx'

export default function UpdateTask({ newTitle, newDescription, setTitle, setDescription, todo}) {

    const updateFormRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const [isShowing, setShowing] = useState(false);

    const openUpdateDialog = () => {
        setShowing(!isShowing)
        titleRef.current.value = todo.title;
        descRef.current.value = todo.description;
      }

    const submitUpdate = () => {
        const updatedTime = Date.now();
        setShowing(!isShowing)
        let title = null;
        let desc = null;
        if(newTitle == null && newDescription != null) {
            title = todo.title;
            updateTask(todo.id, {title: title, description: newDescription, completed: todo.completed, date: updatedTime})
        } else if (newDescription == null && newTitle != null) {
            desc = todo.description; 
            updateTask(todo.id, {title: newTitle, description: desc, completed: todo.completed, date: updatedTime})
        } else if(newDescription == null && newTitle == null) {
            updateTask(todo.id, {title: todo.title, description: todo.description, completed: todo.completed})
            return
        }
        else {
            updateTask(todo.id, {title: newTitle, description: newDescription, completed: todo.completed, date: updatedTime})
        }
        updateFormRef.current.reset();
        setDescription(null)
        setTitle(null)
    }

  return (
    <>
    <div onClick={openUpdateDialog}><FaEdit/></div>
    <div className={isShowing ? 'show' : 'hidden'}>
          <form ref={updateFormRef} action="">
              <input ref={titleRef} placeholder='Title...' type="text" onChange={(event) => {setTitle(event.target.value)}}/>
              <input ref={descRef} placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
          </form>
          <button  onClick={submitUpdate}>Submit</button>
    </div>
    </>
  )
}
