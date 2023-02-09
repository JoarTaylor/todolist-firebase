import React from 'react'
import Todo from '../todo/Todo.jsx'



export default function TodoList({ inputDialog, todos, setTodos, newTitle, newDescription, setTitle, setDescription, formRef, addButton}) {
  return (
    todos.sort(({date: a}, {date:b}) => b - a).map(todo => {
      return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} key={todo.id}>
        <Todo formRef={formRef} newTitle={newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription} inputDialog={inputDialog} addButton={addButton}/>
        </div>
    })
  )
}
