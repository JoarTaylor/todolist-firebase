import React from 'react'
import DeleteTask from '../deletetask/deleteTask'
import UpdateTask from '../updatetodo/updateTask'
import { useState, useRef, useEffect } from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from '../../firebase.jsx'
import { updateDoc, doc } from 'firebase/firestore'
import Timestamp from '../timestap/Time'
import { getAuth } from 'firebase/auth';
import { 
TodoContainer, 
TodoHeader,
ContentWrapper,
TodoBtns,
LeftTodoNav
} from './todocss'


export default function Todo({inputDialog, todo, newTitle, newDescription, setTitle, setDescription, formRef}) {

  const [taskCompleted, setCompleted] = useState(true);
  const myCheckbox = useRef()


  const handleCheck = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    taskCompleted ? setCompleted(false) : setCompleted(true);
    await updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {title: todo.title, description: todo.description, completed: taskCompleted});
  }


  return (
    <TodoContainer>
      <TodoHeader>
        <LeftTodoNav>
          <input ref={myCheckbox} type="checkbox" checked={todo.completed} onChange={handleCheck}/> 
          <div>{todo.title}</div>
        </LeftTodoNav>
        <TodoBtns>
            <Timestamp todo={todo}></Timestamp>
            <DeleteTask todo={todo}/>
        </TodoBtns>
      </TodoHeader>
      <ContentWrapper>
        <div>{todo.description}</div>
        <UpdateTask inputDialog={inputDialog} formRef={formRef} newTitle = {newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription}/>
      </ContentWrapper>
    </TodoContainer>
  )
}