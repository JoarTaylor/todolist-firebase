import React from 'react'
import Todo from './Todo.jsx'



export default function TodoList({ todos, setTodos, newTitle, newDescription, setTitle, setDescription, formRef}) {
  return (
    todos.map(todo => {
      return <div key={todo.id}>
        <Todo formRef={formRef} newTitle={newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription}/>
        </div>
    })
  )
}
