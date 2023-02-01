import React from 'react'
import DeleteTask from './deleteTask'

export default function Todo({todo}) {
  return (
    <div>
      <label>
        <input  type="checkbox" checked={todo.completed} readOnly/>
         {todo.title + todo.description}
        </label>
        <DeleteTask todo={todo}/>
    </div>
  )
}