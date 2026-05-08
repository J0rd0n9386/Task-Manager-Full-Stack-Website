import Task from '../models/Task.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createTask = asyncHandler(async (req, res) => {
    const { title, description,status } = req.body 
    if (!title || !description) {
        throw new ApiError(400, "All fields are required")
    }
    const task = await Task.create({
        title,
        description,
        owner: req.user._id,
        status
    })
    return res.status(201).json(new ApiResponse(200, task, "Task created successfully"))
})

const updateTask = asyncHandler(async(req,res) => {
        const task = await Task.findById(req.params._id)

        if (!task) {

             throw new ApiError(404 , "Task does not exist");
        }

if (task.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Unauthorized" });
  }
   const {title,description,status} = req.body;

   if (!title && !description && !status) {
        throw new ApiError(400, "At least one field is required to update");
    }


    const updatedTask = await Task.findByIdAndUpdate(
    req.params._id, 
    { $set: { title, description, status } },  
    {new:true}
    )
    return res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully"))
   
})          

const DeleteTask =asyncHandler(async (req,res) => {
      const task = await Task.findById(req.params._id)
   if (!task) {
    throw new ApiError(404 , "task Doesn't Exist")
   }

    if(task.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({ msg: "Unauthorized" });
    }  
    await Task.findByIdAndDelete(req.params._id)
    return res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully"))
})

const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ owner:req.user._id })
    
    return res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    )
})
const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params._id)
    if (!task) {
        throw new ApiError(404, "Task does not exist")
    }

    if(task.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({ msg: "Unauthorized" });
    }
    return res.status(200).json(new ApiResponse(200, task, "Task fetched successfully"))
})
const toggleTaskStatus = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params._id)
    if (!task) {
        throw new ApiError(404, "Task does not exist")
    }
    if(task.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({ msg: "Unauthorized" });
    }
    task.status = !task.status
    await task.save()
    return res.status(200).json(new ApiResponse(200, task, "Task status toggled successfully"))
})

export { createTask , updateTask , DeleteTask , getAllTasks , getTaskById , toggleTaskStatus }