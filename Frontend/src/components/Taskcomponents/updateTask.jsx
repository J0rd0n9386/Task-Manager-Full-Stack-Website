import React, { useState } from 'react'
import axios from 'axios'

export const UpdateTask = ({task,onUpdate}) => {
  const [title , setTitle] = useState(task.title)
  const [description , setDescription] = useState(task.description)
  const [status , setStatus] = useState(task.status)
  const [loading , setLoading] = useState(false)
  
  const handleUpdate = async(e) =>{
    e.preventDefault()
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/updateTask/${task._id}`,{  
         title , description , status 
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      onUpdate()
    } catch (error) { 
        console.log(error)
        
    }
    
  }
  return (
    <div>
      <h1>updateTask</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} />
        <input type="text" value={description} onChange = {(e) => setDescription(e.target.value)} />
        <select value={status} onChange = {(e) => setStatus(e.target.value)} >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  )
}

export default UpdateTask
