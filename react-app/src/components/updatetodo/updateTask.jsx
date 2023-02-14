import React, { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from '../../firebase.jsx'
import { UpdateForm, FormContainer, EditBtn } from './updatestyle.js';
import { updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

    const cancelUpdate = () => {
        setShowing(!isShowing)
    }

    const submitUpdate = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const updatedTime = Date.now();
        setShowing(!isShowing)
        let title = null;
        let desc = null;
        if(newTitle == null && newDescription != null) {
            title = todo.title;
            updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {title: title, description: newDescription, completed: todo.completed, date: updatedTime})
        } else if (newDescription == null && newTitle != null) {
            desc = todo.description; 
            updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {title: newTitle, description: desc, completed: todo.completed, date: updatedTime})
        } else if(newDescription == null && newTitle == null) {
            updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {title: todo.title, description: todo.description, completed: todo.completed})
            return
        }
        else {
            updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {title: newTitle, description: newDescription, completed: todo.completed, date: updatedTime})
        }
        updateFormRef.current.reset();
        setDescription(null)
        setTitle(null)
    }

  return (
    <>
    <FormContainer isShowing={isShowing}>
          <UpdateForm ref={updateFormRef} action="">
              <input ref={titleRef} type="text" onChange={(event) => {setTitle(event.target.value)}}/>
              <input ref={descRef} placeholder='Description...' type="text" onChange={(event) => {setDescription(event.target.value)}}/>
          </UpdateForm>
          <button onClick={submitUpdate}>Submit</button>
          <button onClick={cancelUpdate}>Cancel</button>
    </FormContainer>
    <EditBtn onClick={openUpdateDialog}><FaEdit/></EditBtn>
    </>
  )
}
