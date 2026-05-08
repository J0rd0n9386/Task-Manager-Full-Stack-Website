import express from 'express'
import cors from 'cors'
import router from './routes/Router.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors({
  origin:[
    "http://localhost:3000",
    "https://taskmanager-mernstack.netlify.app"
  ],
  credentials:true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api", router)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || []
  })
})

export default app