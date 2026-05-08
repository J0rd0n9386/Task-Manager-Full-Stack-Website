import mongoose from "mongoose";
import { Schema } from "mongoose";


const TaskSchema = new Schema(
   {
  title:{
    type: String,
    required: true,
    lowercase: true,
    trim:true,
    index: true

  },
  description:{
    type:String,
    required:true,
    trim: true,
    index: true

  },
  status:{
    type:String,
    enum:["pending","completed","in-progress"],
    default:"pending"
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

const Task = mongoose.model("Task", TaskSchema);
export default Task;