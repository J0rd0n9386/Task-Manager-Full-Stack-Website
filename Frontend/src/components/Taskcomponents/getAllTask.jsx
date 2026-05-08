import React,{useEffect, useState} from 'react';
import axios from 'axios'
import '../../App.css'; 
import UpdateTask from './updateTask'

const GetAllTask = ({refresh}) => {
   const [tasks, setTasks] = useState([])
   const [loading, setLoading] = useState(true)
   const [editTaskId, setEditTaskId] = useState(null)
   const [refreshLocal, setRefreshLocal] = useState(false)
   const [search, setSearch] = useState("")

useEffect(() => {
    const fetchdata = async ()=>{
     try {
        const res = await axios.get("http://localhost:8000/api/getTasks",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        setTasks(res.data.data)
     } catch (error) {
         console.log(error)
         
     }finally {
                setLoading(false)
     
    }
}
 fetchdata()
}, [refresh, refreshLocal])
const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    try {
        await axios.delete(`http://localhost:8000/api/deleteTask/${taskId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        setRefreshLocal(prev => !prev) 
    } catch (error) {
        alert(error.response?.data?.message || "Task delete failed")
    }
}
    if (loading) return <p>Loading tasks...</p>

    if (tasks.length === 0) return <p>No tasks found!</p>

const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase())  ||
    task.description.toLowerCase().includes(search.toLowerCase())
)
  return (
     <div className="task-list-wrapper">
    <h1>Current Tasks</h1>
    <div className="search-container">
      <div className="search-icon">🔍</div>
        <input 
        type="text" 
        placeholder="Search tasks..." 
        className="search-input"
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
    />
     </div>
    {filteredTasks.map((task)=>(
        <div className="task-card" key={task._id}>
            <h3>title : {task.title}</h3>
            <p>description:{task.description}</p>
              
               <button className="edit-btn" onClick={() => setEditTaskId(task._id)}>Update Task</button>
               <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete Task</button>
               {editTaskId === task._id && (
                <UpdateTask
                    task={task}
                    onUpdate={() => {
                        setEditTaskId(null)
                        setRefreshLocal(prev => !prev)
                    }}
                />
               )}
        </div>
    ))}
    </div>
  )
}

export default GetAllTask