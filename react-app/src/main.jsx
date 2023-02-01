import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {app, db, saveTask, onGetTasks, deleteTask, getTask, updateTask, getTasks} from './firebase.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <App />
 // </React.StrictMode>,
)





