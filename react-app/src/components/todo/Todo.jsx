import React from 'react'
import DeleteTask from '../deletetask/deleteTask'
import UpdateTask from '../updatetodo/updateTask'
import { useState, useRef, useEffect } from 'react'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks, usersCollectionRef} from '../../firebase.jsx'
import Timestamp from '../timestap/Time'
import { 
TodoContainer, 
TodoHeader,
ContentWrapper,
TodoBtns
} from './todocss'


export default function Todo({inputDialog, todo, newTitle, newDescription, setTitle, setDescription, formRef}) {

  const [taskCompleted, setCompleted] = useState(true);
  const myCheckbox = useRef()


  const handleCheck = () => {
    taskCompleted ? setCompleted(false) : setCompleted(true);
    updateTask(todo.id, {title: todo.title, description: todo.description, completed: taskCompleted});
  }


  return (
    <TodoContainer>
      <TodoHeader>
          <div>{todo.title}</div>
          <TodoBtns>
            <Timestamp todo={todo}></Timestamp>
            <input ref={myCheckbox} type="checkbox" checked={todo.completed} onChange={handleCheck}/>
            <DeleteTask todo={todo}/>
            <UpdateTask inputDialog={inputDialog} formRef={formRef} newTitle = {newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription}/>
          </TodoBtns>
      </TodoHeader>
      <ContentWrapper>
        <div>{todo.description}</div>
      </ContentWrapper>
    </TodoContainer>
  )
}