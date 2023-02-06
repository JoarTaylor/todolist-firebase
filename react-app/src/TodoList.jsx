import React from 'react'
import Todo from './Todo.jsx'



export default function TodoList({ inputDialog, todos, setTodos, newTitle, newDescription, setTitle, setDescription, formRef, addButton}) {
  return (
    todos.map(todo => {
      return <div key={todo.id}>
        <Todo formRef={formRef} newTitle={newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription} inputDialog={inputDialog} addButton={addButton}/>
        </div>
    })
  )
}
