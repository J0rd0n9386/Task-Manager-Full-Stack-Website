import React, { useState } from 'react'
import axios from 'axios'
import GetAllTask from './getAllTask'
import '../../App.css'; 


const CreateTask = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("pending")
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)
 

  const handleSubmit = async (e) => { 
    e.preventDefault()
    
    console.log(title, description)
    
    
    if (!title || !description) {
       alert ("All field are required")
       return
    }

    setLoading(true);
   try{
    const result =  await axios.post('https://task-manager-full-stack-website.onrender.com/api/createTask',{
      title,
      description,
      status
    },
     {headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
     }});

    const task = result.data.data.task
    console.log('New Task Created Successfully', task);
    setTitle('');
    setDescription('');
    setRefresh(prev => !prev);
   
    
   } catch (error) {
    alert(error.response?.data?.message || " task creation failed")
   } finally {
    setLoading(false);
   }
  }


  return (
  <div className="create-task-wrapper">
    <h1>Welcome to Task Manager</h1>
    <p>Create your tasks here</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title : </label>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <br />
      <label htmlFor="description">Description : </label>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <br />
      <label htmlFor="status">Status : </label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <br />
      <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Task"}</button>
    </form>
    <GetAllTask refresh={refresh} />
  </div>
);
  
}

export default CreateTask