import React from 'react'
import Todo from './Todo.jsx'



export default function TodoList({ todos, setTodos, newTitle, newDescription, setTitle, setDescription }) {
  return (
    todos.map(todo => {
      return <div key={todo.id}>
        <Todo  newTitle={newTitle} newDescription={newDescription} todo={todo} setTitle={setTitle} setDescription={setDescription} />
        </div>
    })
  )
}
