import React from 'react'
import Todo from './Todo.jsx'



export default function TodoList({ todos, setTodos }) {
  return (
    todos.map(todo => {
      return <div key={todo.id}>
        <Todo  todo={todo} />
        </div>
    })
  )
}
