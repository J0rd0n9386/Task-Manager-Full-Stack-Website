import dotenv from 'dotenv'
dotenv.config()
import connectdb from './db/db.js'
import app from './App.js'


const startServer = async () => {
    try {
        await connectdb()

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening at PORT: ${process.env.PORT}`)
        })

    } catch (error) {
        console.log("Error while connecting to MongoDB !!", error)
    }
}

startServer()
